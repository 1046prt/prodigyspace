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
import { useWellbeing } from "@/hooks/use-wellbeing";
import { GoalsManager } from "@/components/goals-manager";
import "@/styles/wellbeing.css";

export default function WellbeingPage() {
  const {
    moodEntries,
    meditationSessions,
    wellbeingGoals,
    addMoodEntry,
    addWellbeingGoal,
    updateGoalProgress,
  } = useWellbeing();
  
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number>(3);
  const [selectedStress, setSelectedStress] = useState<number>(3);
  const [moodNotes, setMoodNotes] = useState("");
  const [isAddMoodOpen, setIsAddMoodOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  // Add function to handle mood entry submission
  const handleMoodSubmit = () => {
    if (selectedMood !== null) {
      addMoodEntry({
        date: new Date(),
        mood: selectedMood as 1 | 2 | 3 | 4 | 5,
        energy: selectedEnergy as 1 | 2 | 3 | 4 | 5,
        stress: selectedStress as 1 | 2 | 3 | 4 | 5,
        notes: moodNotes,
        activities: [],
      });
      
      // Reset form
      setSelectedMood(null);
      setSelectedEnergy(3);
      setSelectedStress(3);
      setMoodNotes("");
      setIsAddMoodOpen(false);
    }
  };

  // Convert meditation sessions to activities for display
  const activities = meditationSessions.map(session => ({
    id: session.id,
    name: `${session.type} meditation`,
    type: "Mindfulness" as const,
    duration: session.duration,
    date: session.completedAt.toLocaleDateString(),
  }));

  // Transform wellbeing goals for display
  const goals = wellbeingGoals.map(goal => ({
    id: goal.id,
    title: goal.title,
    category: goal.category.charAt(0).toUpperCase() + goal.category.slice(1),
    progress: Math.round((goal.current / goal.target) * 100),
    target: goal.target,
    current: goal.current,
    unit: goal.unit,
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
        <div className="wellbeing-actions">
          <div className="flex gap-2">
            <Dialog open={isAddMoodOpen} onOpenChange={setIsAddMoodOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Heart className="h-4 w-4" />
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
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((energy) => (
                        <Button
                          key={energy}
                          variant={selectedEnergy === energy ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedEnergy(energy)}
                          className="flex-1"
                        >
                          {energy}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Stress Level (1-5)
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((stress) => (
                        <Button
                          key={stress}
                          variant={selectedStress === stress ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedStress(stress)}
                          className="flex-1"
                        >
                          {stress}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Textarea 
                    placeholder="How was your day? Any notes..." 
                    value={moodNotes}
                    onChange={(e) => setMoodNotes(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddMoodOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleMoodSubmit}
                      disabled={selectedMood === null}
                    >
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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Wellness Goal</DialogTitle>
                  <DialogDescription>
                    Use the goals manager below to create and track your wellness goals
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <GoalsManager
                    goals={wellbeingGoals}
                    onAddGoal={(goalData) => {
                      addWellbeingGoal(goalData);
                      setIsAddGoalOpen(false);
                    }}
                    onUpdateProgress={updateGoalProgress}
                  />
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
                          <p className="font-medium">
                            Mood: {entry.mood}/5
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {entry.date.toLocaleDateString()}
                          </p>
                          {entry.notes && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {entry.notes}
                            </p>
                          )}
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
                  {moodEntries.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No mood entries yet. Start by logging your mood!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="wellbeing-tab-content">
            <GoalsManager
              goals={wellbeingGoals}
              onAddGoal={addWellbeingGoal}
              onUpdateProgress={updateGoalProgress}
            />
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
                  {activities.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No mindfulness activities yet. Start with meditation!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="wellbeing-tab-content">
            <div className="wellbeing-insights-grid">
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
                  {moodEntries.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Average mood:</span>
                        <span className="font-medium">{averageMood.toFixed(1)}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total meditation:</span>
                        <span className="font-medium">{totalMeditationTime} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mood entries:</span>
                        <span className="font-medium">{moodEntries.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Goals completed:</span>
                        <span className="font-medium">{completedGoals}/{wellbeingGoals.length}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Start tracking your mood and creating goals to see insights!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
