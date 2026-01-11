import {
  Coffee,
  Heart,
  Lightbulb,
  Users,
  Clock,
  Target,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import "@/styles/about.css";

export default function AboutPage() {
  const teamStory = [
    {
      icon: Coffee,
      title: "Late Night Coding Sessions",
      story:
        "Born from countless 3 AM coding sessions in dorm rooms, fueled by instant noodles and the dream of making student life easier.",
    },
    {
      icon: Heart,
      title: "Real Student Problems",
      story:
        "We&apos;ve been there - missing deadlines, overspending on textbooks, losing track of assignments. This isn&apos;t just an app, it&apos;s our solution.",
    },
    {
      icon: Users,
      title: "Built by Peers",
      story:
        "Created by a small group of computer science students who understood that the best tools come from those who actually use them daily.",
    },
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-background"></div>
          <div className="hero-header">
            <Image
              src="/logo.png"
              alt="ProdigySpace Logo"
              className="hero-icon"
              width={64}
              height={64}
            />
            <h1 className="hero-title">Hey There! 👋</h1>
          </div>
          <p className="hero-subtitle">
            Welcome to ProdigySpace - where productivity meets personality.
            We&apos;re not another faceless productivity app. We&apos;re
            students who got tired of juggling seventeen different apps just to
            stay organized.
          </p>
        </div>

        {/* Our Story */}
        <div className="story-section">
          <h2 className="story-title">
            <Sparkles className="story-icon" />
            How We Started
          </h2>
          <div className="story-grid">
            {teamStory.map((item, index) => (
              <div key={index} className="story-card">
                <div className="story-card-inner">
                  <div className="story-icon-wrapper">
                    <item.icon className="story-icon-inner" />
                  </div>
                  <h3 className="story-card-title">{item.title}</h3>
                  <p className="story-card-text">{item.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="different-section">
          <div className="different-container">
            <h2 className="different-title">
              <Target className="different-icon" />
              What Makes Us Different
            </h2>
            <div className="different-grid">
              <div className="different-column">
                <div className="feature-item">
                  <div className="feature-icon green">
                    <span className="feature-checkmark">✓</span>
                  </div>
                  <div className="feature-content">
                    <h3>No BS Privacy Policy</h3>
                    <p>
                      Your data stays on your device. Period. No tracking, no
                      selling, no &ldquo;legitimate interests&rdquo; nonsense.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon blue">
                    <span className="feature-checkmark">✓</span>
                  </div>
                  <div className="feature-content">
                    <h3>Works When WiFi Doesn&apos;t</h3>
                    <p>
                      Designed for real student life - spotty campus internet,
                      library dead zones, and all.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon purple">
                    <span className="feature-checkmark">✓</span>
                  </div>
                  <div className="feature-content">
                    <h3>Actually Free (No Catch)</h3>
                    <p>
                      Built by students, for students. No premium tiers, no
                      feature walls, no credit card required.
                    </p>
                  </div>
                </div>
              </div>
              <div className="different-column">
                <div className="feature-item">
                  <div className="feature-icon yellow">
                    <Clock className="feature-small-icon" />
                  </div>
                  <div className="feature-content">
                    <h3>Quick Setup, No Learning Curve</h3>
                    <p>
                      Jump right in - no 20-minute tutorials or complicated
                      setup wizards.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon red">
                    <Heart className="feature-small-icon red" />
                  </div>
                  <div className="feature-content">
                    <h3>Made with Love (Not Algorithms)</h3>
                    <p>
                      Every feature came from real feedback from real students,
                      not A/B tests and analytics.
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon indigo">
                    <Lightbulb className="feature-small-icon indigo" />
                  </div>
                  <div className="feature-content">
                    <h3>Smart but Not Overwhelming</h3>
                    <p>
                      Powerful enough for complex schedules, simple enough to
                      use between classes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Real Talk Section */}
        <div className="real-talk-section">
          <div className="real-talk-container">
            <h2 className="real-talk-title">The Real Talk 💬</h2>
            <div className="real-talk-content">
              <p className="real-talk-paragraph">
                Look, we know there are tons of productivity apps out there.
                Most of them were built by people in suits who haven&apos;t set
                foot in a lecture hall since the 90s. They&apos;re obsessed with
                &ldquo;maximizing synergies&rdquo; and &ldquo;optimizing
                workflows&rdquo; - whatever that means.
              </p>
              <p className="real-talk-paragraph">
                We built ProdigySpace because we needed it ourselves. We needed
                something that understood that sometimes you&apos;re cramming
                for an exam at 2 AM, sometimes you&apos;re trying to split a
                pizza bill with friends, and sometimes you just need to jot down
                a quick note without opening seventeen different apps.
              </p>
              <p className="real-talk-paragraph">
                This is our love letter to fellow students everywhere who are
                just trying to get through the day without losing their minds
                (or their assignments).
              </p>
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="stats-section">
          <h2 className="stats-title">Some Fun Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card blue">
              <div className="stat-number blue">47</div>
              <div className="stat-description">
                Cups of coffee consumed during development
              </div>
            </div>
            <div className="stat-card green">
              <div className="stat-number green">∞</div>
              <div className="stat-description">
                Deadline panic attacks prevented
              </div>
            </div>
            <div className="stat-card purple">
              <div className="stat-number purple">0</div>
              <div className="stat-description">
                Times we&apos;ve sold your data
              </div>
            </div>
            <div className="stat-card orange">
              <div className="stat-number orange">100%</div>
              <div className="stat-description">Made by actual students</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
