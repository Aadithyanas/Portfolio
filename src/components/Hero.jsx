import React from "react";
import { TypeAnimation } from "react-type-animation";
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import heroImage from '../imges/resumepic.jpg';
import myResume from '../imges/MyCv.pdf';
import './Hero.css';

export const Hero = ({ isDark, toggleTheme }) => {

  const handleDownloadCV = () => {
    // Trigger the file download
    const link = document.createElement('a');
    link.href = myResume; // Path to your resume file
    link.download = 'Aadithyan_AS_Resume.pdf';
    link.click();

    // Open the file in a new window
    window.open(myResume, '_blank');
  };

  return (
    <section style={{ backgroundColor: "transparent" }}>
      <div className="hero-container">
        {/* Right Section: Circular Image with Glow Effect */}
        <div className="profile-container">
          <div className="profile-image-wrapper">
            <img src={heroImage} alt="Profile" className="profile-image" />
          </div>
        </div>

        {/* Left Section: Text and Details */}
        <div className="hero-text">
          <h1 className="hero-heading">Hello, I'm</h1>
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
            As a passionate Full Stack Developer, I specialize in building dynamic, user-friendly web applications. With expertise in both frontend and backend technologies, I craft seamless digital experiences using tools like React, Node.js, and SQL databases. I’m dedicated to delivering high-quality, efficient solutions and continuously improving my skills to stay ahead in the fast-evolving tech landscape.
          </p>

          <h3 className="education-heading">Education</h3>
          <div className="hero-education">
            <div className="education-details">
              <p><strong>Full Stack Developer</strong></p>
              <p>Major: Frontend</p>
              <p>Institute: Masai School</p>
              <p>Year of Graduation: Ongoing...</p>
            </div>
            <div className="education-details">
              <p><strong>Diploma in Computer Hardware</strong></p>
              <p>Major: Computer Hardware/Software</p>
              <p>University: Department of Technical Education, Government of Kerala</p>
              <p>Year of Graduation: 2024</p>
            </div>
          </div>

          <div className="hero-icons">
            <a href="https://github.com/Aadithyanas" className="social-icon">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/aadithyanas" className="social-icon">
              <FaLinkedin />
            </a>
            <a href="mailto:adithyanas2694@gmail.com" className="social-icon">
              <FaEnvelope />
            </a>
          </div>

          <div className="download">
            <button className="hero-button" onClick={handleDownloadCV}>
              <div className="button-content">
                <FaDownload className="download-icon"/>
                <span>Resume</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
