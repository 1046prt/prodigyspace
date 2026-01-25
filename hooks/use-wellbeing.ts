"use client";

import { useProdigyStorage, dateTransformers } from "@/lib/storage";
import type {
  MoodEntry,
  MeditationSession,
  FocusSession,
  WellbeingGoal,
} from "@/types/wellbeing";

export function useWellbeing() {
  const [moodEntries, setMoodEntries] = useProdigyStorage<MoodEntry[]>(
    "mood-entries",
    [],
    dateTransformers,
  );

  const [meditationSessions, setMeditationSessions] = useProdigyStorage<
    MeditationSession[]
  >("meditations", [], dateTransformers);

  const [focusSessions, setFocusSessions] = useProdigyStorage<FocusSession[]>(
    "focus-sessions",
    [],
    dateTransformers,
  );

  const [wellbeingGoals, setWellbeingGoals] = useProdigyStorage<
    WellbeingGoal[]
  >("wellbeing-goals", [], dateTransformers);

  const addMoodEntry = (entryData: Omit<MoodEntry, "id">) => {
    const newEntry: MoodEntry = {
      ...entryData,
      id: Date.now().toString(),
    };
    setMoodEntries([...moodEntries, newEntry]);
  };

  const addMeditationSession = (sessionData: Omit<MeditationSession, "id">) => {
    const newSession: MeditationSession = {
      ...sessionData,
      id: Date.now().toString(),
    };
    setMeditationSessions([...meditationSessions, newSession]);
  };

  const addFocusSession = (sessionData: Omit<FocusSession, "id">) => {
    const newSession: FocusSession = {
      ...sessionData,
      id: Date.now().toString(),
    };
    setFocusSessions([...focusSessions, newSession]);
  };

  const addWellbeingGoal = (
    goalData: Omit<WellbeingGoal, "id" | "createdAt">,
  ) => {
    const newGoal: WellbeingGoal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setWellbeingGoals([...wellbeingGoals, newGoal]);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    const updatedGoals = wellbeingGoals.map((goal) =>
      goal.id === goalId
        ? { ...goal, current: Math.min(progress, goal.target) }
        : goal,
    );
    setWellbeingGoals(updatedGoals);
  };

  return {
    moodEntries,
    meditationSessions,
    focusSessions,
    wellbeingGoals,
    addMoodEntry,
    addMeditationSession,
    addFocusSession,
    addWellbeingGoal,
    updateGoalProgress,
  };
}
