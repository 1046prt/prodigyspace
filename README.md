# ProdigySpace | Student Productivity Hub

ProdigySpace is a lightweight, privacy-first productivity app made for students. It brings together tools you actually use every day and keeps everything stored locally in your browser so your data stays private and works offline.

What you'll find in ProdigySpace

- Expense Tracker: add expenses, set categories and budgets, view simple charts, and export CSVs for backup or reporting.
- Task & Todo Manager: create tasks with priorities, due dates, categories, and filter or sort to focus on what's important.
- Sticky Notes: create colorful notes, position them on a board, resize and persist them across sessions for quick thoughts.
- Pomodoro Timer & Focus Tools: built-in timer to structure study sessions and short-break reminders to keep focus and energy balanced.
- Alarms & Reminders: set alarms and reminders for classes, deadlines, or personal routines.
- Attendance Tracker: simple attendance logging for classes or study groups.
- Collaboration & Study Groups: lightweight team tools for sharing tasks, notes, and coordinating study sessions.
- Notes & Editor: rich note-taking with a focused editor for class notes and quick reference.
- Expense Insights: visualizations and summaries to help you see where money goes over time.
- Wellbeing Tools: mood tracker, meditation center, and hydration reminders to support healthy study habits.
- Utility Tools: QR code generator, document scanner, unit converter, timezone converter, and other small utilities to save time.
- Accessibility & Themes: mobile-friendly UI, light/dark themes, and PWA support so you can install the app on your device.

Why this app

ProdigySpace aims to be simple, dependable, and private. There are no accounts, no cloud sync, and no tracking — just practical tools that work whether you're online or offline. The design focuses on reducing friction so you spend less time managing tools and more time studying.

Features (detailed)

- Expense Tracker
	- Custom categories and tags
	- Budgeting support and quick summaries
	- CSV export for spreadsheets
	- Local storage persistence and offline access

- Task & Todo Management
	- Create, edit, and delete tasks
	- Set priority, due dates, and completion status
	- Filter by category, date, or status
	- Quick bulk actions and completion statistics

- Sticky Notes & Board
	- Create resizable sticky notes
	- Drag-and-drop board for organizing ideas
	- Color labels and quick editing
	- Persisted to local storage

- Focus & Wellbeing
	- Pomodoro-style timer with configurable intervals
	- Mood tracking and meditation center
	- Hydration reminders / water tracker

- Collaboration & Study Groups
	- Simple group workspace for sharing tasks and notes
	- Lightweight sync within groups (local-first design)

- Utilities & Tools
	- QR code generation for sharing links or notes
	- Document scanning / quick capture
	- Unit and timezone converters
	- Calculator and other small helpers

Data & Privacy

- All data is stored locally in your browser using LocalStorage. Your data stays on your device.
- Offline-first: the app works without a network connection.

Quick start

Prerequisites: Node.js 18+ and either `npm` or `yarn`.

1. Clone the repository:

```bash
git clone https://github.com/1046prt/prodigyspace.git
cd prodigyspace
```

2. Install dependencies:

```bash
npm install
# or: yarn
```

3. Run the development server:

```bash
npm run dev
# or: yarn dev
```

Then open http://localhost:3000 in your browser.

Quick start

Prerequisites: Node.js 18+ and either `npm` or `yarn`.

1. Clone the repository:

```bash
git clone https://github.com/1046prt/prodigyspace.git
cd prodigyspace
```

2. Install dependencies:

```bash
npm install
# or: yarn
```

3. Run the development server:

```bash
npm run dev
# or: yarn dev
```

Then open http://localhost:3000 in your browser.

Build for production

```bash
npm run build
npm start
```

Technology highlights

- Next.js 14 (App Router)
- Tailwind CSS and shadcn/ui for UI components
- Recharts for charts and visualizations
- next-themes for theme control
- LocalStorage for offline-first data storage
- PWA support via a service worker

Contributing

Contributions are welcome. A simple workflow:

1. Fork the repo and create a branch for your feature
2. Make your changes and run the tests (`npm test`)
3. Commit, push, and open a pull request

See the `CONTRIBUTING.md` file for details.

Reporting bugs and requesting features

Please open an issue on GitHub and include:

- A clear description of the problem or idea
- Steps to reproduce (if reporting a bug)
- Expected vs actual behavior
- Screenshots if useful

License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

If you'd like, I can also tidy up the contributing section or add a short development checklist. 
