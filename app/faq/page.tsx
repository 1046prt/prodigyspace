import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  CircleHelp,
  Clock3,
  NotebookPen,
  ShieldCheck,
  Share2,
  Sparkles,
} from "lucide-react";
import "@/styles/faq.css";

const faqSections = [
  {
    title: "Core experience",
    description:
      "How ProdigySpace keeps your workspace fast, organized, and ready on any device.",
    icon: Sparkles,
    badge: "Start here",
    items: [
      {
        question: "How do I get productive in under 5 minutes?",
        answer:
          "Use the Dashboard to add your first task, jot one quick note, and join or create a collaboration space. The homepage widgets summarize progress so you can see momentum right away.",
      },
      {
        question: "Does ProdigySpace work offline?",
        answer:
          "Yes. The PWA caches your latest data so you can review notes, todos, and tasks without a network. Changes sync once you are back online.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Data is saved locally in your browser storage first for speed, then synced to persistent storage with encryption in transit. Export to CSV or PDF anytime from the related modules.",
      },
    ],
  },
  {
    title: "Tasks, todos, and planning",
    description:
      "Structure study sessions, deadlines, and daily focus without clutter.",
    icon: CheckCircle2,
    badge: "Planner tips",
    items: [
      {
        question: "What is the best way to prioritize work?",
        answer:
          "Create tasks with due dates for course deadlines, and quick todos for small wins. Use the Pomodoro timer to break work into 25-minute focus blocks and mark tasks complete directly from the timer.",
      },
      {
        question: "How do reminders work?",
        answer:
          "Enable notifications in your browser when prompted. Tasks with due dates surface in the homepage stats and trigger reminders near their deadline so nothing slips.",
      },
      {
        question: "Can I track study progress?",
        answer:
          "Yes. The insights dashboard and attendance tracker show completion rates, streaks, and on-track subjects. Export a weekly CSV if you want a snapshot for advisors or teammates.",
      },
    ],
  },
  {
    title: "Notes, documents, and collaboration",
    description:
      "Keep course content organized, searchable, and share-ready for your study group.",
    icon: NotebookPen,
    badge: "Knowledge base",
    items: [
      {
        question: "How do I capture and organize notes fast?",
        answer:
          "Use the note editor to group by subject tags and pin important notes. Scan handouts with the document scanner; they appear alongside typed notes for quick reference.",
      },
      {
        question: "What is the easiest way to collaborate?",
        answer:
          "Set up a study group in Collaboration, assign owners, and attach tasks. Shared timelines keep everyone aligned, and notes can be linked to tasks for clear context.",
      },
      {
        question: "Can I keep personal and shared work separate?",
        answer:
          "Yes. Personal notes and tasks stay private by default. Shared items live in project spaces so you always know what is visible to teammates.",
      },
    ],
  },
  {
    title: "Privacy, wellbeing, and support",
    description:
      "Stay secure, protect your focus, and balance study with recovery.",
    icon: ShieldCheck,
    badge: "Peace of mind",
    items: [
      {
        question: "How is my privacy protected?",
        answer:
          "We minimize data collection, encrypt traffic, and keep analytics anonymous. You can clear cached data or export it before removal at any time inside Settings.",
      },
      {
        question: "How does wellbeing tracking help me study?",
        answer:
          "Log mood and meditation sessions in Well-being to spot burnout early. The system blends focus tools with self-care reminders so you do not over-commit.",
      },
      {
        question: "Where do I ask for new features?",
        answer:
          "Use the Collaboration space to open a request with your team or send a quick note via Notes titled Feedback. We prioritize ideas that reduce friction and improve focus.",
      },
    ],
  },
];

const quickLinks = [
  {
    title: "Create your first note",
    href: "/notes",
    icon: BookOpenCheck,
    action: "Open notes",
    accent: "primary",
  },
  {
    title: "Plan today in 3 steps",
    href: "/tasks",
    icon: CheckCircle2,
    action: "View tasks",
    accent: "accent",
  },
  {
    title: "Start a study group",
    href: "/collaboration",
    icon: Share2,
    action: "Collaboration",
    accent: "secondary",
  },
];

export default function FAQPage() {
  return (
    <div className="faq-page">
      <div className="page-wrapper">
        <section className="faq-hero">
          <div className="faq-hero-content">
            <div className="faq-eyebrow">Help Center · Updated Jan 2026</div>
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <p className="faq-subtitle">
              Clear, skimmable answers for the tools you use most. Save time,
              stay organized, and keep your study flow uninterrupted.
            </p>
            <div className="faq-meta-row">
              <div className="faq-meta-card">
                <Clock3 className="faq-meta-icon" aria-hidden="true" />
                <div>
                  <p className="faq-meta-label">Average read time</p>
                  <p className="faq-meta-value">3 minutes</p>
                </div>
              </div>
              <div className="faq-meta-card">
                <ShieldCheck className="faq-meta-icon" aria-hidden="true" />
                <div>
                  <p className="faq-meta-label">Always student-first</p>
                  <p className="faq-meta-value">Privacy by default</p>
                </div>
              </div>
              <div className="faq-meta-card">
                <Sparkles className="faq-meta-icon" aria-hidden="true" />
                <div>
                  <p className="faq-meta-label">New this semester</p>
                  <p className="faq-meta-value">Offline-ready PWA</p>
                </div>
              </div>
            </div>
            <div className="faq-cta-row">
              <Link href="/" className="faq-cta primary">
                Explore dashboard
                <ArrowRight aria-hidden="true" className="faq-cta-icon" />
              </Link>
              <Link href="/utilities" className="faq-cta ghost">
                View all utilities
                <ArrowRight aria-hidden="true" className="faq-cta-icon" />
              </Link>
            </div>
          </div>
          <div className="faq-hero-panel">
            <div className="faq-panel-header">
              <CircleHelp className="faq-panel-icon" aria-hidden="true" />
              <div>
                <p className="faq-panel-label">Smart answers</p>
                <p className="faq-panel-title">Built for quick scanning</p>
              </div>
            </div>
            <p className="faq-panel-copy">
              Every answer is condensed so you can act immediately. You will see
              where to click, when data syncs, and how to keep momentum without
              digging through docs.
            </p>
            <div className="faq-panel-list">
              <div className="faq-panel-item">
                <CheckCircle2 aria-hidden="true" />
                <span>Action-first steps for each tool</span>
              </div>
              <div className="faq-panel-item">
                <CheckCircle2 aria-hidden="true" />
                <span>Offline, privacy, and export guidance</span>
              </div>
              <div className="faq-panel-item">
                <CheckCircle2 aria-hidden="true" />
                <span>Links to the right screen in-app</span>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-layout">
          <div className="faq-accordion">
            {faqSections.map((section) => (
              <article key={section.title} className="faq-section-card">
                <header className="faq-section-header">
                  <div className="faq-section-icon" aria-hidden="true">
                    <section.icon />
                  </div>
                  <div>
                    <p className="faq-section-badge">{section.badge}</p>
                    <h2 className="faq-section-title">{section.title}</h2>
                    <p className="faq-section-description">
                      {section.description}
                    </p>
                  </div>
                </header>
                <div className="faq-items">
                  {section.items.map((item, index) => (
                    <details
                      key={item.question}
                      className="faq-item"
                      open={index === 0}
                    >
                      <summary>
                        <div className="faq-question">
                          <div className="faq-question-icon" aria-hidden>
                            <CircleHelp />
                          </div>
                          <div>
                            <p className="faq-question-label">Question</p>
                            <p className="faq-question-text">{item.question}</p>
                          </div>
                        </div>
                        <ArrowRight
                          className="faq-summary-icon"
                          aria-hidden="true"
                        />
                      </summary>
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                        <div className="faq-answer-highlight">
                          <Sparkles aria-hidden="true" />
                          <span>
                            Try it now: open the linked section below.
                          </span>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="faq-sidebar">
            <div className="faq-card">
              <div className="faq-card-header">
                <ShieldCheck className="faq-card-icon" aria-hidden="true" />
                <div>
                  <p className="faq-card-label">Need a shortcut?</p>
                  <h3 className="faq-card-title">Jump straight in</h3>
                </div>
              </div>
              <div className="faq-link-grid">
                {quickLinks.map((link) => (
                  <Link key={link.title} href={link.href} className="faq-link">
                    <div className={`faq-link-icon ${link.accent}`}>
                      <link.icon aria-hidden="true" />
                    </div>
                    <div className="faq-link-text">
                      <p className="faq-link-title">{link.title}</p>
                      <p className="faq-link-action">{link.action}</p>
                    </div>
                    <ArrowRight className="faq-link-arrow" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="faq-card secondary">
              <div className="faq-card-header">
                <Clock3 className="faq-card-icon" aria-hidden="true" />
                <div>
                  <p className="faq-card-label">Weekly refresh</p>
                  <h3 className="faq-card-title">Release highlights</h3>
                </div>
              </div>
              <ul className="faq-updates">
                <li>
                  <span className="faq-dot" aria-hidden="true" /> New offline
                  sync layer for tasks and notes.
                </li>
                <li>
                  <span className="faq-dot" aria-hidden="true" /> Redesigned
                  wellbeing cards with clearer trends.
                </li>
                <li>
                  <span className="faq-dot" aria-hidden="true" /> CSV exports
                  improved for attendance and expenses.
                </li>
              </ul>
              <Link href="/about" className="faq-cta subtle">
                View changelog
                <ArrowRight aria-hidden="true" className="faq-cta-icon" />
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
