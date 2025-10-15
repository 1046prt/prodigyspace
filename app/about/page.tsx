import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, Target, Users, Zap } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Student-Focused",
      description:
        "Every feature is designed with student needs in mind, from budget tracking to assignment management.",
    },
    {
      icon: Zap,
      title: "Offline-First",
      description:
        "Work anywhere, anytime. All your data is stored locally and syncs when you're back online.",
    },
    {
      icon: Users,
      title: "Privacy-Focused",
      description:
        "Your personal data stays on your device. We don't track, store, or sell your information.",
    },
    {
      icon: GraduationCap,
      title: "Academic Success",
      description:
        "Tools and features specifically crafted to help you succeed in your academic journey.",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About ProdigySpace
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ProdigySpace was created by students, for students. We understand
            the unique challenges of managing academic life, personal finances,
            and staying organized while pursuing your education.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-12">
          <Card className="border-2 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-primary">
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground">
                To empower students with simple, powerful tools that help them
                stay organized, manage their finances, and focus on what matters
                most - their education and personal growth. We believe that
                productivity tools should be accessible, intuitive, and work
                offline so you can stay productive anywhere.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900">
                      <value.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Choose ProdigySpace?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  💰
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Budgeting</h3>
              <p className="text-muted-foreground">
                Track expenses with categories, set budgets, and visualize your
                spending patterns with intuitive charts.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ✅
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Task Management</h3>
              <p className="text-muted-foreground">
                Organize assignments, set priorities, and never miss a deadline
                with our comprehensive task system.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900">
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  📝
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">Quick Notes</h3>
              <p className="text-muted-foreground">
                Capture ideas instantly with sticky notes that you can organize,
                color-code, and access offline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
