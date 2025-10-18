import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Mail, Phone, MapPin } from "lucide-react";
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
                  width={24}
                  height={24}
                  className="logo"
                />
              </div>
              <span className="brand-name">prodigyspace</span>
            </div>
            <p className="description">
              Your all-in-one productivity companion for student life. Stay
              organized, focused, and motivated.
            </p>
          </div>

          {/* Quick Links - Center */}
          <div className="links-section">
            <h3>Quick Links</h3>
            <ul className="links-list">
              <li>
                <Link href="/" className="link">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/expenses" className="link">
                  Expense Tracker
                </Link>
              </li>
              <li>
                <Link href="/todos" className="link">
                  Task Manager
                </Link>
              </li>
              <li>
                <Link href="/notes" className="link">
                  Sticky Notes
                </Link>
              </li>
              <li>
                <Link href="/tasks" className="link">
                  Study Planner
                </Link>
              </li>
              <li>
                <Link href="/attendance" className="link">
                  Attendance Tracker
                </Link>
              </li>
              <li>
                <Link href="/wellbeing" className="link">
                  Wellbeing Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social - Right Side */}
          <div className="contact-section">
            <h3>Contact Us</h3>
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
            <div>
              <h3>Follow Us</h3>
              <div className="social-links">
                <Link
                  href="https://github.com/1046prt/"
                  className="social-link"
                >
                  <Github />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="https://x.com/1046prt/" className="social-link">
                  <Twitter />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="mailto:1046prt@gmail.com" className="social-link">
                  <Mail />
                  <span className="sr-only">Email</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>&copy; 2025 prodigyspace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
