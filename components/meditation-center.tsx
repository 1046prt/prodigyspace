"use client";

import { StatCard } from "@/components/ui-elements";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  RotateCcw,
  Heart,
  Brain,
  Waves,
  Check,
} from "lucide-react";
import type { MeditationSession, BreathingExercise } from "@/types/wellbeing";
import "@/styles/meditation-center.css";

interface MeditationCenterProps {
  sessions: MeditationSession[];
  onAddSession: (session: Omit<MeditationSession, "id">) => void;
}

const breathingExercises: BreathingExercise[] = [
  {
    id: "4-7-8",
    name: "4-7-8 Breathing",
    description: "Calming technique for stress relief and better sleep",
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4,
  },
  {
    id: "box",
    name: "Box Breathing",
    description: "Equal breathing for focus and concentration",
    inhale: 4,
    hold: 4,
    exhale: 4,
    cycles: 6,
  },
  {
    id: "triangle",
    name: "Triangle Breathing",
    description: "Simple technique for beginners",
    inhale: 4,
    hold: 0,
    exhale: 4,
    cycles: 8,
  },
];

const guidedMeditations = [
  {
    type: "mindfulness" as const,
    name: "Mindfulness Meditation",
    description: "Focus on the present moment",
    icon: Brain,
    durations: [5, 10, 15, 20],
  },
  {
    type: "body-scan" as const,
    name: "Body Scan",
    description: "Progressive relaxation technique",
    icon: Waves,
    durations: [10, 15, 20, 30],
  },
  {
    type: "loving-kindness" as const,
    name: "Loving Kindness",
    description: "Cultivate compassion and kindness",
    icon: Heart,
    durations: [10, 15, 20],
  },
];

export function MeditationCenter({
  sessions,
  onAddSession,
}: MeditationCenterProps) {
  const [activeExercise, setActiveExercise] =
    useState<BreathingExercise | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  // Guided meditation states
  const [activeMeditation, setActiveMeditation] = useState<{
    type: MeditationSession["type"];
    duration: number;
  } | null>(null);
  const [meditationTimeLeft, setMeditationTimeLeft] = useState(0);
  const [isMeditationRunning, setIsMeditationRunning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const meditationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && activeExercise && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && activeExercise && timeLeft === 0) {
      // Move to next phase
      if (phase === "inhale") {
        if (activeExercise.hold > 0) {
          setPhase("hold");
          setTimeLeft(activeExercise.hold);
        } else {
          setPhase("exhale");
          setTimeLeft(activeExercise.exhale);
        }
      } else if (phase === "hold") {
        setPhase("exhale");
        setTimeLeft(activeExercise.exhale);
      } else if (phase === "exhale") {
        const nextCycle = currentCycle + 1;
        if (nextCycle < activeExercise.cycles) {
          setCurrentCycle(nextCycle);
          setPhase("inhale");
          setTimeLeft(activeExercise.inhale);
        } else {
          // Exercise complete
          setIsRunning(false);
          if (sessionStartTime) {
            const duration = Math.round(
              (new Date().getTime() - sessionStartTime.getTime()) / 1000 / 60,
            );
            onAddSession({
              type: "breathing",
              duration,
              completedAt: new Date(),
            });
          }
          setActiveExercise(null);
          setCurrentCycle(0);
          setPhase("inhale");
        }
      }
    }

    return () => clearInterval(interval);
  }, [
    isRunning,
    timeLeft,
    phase,
    currentCycle,
    activeExercise,
    sessionStartTime,
    onAddSession,
  ]);

  // Handle guided meditation timer
  useEffect(() => {
    if (isMeditationRunning && activeMeditation && meditationTimeLeft > 0) {
      meditationIntervalRef.current = setInterval(() => {
        setMeditationTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (
      isMeditationRunning &&
      activeMeditation &&
      meditationTimeLeft === 0
    ) {
      // Meditation complete
      finishMeditation();
    }

    return () => {
      if (meditationIntervalRef.current) {
        clearInterval(meditationIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMeditationRunning, activeMeditation, meditationTimeLeft]);

  const startBreathingExercise = (exercise: BreathingExercise) => {
    setActiveExercise(exercise);
    setCurrentCycle(0);
    setPhase("inhale");
    setTimeLeft(exercise.inhale);
    setIsRunning(true);
    setSessionStartTime(new Date());
  };

  const pauseExercise = () => {
    setIsRunning(!isRunning);
  };

  const resetExercise = () => {
    setIsRunning(false);
    setActiveExercise(null);
    setCurrentCycle(0);
    setPhase("inhale");
    setTimeLeft(0);
    setSessionStartTime(null);
  };

  const startGuidedMeditation = (
    type: MeditationSession["type"],
    duration: number,
  ) => {
    setActiveMeditation({ type, duration });
    setMeditationTimeLeft(duration * 60);
    setIsMeditationRunning(true);
    setShowCompletion(false);
  };

  const pauseMeditation = () => {
    setIsMeditationRunning(!isMeditationRunning);
  };

  const resetMeditation = () => {
    setIsMeditationRunning(false);
    setActiveMeditation(null);
    setMeditationTimeLeft(0);
    if (meditationIntervalRef.current) {
      clearInterval(meditationIntervalRef.current);
    }
  };

  const finishMeditation = () => {
    setIsMeditationRunning(false);
    if (meditationIntervalRef.current) {
      clearInterval(meditationIntervalRef.current);
    }
    onAddSession({
      type: activeMeditation!.type,
      duration: activeMeditation!.duration,
      completedAt: new Date(),
    });
    setActiveMeditation(null);
    setShowCompletion(true);
    setTimeout(() => setShowCompletion(false), 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.duration,
    0,
  );
  const averageRating =
    sessions.length > 0
      ? sessions.reduce((sum, s) => sum + (s.rating || 0), 0) / sessions.length
      : 0;

  return (
    <div className="meditationContainer">
      {/* Stats */}
      <div className="statsGrid">
        <StatCard
          title="Sessions"
          value={totalSessions}
          description="Total meditation sessions"
          icon={Check}
        />
        <StatCard
          title="Minutes"
          value={totalMinutes}
          description="Total minutes meditated"
          icon={Waves}
        />
        <StatCard
          title="Avg Rating"
          value={averageRating.toFixed(1)}
          description="Average session rating"
          icon={Heart}
        />
      </div>

      <div className="mainGrid">
        {/* Breathing Exercises */}
        <Card className="card">
          <CardHeader className="cardHeader">
            <CardTitle className="cardTitle">Breathing Exercises</CardTitle>
          </CardHeader>
          <CardContent className="cardContent">
            {activeExercise ? (
              <div className="exerciseActiveContainer">
                <h3 className="exerciseName">{activeExercise.name}</h3>
                <div className="timeDisplay">{timeLeft}</div>
                <div className="phaseDisplay">{phase}</div>
                <div className="progressContainer">
                  <Progress
                    value={((currentCycle + 1) / activeExercise.cycles) * 100}
                    className="progressBar"
                  />
                </div>
                <div className="cycleInfo">
                  Cycle {currentCycle + 1} of {activeExercise.cycles}
                </div>
                <div className="controlsContainer">
                  <Button
                    onClick={pauseExercise}
                    variant="outline"
                    className="controlButton"
                  >
                    {isRunning ? (
                      <Pause className="buttonIcon" />
                    ) : (
                      <Play className="buttonIcon" />
                    )}
                  </Button>
                  <Button
                    onClick={resetExercise}
                    variant="outline"
                    className="controlButton"
                  >
                    <RotateCcw className="buttonIcon" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="exercisesList">
                {breathingExercises.map((exercise) => (
                  <Card key={exercise.id} className="exerciseCard">
                    <CardContent className="exerciseCardContent">
                      <div className="exerciseHeader">
                        <div className="exerciseInfo">
                          <h4 className="exerciseName">{exercise.name}</h4>
                          <p className="exerciseDescription">
                            {exercise.description}
                          </p>
                          <div className="exerciseBadges">
                            <Badge variant="outline" className="exerciseBadge">
                              {exercise.inhale}s inhale
                            </Badge>
                            {exercise.hold > 0 && (
                              <Badge
                                variant="outline"
                                className="exerciseBadge"
                              >
                                {exercise.hold}s hold
                              </Badge>
                            )}
                            <Badge variant="outline" className="exerciseBadge">
                              {exercise.exhale}s exhale
                            </Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => startBreathingExercise(exercise)}
                          size="sm"
                          className="startButton"
                        >
                          <Play className="buttonIcon" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Guided Meditations */}
        <Card className="card">
          <CardHeader className="cardHeader">
            <CardTitle className="cardTitle">Guided Meditations</CardTitle>
          </CardHeader>
          <CardContent className="cardContent">
            {activeMeditation ? (
              <div className="meditationActiveContainer">
                <h3 className="meditationName">
                  {
                    guidedMeditations.find(
                      (m) => m.type === activeMeditation.type,
                    )?.name
                  }
                </h3>
                <div className="timeDisplay">
                  {formatTime(meditationTimeLeft)}
                </div>
                <div className="sessionInfo">
                  {activeMeditation.duration} minute session
                </div>
                <div className="progressContainer">
                  <Progress
                    value={
                      ((activeMeditation.duration * 60 - meditationTimeLeft) /
                        (activeMeditation.duration * 60)) *
                      100
                    }
                    className="progressBar"
                  />
                </div>
                <div className="controlsContainer">
                  <Button
                    onClick={pauseMeditation}
                    variant="outline"
                    className="controlButton"
                  >
                    {isMeditationRunning ? (
                      <Pause className="buttonIcon" />
                    ) : (
                      <Play className="buttonIcon" />
                    )}
                  </Button>
                  <Button
                    onClick={resetMeditation}
                    variant="outline"
                    className="controlButton"
                  >
                    <RotateCcw className="buttonIcon" />
                  </Button>
                  <Button
                    onClick={finishMeditation}
                    variant="outline"
                    className="controlButton"
                  >
                    <Check className="buttonIcon" />
                  </Button>
                </div>
              </div>
            ) : showCompletion ? (
              <div className="completionContainer">
                <div className="completionIcon">
                  <Check className="completionCheckIcon" />
                </div>
                <h3 className="completionTitle">Session Complete!</h3>
                <p className="completionMessage">
                  Great job on your meditation practice
                </p>
              </div>
            ) : (
              <div className="meditationsList">
                {guidedMeditations.map((meditation) => (
                  <Card key={meditation.type} className="meditationCard">
                    <CardContent className="meditationCardContent">
                      <div className="meditationHeader">
                        <meditation.icon className="meditationIcon" />
                        <div className="meditationInfo">
                          <h4 className="meditationName">{meditation.name}</h4>
                          <p className="meditationDescription">
                            {meditation.description}
                          </p>
                          <div className="durationButtons">
                            {meditation.durations.map((duration) => (
                              <Button
                                key={duration}
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  startGuidedMeditation(
                                    meditation.type,
                                    duration,
                                  )
                                }
                                className="durationButton"
                              >
                                {duration} min
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
