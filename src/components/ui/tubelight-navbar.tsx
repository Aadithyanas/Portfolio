import React, { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  // Track whether user just clicked (so we don't immediately override with scroll)
  const clickedRef = useRef(false)
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── Scroll-based active section detection ── */
  useEffect(() => {
    // Collect all anchor sections from the nav items
    const sectionIds = items
      .filter((item) => item.url.startsWith("#"))
      .map((item) => ({ name: item.name, id: item.url.substring(1) }))

    const observers: IntersectionObserver[] = []

    // Track intersection ratios for each section
    const ratioMap: Record<string, number> = {}

    const pickMostVisible = () => {
      // Don't override if user just clicked a nav link
      if (clickedRef.current) return

      let bestId = ""
      let bestRatio = -1
      for (const [id, ratio] of Object.entries(ratioMap)) {
        if (ratio > bestRatio) {
          bestRatio = ratio
          bestId = id
        }
      }
      if (bestId) {
        const match = sectionIds.find((s) => s.id === bestId)
        if (match) setActiveTab(match.name)
      }
    }

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratioMap[id] = entry.intersectionRatio
          })
          pickMostVisible()
        },
        {
          // rootMargin: shrink top by navbar height so sections register correctly
          rootMargin: "-80px 0px -20% 0px",
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => {
      observers.forEach((o) => o.disconnect())
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
    }
  }, [items])

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-4 sm:mt-6",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 bg-white/5 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                if (item.url.startsWith("#")) {
                  e.preventDefault()
                  const element = document.getElementById(item.url.substring(1))
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }
                // Immediately highlight clicked item and lock for ~1.2s
                // so the IntersectionObserver doesn't flicker it back
                setActiveTab(item.name)
                clickedRef.current = true
                if (clickTimerRef.current) clearTimeout(clickTimerRef.current)
                clickTimerRef.current = setTimeout(() => {
                  clickedRef.current = false
                }, 1200)
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition-colors",
                "text-white/80 hover:text-blue-400 font-['Outfit']",
                isActive && "bg-white/5 text-blue-400",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-blue-500/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-blue-500/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-blue-500/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-blue-500/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}
