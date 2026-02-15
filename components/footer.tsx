import Link from "next/link";
import { Mail, Phone, Github, Twitter } from "lucide-react";
import Image from "next/image";
import "@/styles/footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          {/* Brand - Left Side */}
          <div className="brand-section">
            <div className="logo-container">
              <div className="logo">
                <Image
                  src="/logo.png"
                  alt="ProdigySpace Logo"
                  className="logo-icon"
                  width={24}
                  height={24}
                />
              </div>
              <span className="brand-name">ProdigySpace</span>
            </div>
            <p className="description">
              Your comprehensive digital workspace for academic success,
              collaboration, and well-being. Stay organized, focused, and
              motivated throughout your student journey.
            </p>
          </div>

          {/* Quick Links - Center */}
          <div className="links-section">
            <h3>Quick Links</h3>
            <ul className="links-list">
              <li>
                <Link href="/" className="link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="link">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social - Right Side */}
          <div className="contact-section">
            <h3>Connect With Us</h3>
            <ul className="contact-list">
              <li className="contact-item">
                <Mail className="contact-icon" />
                <span>1046prt@gmail.com</span>
              </li>
              <li className="contact-item">
                <Phone className="contact-icon" />
                <span>+91-9508015377</span>
              </li>
              <li className="contact-item">
                <Github className="contact-icon" />
                <Link
                  href="https://github.com/1046prt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  GitHub
                </Link>
              </li>
              <li className="contact-item">
                <Twitter className="contact-icon" />
                <Link
                  href="https://x.com/1046prt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="external-link"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          <p>&copy; 2025 ProdigySpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
