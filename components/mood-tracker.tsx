"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, TrendingUp } from "lucide-react";
import type { MoodEntry } from "@/types/wellbeing";
import "@/styles/mood-tracker.css";

interface MoodTrackerProps {
  moodEntries: MoodEntry[];
  onAddEntry: (entry: Omit<MoodEntry, "id">) => void;
}

const moodEmojis = {
  1: { emoji: "😢", label: "Very Bad", color: "text-red-600" },
  2: { emoji: "😕", label: "Bad", color: "text-orange-600" },
  3: { emoji: "😐", label: "Okay", color: "text-yellow-600" },
  4: { emoji: "😊", label: "Good", color: "text-green-600" },
  5: { emoji: "😄", label: "Excellent", color: "text-blue-600" },
};

const activities = [
  "Exercise",
  "Study",
  "Social Time",
  "Sleep",
  "Meditation",
  "Hobbies",
  "Work",
  "Family Time",
  "Outdoor Activity",
  "Reading",
];

export function MoodTracker({ moodEntries, onAddEntry }: MoodTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mood, setMood] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [energy, setEnergy] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [stress, setStress] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [notes, setNotes] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleSubmit = () => {
    onAddEntry({
      date: selectedDate,
      mood,
      energy,
      stress,
      notes: notes.trim(),
      activities: selectedActivities,
    });

    // Reset form
    setMood(3);
    setEnergy(3);
    setStress(3);
    setNotes("");
    setSelectedActivities([]);
  };

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const sum = moodEntries.reduce((acc, entry) => acc + entry.mood, 0);
    return sum / moodEntries.length;
  };

  const recentEntries = moodEntries
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  return (
    <div className="moodTrackerContainer">
      <div className="moodGrid">
        {/* Mood Entry Form */}
        <Card>
          <CardHeader>
            <CardTitle>Log Your Mood</CardTitle>
          </CardHeader>
          <CardContent className="formSection">
            <div>
              <label className="dateLabel">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="dateButton">
                    <CalendarIcon className="calendarIcon" />
                    {format(selectedDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="calendarPopover">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="moodLabel">Mood</label>
              <div className="moodButtons">
                {Object.entries(moodEmojis).map(([value, { emoji, label }]) => (
                  <Button
                    key={value}
                    variant={
                      mood === Number.parseInt(value) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setMood(Number.parseInt(value) as 1 | 2 | 3 | 4 | 5)
                    }
                    className="moodButton"
                  >
                    <span className="moodEmoji">{emoji}</span>
                    <span className="moodLabelSmall">{label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="energyLabel">Energy Level</label>
              <div className="levelButtons">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Button
                    key={level}
                    variant={energy >= level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEnergy(level as 1 | 2 | 3 | 4 | 5)}
                    className="levelButton"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="stressLabel">Stress Level</label>
              <div className="levelButtons">
                {[1, 2, 3, 4, 5].map((level) => (
                  <Button
                    key={level}
                    variant={stress >= level ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setStress(level as 1 | 2 | 3 | 4 | 5)}
                    className="levelButton"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="activitiesLabel">Activities</label>
              <div className="activitiesContainer">
                {activities.map((activity) => (
                  <Badge
                    key={activity}
                    variant={
                      selectedActivities.includes(activity)
                        ? "default"
                        : "outline"
                    }
                    className="activityBadge"
                    onClick={() => toggleActivity(activity)}
                  >
                    {activity}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="notesLabel">Notes (Optional)</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How are you feeling today?"
                rows={3}
                className="notesTextarea"
              />
            </div>

            <Button onClick={handleSubmit} className="submitButton">
              Log Mood
            </Button>
          </CardContent>
        </Card>

        {/* Mood Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="overviewHeader">
              <TrendingUp className="trendIcon" />
              Mood Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="overviewContent">
            <div className="overviewContainer">
              <div className="averageMoodContainer">
                <div className="averageMoodEmoji">
                  {moodEntries.length > 0
                    ? moodEmojis[
                        Math.round(getAverageMood()) as 1 | 2 | 3 | 4 | 5
                      ].emoji
                    : "😐"}
                </div>
                <p className="averageMoodText">
                  Average Mood: {getAverageMood().toFixed(1)}/5 (
                  {moodEntries.length} entries)
                </p>
              </div>

              <div className="recentEntriesContainer">
                <h4 className="recentEntriesTitle">Recent Entries</h4>
                {recentEntries.length === 0 ? (
                  <p className="noEntriesText">No mood entries yet</p>
                ) : (
                  <div className="entriesList">
                    {recentEntries.map((entry) => (
                      <div key={entry.id} className="entryItem">
                        <div className="entryInfo">
                          <span className="entryEmoji">
                            {moodEmojis[entry.mood].emoji}
                          </span>
                          <span className="entryDate">
                            {format(entry.date, "MMM d")}
                          </span>
                        </div>
                        <div className="entryBadges">
                          <Badge variant="outline" className="entryBadge">
                            E: {entry.energy}
                          </Badge>
                          <Badge variant="outline" className="entryBadge">
                            S: {entry.stress}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
