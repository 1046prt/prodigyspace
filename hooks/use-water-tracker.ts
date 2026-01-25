"use client";

import { useProdigyStorage, dateTransformers } from "@/lib/storage";
import type { WaterIntake } from "@/types/utilities";

export function useWaterTracker() {
  const [waterIntakes, setWaterIntakes] = useProdigyStorage<WaterIntake[]>(
    "water-intakes",
    [],
    dateTransformers,
  );

  const [dailyGoal, setDailyGoal] = useProdigyStorage<number>(
    "daily-water-goal",
    2000,
  );

  const addWaterIntake = (amount: number) => {
    const newIntake: WaterIntake = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date(),
    };
    setWaterIntakes([...waterIntakes, newIntake]);
  };

  const removeWaterIntake = (id: string) => {
    setWaterIntakes(waterIntakes.filter((intake) => intake.id !== id));
  };

  const updateDailyGoal = (goal: number) => {
    setDailyGoal(goal);
  };

  const getTodayIntake = () => {
    const today = new Date().toDateString();
    return waterIntakes
      .filter((intake) => new Date(intake.timestamp).toDateString() === today)
      .reduce((total, intake) => total + intake.amount, 0);
  };

  const getTodayIntakes = () => {
    const today = new Date().toDateString();
    return waterIntakes.filter(
      (intake) => new Date(intake.timestamp).toDateString() === today,
    );
  };

  return {
    waterIntakes,
    dailyGoal,
    addWaterIntake,
    removeWaterIntake,
    updateDailyGoal,
    getTodayIntake,
    getTodayIntakes,
  };
}
