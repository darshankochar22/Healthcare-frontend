import React from 'react';
import { IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandLinkedin, IconBrandYoutube, IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info Section */}
        <div className="footer-section">
          <div className="footer-logo">
            <div className="logo-icon">⚕️</div>
            <div className="logo-text">
              <span className="logo-main">आरोग्य</span>
              <span className="logo-sub">Healthcare Portal</span>
            </div>
          </div>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <IconBrandFacebook size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <IconBrandTwitter size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <IconBrandInstagram size={20} />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <IconBrandLinkedin size={20} />
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <IconBrandYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/hospitals">Find Hospitals</a></li>
            <li><a href="/medicals">Medicines</a></li>
            <li><a href="/feedback">Feedback</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="footer-section">
          <h4 className="footer-title">Our Services</h4>
          <ul className="footer-links">
            <li><a href="/emergency">Emergency Care</a></li>
            <li><a href="/appointment">Book Appointment</a></li>
            <li><a href="/pharmacy">Online Pharmacy</a></li>
            <li><a href="/lab">Lab Tests</a></li>
            <li><a href="/ambulance">Ambulance Service</a></li>
            <li><a href="/telemedicine">Telemedicine</a></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section">
          <h4 className="footer-title">Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <IconMapPin size={18} />
              <span>123 Healthcare Street, Medical District, City - 123456</span>
            </div>
            <div className="contact-item">
              <IconPhone size={18} />
              <span>+91 98765 43210</span>
            </div>
            <div className="contact-item">
              <IconMail size={18} />
              <span>info@aarogya.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 आरोग्य Healthcare Portal. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

