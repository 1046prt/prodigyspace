"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Heart,
  Target,
  TrendingUp,
  Smile,
  Frown,
  Meh,
  Brain,
  Activity,
  Moon,
  Coffee,
  Zap,
  Award,
} from "lucide-react";
import { useState } from "react";
import "@/styles/wellbeing.css";
import "@/styles/wellbeing.css";

export default function WellbeingPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isAddMoodOpen, setIsAddMoodOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // Mock data - replace with actual data management
  const moodEntries = [
    {
      id: 1,
      mood: 4,
      note: "Great day! Finished all assignments",
      date: "2024-01-15",
      energy: 5,
      stress: 2,
    },
    {
      id: 2,
      mood: 3,
      note: "Okay day, felt a bit tired",
      date: "2024-01-14",
      energy: 3,
      stress: 3,
    },
    {
      id: 3,
      mood: 5,
      note: "Excellent! Got good grades",
      date: "2024-01-13",
      energy: 5,
      stress: 1,
    },
    {
      id: 4,
      mood: 2,
      note: "Stressful day with exams",
      date: "2024-01-12",
      energy: 2,
      stress: 5,
    },
    {
      id: 5,
      mood: 4,
      note: "Productive study session",
      date: "2024-01-11",
      energy: 4,
      stress: 2,
    },
  ];

  const goals = [
    {
      id: 1,
      title: "Exercise 3 times per week",
      category: "Physical Health",
      progress: 66,
      target: 3,
      current: 2,
      unit: "sessions",
      dueDate: "2024-01-21",
    },
    {
      id: 2,
      title: "Meditate daily for 10 minutes",
      category: "Mental Health",
      progress: 80,
      target: 7,
      current: 5.6,
      unit: "days",
      dueDate: "2024-01-21",
    },
    {
      id: 3,
      title: "Sleep 8 hours per night",
      category: "Sleep",
      progress: 75,
      target: 8,
      current: 6,
      unit: "hours",
      dueDate: "2024-01-21",
    },
    {
      id: 4,
      title: "Drink 8 glasses of water daily",
      category: "Nutrition",
      progress: 90,
      target: 8,
      current: 7.2,
      unit: "glasses",
      dueDate: "2024-01-21",
    },
  ];

  const activities = [
    {
      id: 1,
      name: "Morning Meditation",
      duration: 15,
      type: "Mindfulness",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Evening Walk",
      duration: 30,
      type: "Exercise",
      date: "2024-01-15",
    },
    {
      id: 3,
      name: "Breathing Exercise",
      duration: 10,
      type: "Mindfulness",
      date: "2024-01-14",
    },
    {
      id: 4,
      name: "Yoga Session",
      duration: 45,
      type: "Exercise",
      date: "2024-01-14",
    },
  ];

  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return <Smile className="h-5 w-5 text-green-500" />;
    if (mood >= 3) return <Meh className="h-5 w-5 text-yellow-500" />;
    return <Frown className="h-5 w-5 text-red-500" />;
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return "text-green-600";
    if (mood >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Physical Health":
        return <Activity className="h-4 w-4" />;
      case "Mental Health":
        return <Brain className="h-4 w-4" />;
      case "Sleep":
        return <Moon className="h-4 w-4" />;
      case "Nutrition":
        return <Coffee className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Physical Health":
        return "bg-blue-100 text-blue-800";
      case "Mental Health":
        return "bg-purple-100 text-purple-800";
      case "Sleep":
        return "bg-indigo-100 text-indigo-800";
      case "Nutrition":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const averageMood =
    moodEntries.reduce((sum, entry) => sum + entry.mood, 0) /
    moodEntries.length;
  const totalMeditationTime = activities
    .filter((activity) => activity.type === "Mindfulness")
    .reduce((sum, activity) => sum + activity.duration, 0);
  const completedGoals = goals.filter((goal) => goal.progress >= 100).length;

  return (
    <div className="wellbeing">
      <div className="wellbeing-container">
        {/* Header */}
        <div className="wellbeing-header">
          <h1 className="wellbeing-title">Well-being Center</h1>
          <p className="wellbeing-subtitle">
            Track your mental health, set wellness goals, and practice
            mindfulness
          </p>
        </div>
        {/* Action Buttons */}
        <div className="mb-8 flex gap-2 justify-center">
          <div className="flex gap-2">
            <Dialog open={isAddMoodOpen} onOpenChange={setIsAddMoodOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Heart className="h-4 w-4 mr-2" />
                  Log Mood
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Log Your Mood</DialogTitle>
                  <DialogDescription>
                    How are you feeling today? Rate your mood and add any notes.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Mood (1-5)
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((mood) => (
                        <Button
                          key={mood}
                          variant={
                            selectedMood === mood ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedMood(mood)}
                          className="flex-1"
                        >
                          {mood === 1 && <Frown className="h-4 w-4" />}
                          {mood === 2 && <Frown className="h-4 w-4" />}
                          {mood === 3 && <Meh className="h-4 w-4" />}
                          {mood === 4 && <Smile className="h-4 w-4" />}
                          {mood === 5 && <Smile className="h-4 w-4" />}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Energy Level (1-5)
                    </label>
                    <Input type="number" min="1" max="5" placeholder="3" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Stress Level (1-5)
                    </label>
                    <Input type="number" min="1" max="5" placeholder="3" />
                  </div>
                  <Textarea placeholder="How was your day? Any notes..." />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddMoodOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddMoodOpen(false)}>
                      Save Entry
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  New Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Wellness Goal</DialogTitle>
                  <DialogDescription>
                    Set a new goal to improve your well-being
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Goal title..." />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physical">Physical Health</SelectItem>
                      <SelectItem value="mental">Mental Health</SelectItem>
                      <SelectItem value="sleep">Sleep</SelectItem>
                      <SelectItem value="nutrition">Nutrition</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Target (e.g., 3 times per week)"
                  />
                  <Input type="date" placeholder="Due date" />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddGoalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddGoalOpen(false)}>
                      Create Goal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="wellbeing-stats-grid">
          <Card className="wellbeing-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Mood
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${getMoodColor(averageMood)}`}
              >
                {averageMood.toFixed(1)}/5
              </div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
          <Card className="wellbeing-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Meditation Time
              </CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMeditationTime}min</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card className="wellbeing-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Goals Completed
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedGoals}/{goals.length}
              </div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card className="wellbeing-stat-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 days</div>
              <p className="text-xs text-muted-foreground">Daily check-ins</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="mood" className="wellbeing-tabs">
          <TabsList className="wellbeing-tabs-list wellbeing-tabs-list-grid-4">
            <TabsTrigger value="mood" className="wellbeing-tab-trigger">
              <Heart className="h-4 w-4" />
              Mood
            </TabsTrigger>
            <TabsTrigger value="goals" className="wellbeing-tab-trigger">
              <Target className="h-4 w-4" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="activities" className="wellbeing-tab-trigger">
              <Activity className="h-4 w-4" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="insights" className="wellbeing-tab-trigger">
              <TrendingUp className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="wellbeing-tab-content">
            <Card>
              <CardHeader>
                <CardTitle>Recent Mood Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodEntries.slice(0, 5).map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getMoodIcon(entry.mood)}
                        <div>
                          <p className="font-medium">{entry.note}</p>
                          <p className="text-sm text-muted-foreground">
                            {entry.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">Energy</p>
                          <p className="font-medium">{entry.energy}/5</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Stress</p>
                          <p className="font-medium">{entry.stress}/5</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="wellbeing-tab-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(goal.category)}
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                      </div>
                      <Badge className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                        <span>
                          Due {new Date(goal.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="wellbeing-tab-content">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {activity.type === "Mindfulness" ? (
                            <Brain className="h-5 w-5 text-primary" />
                          ) : (
                            <Activity className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{activity.duration} min</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="wellbeing-tab-content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mood Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Mood tracking chart would appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Best day:</span>
                      <span className="font-medium">Monday (5/5)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Most stressful:</span>
                      <span className="font-medium">Thursday (4/5)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average energy:</span>
                      <span className="font-medium">3.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Goals on track:</span>
                      <span className="font-medium">3/4</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
