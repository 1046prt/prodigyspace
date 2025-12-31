import Link from "next/link";
import { Mail, Phone, MapPin, BookOpen, Github, Twitter } from "lucide-react";
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
                <BookOpen className="logo-icon" />
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
                <Link href="/notes" className="link">
                  Notes & Documents
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="link">
                  Task Management
                </Link>
              </li>
              <li>
                <Link href="/todos" className="link">
                  Todo Manager
                </Link>
              </li>
              <li>
                <Link href="/attendance" className="link">
                  Attendance Tracker
                </Link>
              </li>
              <li>
                <Link href="/collaboration" className="link">
                  Collaboration Hub
                </Link>
              </li>
              <li>
                <Link href="/wellbeing" className="link">
                  Well-being Center
                </Link>
              </li>
              <li>
                <Link href="/expenses" className="link">
                  Expense Tracker
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
                <MapPin className="contact-icon" />
                <span>Student Life Building, University Ave</span>
              </li>
            </ul>
            <div className="social-section">
              <h3>Follow Us</h3>
              <div className="social-links">
                <Link
                  href="https://github.com/1046prt/"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit our GitHub"
                >
                  <Github />
                </Link>
                <Link
                  href="https://x.com/1046prt/"
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter />
                </Link>
                <Link
                  href="mailto:1046prt@gmail.com"
                  className="social-link"
                  aria-label="Send us an email"
                >
                  <Mail />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>&copy; 2025 ProdigySpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
