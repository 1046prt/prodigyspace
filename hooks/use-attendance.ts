"use client";

import { useState, useEffect } from "react";
import type { AttendanceSubject, AttendanceStats } from "@/types/attendance";

export function useAttendance() {
  const [subjects, setSubjects] = useState<AttendanceSubject[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedSubjects = localStorage.getItem("attendance-subjects");
      if (savedSubjects) {
        const parsed = JSON.parse(savedSubjects);
        setSubjects(
          parsed.map(
            (
              subject: AttendanceSubject & {
                createdAt: string;
                updatedAt: string;
              }
            ) => ({
              ...subject,
              createdAt: new Date(subject.createdAt),
              updatedAt: new Date(subject.updatedAt),
            })
          )
        );
      }
    } catch (error) {
      console.error("Error loading attendance data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage whenever subjects change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("attendance-subjects", JSON.stringify(subjects));
    }
  }, [subjects, loading]);

  const addSubject = (
    name: string,
    totalClasses: number,
    attendedClasses: number,
    targetPercentage: number = 75
  ) => {
    const newSubject: AttendanceSubject = {
      id: crypto.randomUUID(),
      name: name.trim(),
      totalClasses,
      attendedClasses,
      targetPercentage,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSubjects((prev) => [...prev, newSubject]);
  };

  const updateSubject = (id: string, updates: Partial<AttendanceSubject>) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === id
          ? { ...subject, ...updates, updatedAt: new Date() }
          : subject
      )
    );
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
  };

  const markPresent = (id: string) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              totalClasses: subject.totalClasses + 1,
              attendedClasses: subject.attendedClasses + 1,
              updatedAt: new Date(),
            }
          : subject
      )
    );
  };

  const markAbsent = (id: string) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              totalClasses: subject.totalClasses + 1,
              updatedAt: new Date(),
            }
          : subject
      )
    );
  };

  const calculateStats = (subject: AttendanceSubject): AttendanceStats => {
    const currentPercentage =
      subject.totalClasses === 0
        ? 0
        : (subject.attendedClasses / subject.totalClasses) * 100;

    // Calculate classes that can be skipped while maintaining target percentage
    let classesToSkip = 0;
    if (currentPercentage > subject.targetPercentage) {
      // Formula: (attendedClasses / (totalClasses + skippedClasses)) >= targetPercentage/100
      // Solving for skippedClasses: skippedClasses <= (attendedClasses - targetPercentage * totalClasses) / targetPercentage * 100
      const maxSkippable = Math.floor(
        (subject.attendedClasses * 100 -
          subject.targetPercentage * subject.totalClasses) /
          subject.targetPercentage
      );
      classesToSkip = Math.max(0, maxSkippable);
    }

    // Calculate classes needed to reach target percentage
    let classesNeeded = 0;
    if (currentPercentage < subject.targetPercentage) {
      // Formula: (attendedClasses + classesNeeded) / (totalClasses + classesNeeded) >= targetPercentage/100
      // Solving for classesNeeded
      const needed = Math.ceil(
        (subject.targetPercentage * subject.totalClasses -
          subject.attendedClasses * 100) /
          (100 - subject.targetPercentage)
      );
      classesNeeded = Math.max(0, needed);
    }

    return {
      currentPercentage,
      classesToSkip,
      classesNeeded,
      isOnTrack: currentPercentage >= subject.targetPercentage,
    };
  };

  return {
    subjects,
    loading,
    addSubject,
    updateSubject,
    deleteSubject,
    markPresent,
    markAbsent,
    calculateStats,
  };
}
