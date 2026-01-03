import {
  Coffee,
  Heart,
  Lightbulb,
  Users,
  Clock,
  BookOpen,
  Target,
  Sparkles,
} from "lucide-react";
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
    <div className="w-full py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-3xl -z-10"></div>
          <div className="flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-blue-600 mr-4" />
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Hey There! 👋
            </h1>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Welcome to ProdigySpace - where productivity meets personality.
            We&apos;re not another faceless productivity app. We&apos;re
            students who got tired of juggling seventeen different apps just to
            stay organized.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <Sparkles className="inline w-8 h-8 text-yellow-500 mr-3" />
            How We Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamStory.map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50">
                    <item.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-3 text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                    {item.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              <Target className="inline w-8 h-8 text-indigo-600 mr-3" />
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      No BS Privacy Policy
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your data stays on your device. Period. No tracking, no
                      selling, no &ldquo;legitimate interests&rdquo; nonsense.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Works When WiFi Doesn&apos;t
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Designed for real student life - spotty campus internet,
                      library dead zones, and all.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      ✓
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Actually Free (No Catch)
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Built by students, for students. No premium tiers, no
                      feature walls, no credit card required.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Quick Setup, No Learning Curve
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Jump right in - no 20-minute tutorials or complicated
                      setup wizards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Made with Love (Not Algorithms)
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Every feature came from real feedback from real students,
                      not A/B tests and analytics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      Smart but Not Overwhelming
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
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
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-center">
              The Real Talk 💬
            </h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Look, we know there are tons of productivity apps out there.
                Most of them were built by people in suits who haven&apos;t set
                foot in a lecture hall since the 90s. They&apos;re obsessed with
                &ldquo;maximizing synergies&rdquo; and &ldquo;optimizing
                workflows&rdquo; - whatever that means.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We built ProdigySpace because we needed it ourselves. We needed
                something that understood that sometimes you&apos;re cramming
                for an exam at 2 AM, sometimes you&apos;re trying to split a
                pizza bill with friends, and sometimes you just need to jot down
                a quick note without opening seventeen different apps.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This is our love letter to fellow students everywhere who are
                just trying to get through the day without losing their minds
                (or their assignments).
              </p>
            </div>
          </div>
        </div>

        {/* Fun Stats */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">Some Fun Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                47
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Cups of coffee consumed during development
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                ∞
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Deadline panic attacks prevented
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                0
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Times we&apos;ve sold your data
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                100%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Made by actual students
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
