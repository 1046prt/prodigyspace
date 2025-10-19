"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodTracker } from "@/components/mood-tracker";
import { MeditationCenter } from "@/components/meditation-center";
import { GoalsManager } from "@/components/goals-manager";
import { InsightsDashboard } from "@/components/insights-dashboard";
import { useWellbeing } from "@/hooks/use-wellbeing";
import { Heart, Brain, Target, TrendingUp } from "lucide-react";
import "@/styles/wellbeing.css";
import "@/styles/mood-tracker.css";
import "@/styles/meditation-center.css";
import "@/styles/insight-dashboard.css";

export default function WellbeingPage() {
  const {
    moodEntries,
    meditationSessions,
    wellbeingGoals,
    addMoodEntry,
    addMeditationSession,
    addWellbeingGoal,
    updateGoalProgress,
  } = useWellbeing();

  return (
    <div className="wellbeing">
      <div className="wellbeing-container">
        <div className="wellbeing-header">
          <h1 className="wellbeing-title">Well-being Center</h1>
          <p className="wellbeing-subtitle">
            Track your mental health, practice mindfulness, and maintain balance
            in your student life.
          </p>
        </div>

        <Tabs defaultValue="mood" className="wellbeing-tabs">
          <TabsList className="wellbeing-tabs-list wellbeing-tabs-list-grid-4">
            <TabsTrigger value="mood" className="wellbeing-tab-trigger">
              <Heart className="h-5 w-5 mr-1.5" />
              <span>Mood</span>
            </TabsTrigger>
            <TabsTrigger value="meditation" className="wellbeing-tab-trigger">
              <Brain className="h-5 w-5 mr-1.5" />
              <span>Meditation</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="wellbeing-tab-trigger">
              <Target className="h-5 w-5 mr-1.5" />
              <span>Goals</span>
            </TabsTrigger>
            <TabsTrigger value="insights" className="wellbeing-tab-trigger">
              <TrendingUp className="h-5 w-5 mr-1.5" />
              <span>Insights</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="wellbeing-tab-content">
            <MoodTracker moodEntries={moodEntries} onAddEntry={addMoodEntry} />
          </TabsContent>

          <TabsContent value="meditation" className="wellbeing-tab-content">
            <MeditationCenter
              sessions={meditationSessions}
              onAddSession={addMeditationSession}
            />
          </TabsContent>

          <TabsContent value="goals" className="wellbeing-tab-content">
            <GoalsManager
              goals={wellbeingGoals}
              onAddGoal={addWellbeingGoal}
              onUpdateProgress={updateGoalProgress}
            />
          </TabsContent>

          <TabsContent value="insights" className="wellbeing-tab-content">
            <InsightsDashboard
              moodEntries={moodEntries}
              meditationSessions={meditationSessions}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
