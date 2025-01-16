import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { ThemeToggle } from "./ThemeToggle";
import heroImage from '../imges/mypic.jpeg'
import "./Hero.css";

export const Hero = ({ isDark, toggleTheme }) => {
  

  return (
    <section
     
      style={{ backgroundColor:"transparent" }}
    >
      <div className="hero-container">
        {/* Right Section: Circular Image with Glow Effect */}
        <div className="profile-container">
          <div className="profile-image-wrapper">
            <img
              src={heroImage}
              alt="Profile"
              className="profile-image"
            />
          </div>
        </div>

        {/* Left Section: Text and Details */}
        <div className="hero-text">
          <h1 className="hero-heading">Hello, It's Me</h1>
          <h2 className="hero-subheading">Aadithyan A S</h2>
          <div className="hero-animation">
            <TypeAnimation
              sequence={[
                "Frontend Developer",
                2000,
                "React Enthusiast",
                2000,
                "UI/UX Designer",
                2000,
              ]}
              repeat={Infinity}
            />
          </div>
          
          <p className="hero-description">
          As a passionate Full Stack Developer, I specialize in building dynamic, user-friendly web applications. With expertise in both frontend and backend technologies, I craft seamless digital experiences using tools like React, Node.js, and SQL databases. I’m dedicated to delivering high-quality, efficient solutions and continuously improving my skills to stay ahead in the fast-evolving tech landscape
          </p>
          <h3 className="education-heading">Education</h3>
          <div className="hero-education">
            
            <div className="education-details">
              <p>
                <strong>Full Stack Developer</strong>
              </p>
              <p>Major:Fontend</p>
              <p>Insitute: MasaiSchool</p>
              <p>Year of Graduation: OnGoing...</p>
            </div>
            <div className="education-details">
              <p>
                <strong>Diploma in Computer Hardware</strong>
              </p>
              <p>Major: Computer Hardware/Software</p>
              <p>University:  Department of Technical Education, Government of Kerala</p>
              <p>Year of Graduation: 2024</p>
            </div>
          </div>

          <div className="hero-icons">
            <a href="" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://github.com/Aadithyanas/Aadithyanas" className="social-icon">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/adithyan-a-s-4a320831b/" className="social-icon">
              <FaLinkedin />
            </a>
          </div>
          <div className="download">
          <a href="#" className="hero-button">
            Download CV
          </a>
          </div>
          
        </div>
      </div>

      {/* Theme Toggle Button */}
     
    </section>
  );
};
