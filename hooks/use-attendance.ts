"use client";

import { useProdigyStorage, dateTransformers } from "@/lib/storage";
import type { AttendanceSubject, AttendanceStats } from "@/types/attendance";

export function useAttendance() {
  const [subjects, setSubjects] = useProdigyStorage<AttendanceSubject[]>(
    "attendance-subjects",
    [],
    dateTransformers,
  );

  const addSubject = (
    name: string,
    totalClasses: number,
    attendedClasses: number,
    targetPercentage: number = 75,
  ) => {
    try {
      // Ensure we have valid data
      if (!name.trim()) {
        throw new Error("Subject name cannot be empty");
      }

      // Ensure the counts are positive numbers
      const validTotalClasses = Math.max(0, totalClasses || 0);
      const validAttendedClasses = Math.max(
        0,
        Math.min(validTotalClasses, attendedClasses || 0),
      );
      const validTargetPercentage = Math.max(
        0,
        Math.min(100, targetPercentage || 75),
      );

      // Generate a unique ID
      let id;
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        id = `subject-${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 9)}`;
      }

      const newSubject: AttendanceSubject = {
        id,
        name: name.trim(),
        totalClasses: validTotalClasses,
        attendedClasses: validAttendedClasses,
        targetPercentage: validTargetPercentage,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Use a callback to ensure we have the latest state
      setSubjects((prev) => {
        // First check if we already have this subject (by name)
        if (
          prev.some(
            (subject) =>
              subject.name.toLowerCase() === name.trim().toLowerCase(),
          )
        ) {
          // Subject with this name already exists
          // Return unchanged - could also throw an error here
          return prev;
        }

        return [...prev, newSubject];
      });
    } catch (error) {
      throw error; // Re-throw the error so the component can handle it
    }
  };

  const updateSubject = (id: string, updates: Partial<AttendanceSubject>) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === id
          ? { ...subject, ...updates, updatedAt: new Date() }
          : subject,
      ),
    );
  };

  const deleteSubject = (id: string) => {
    try {
      if (!id) {
        return;
      }

      setSubjects((prev) => {
        // Check if subject exists before filtering
        const subjectExists = prev.some((subject) => subject.id === id);
        if (!subjectExists) {
          return prev;
        }

        return prev.filter((subject) => subject.id !== id);
      });
    } catch {
      // Error handling for deleting subject
    }
  };

  const markPresent = (id: string) => {
    try {
      if (!id) {
        return;
      }

      setSubjects((prev) => {
        // First find the subject to verify it exists
        const subjectExists = prev.some((subject) => subject.id === id);
        if (!subjectExists) {
          return prev;
        }

        return prev.map((subject) =>
          subject.id === id
            ? {
                ...subject,
                totalClasses: subject.totalClasses + 1,
                attendedClasses: subject.attendedClasses + 1,
                updatedAt: new Date(),
              }
            : subject,
        );
      });
    } catch {
      // Error handling for marking subject as present
    }
  };

  const markAbsent = (id: string) => {
    try {
      if (!id) {
        return;
      }

      setSubjects((prev) => {
        // First find the subject to verify it exists
        const subjectExists = prev.some((subject) => subject.id === id);
        if (!subjectExists) {
          return prev;
        }

        return prev.map((subject) =>
          subject.id === id
            ? {
                ...subject,
                totalClasses: subject.totalClasses + 1,
                updatedAt: new Date(),
              }
            : subject,
        );
      });
    } catch {
      // Error handling for marking subject as absent
    }
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
          subject.targetPercentage,
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
          (100 - subject.targetPercentage),
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
    addSubject,
    updateSubject,
    deleteSubject,
    markPresent,
    markAbsent,
    calculateStats,
  };
}
