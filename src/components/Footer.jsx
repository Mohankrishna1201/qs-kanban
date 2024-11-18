import React from "react";
import { FaGithub, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">

                    <div className="developer-info">
                        <h3 className="developer-name">Mohan Krishna Kattamuri</h3>
                        <p className="developer-title">MERN Stack Developer & Problem Solver</p>
                    </div>


                    <div className="footer-links">
                        <a
                            href="https://github.com/Mohankrishna1201"
                            className="footer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithub className="footer-icon" /> GitHub
                        </a>
                        <a
                            href="https://www.kattamuri.me/"
                            className="footer-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaExternalLinkAlt className="footer-icon" /> Portfolio
                        </a>
                        <a
                            href="mailto:kattamurimohankrishna.2004@gmail.com"
                            className="footer-link"
                        >
                            <FaEnvelope className="footer-icon" /> Contact Me
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
