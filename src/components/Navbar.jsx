import React from 'react';
import { Home, User, Briefcase, Mail, FileText, Code } from 'lucide-react';
import { NavBar } from './ui/tubelight-navbar';

const myResume = "/assets/Aadithyan_AS_Resume.pdf";

export const Navbar = () => {
  const navItems = [
    { name: 'Intro',    url: '#about',    icon: Home },
    { name: 'Skills',   url: '#skills',   icon: Code },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Contact',  url: '#contact',  icon: Mail },
    { name: 'Resume',   url: myResume,    icon: FileText }
  ];

  return (
    <NavBar items={navItems} />
  );
};
