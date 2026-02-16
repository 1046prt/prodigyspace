"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Plus, CalendarIcon, Users, FileText, Clock } from "lucide-react";
import "@/styles/project-collaboration.css";
import type { Project, StudyGroup } from "@/types/collaboration";

interface ProjectCollaborationProps {
  projects: Project[];
  studyGroups: StudyGroup[];
  onCreateProject: (
    projectData: Omit<Project, "id" | "createdAt" | "tasks" | "files">
  ) => void;
}

export function ProjectCollaboration({
  projects,
  studyGroups,
  onCreateProject,
}: ProjectCollaborationProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [dueDate, setDueDate] = useState<Date>();

  const handleCreateProject = () => {
    if (!projectTitle.trim() || !selectedGroupId || !dueDate) return;

    onCreateProject({
      title: projectTitle.trim(),
      description: projectDescription.trim(),
      groupId: selectedGroupId,
      status: "planning",
      dueDate,
    });

    setProjectTitle("");
    setProjectDescription("");
    setSelectedGroupId("");
    setDueDate(undefined);
    setShowCreateDialog(false);
  };

  const getProjectProgress = (project: Project) => {
    if (project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter(
      (task) => task.status === "completed"
    ).length;
    return (completedTasks / project.tasks.length) * 100;
  };

  return (
    <div className={"projectCollaboration"}>
      <div className={"projectCollaborationHeader"}>
        <h2 className={"projectCollaborationTitle"}>Group Projects</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
            <Button disabled={studyGroups.length === 0}>
              <Plus className="icon-sm icon-gap" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Group Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label>Project Title</label>
                <Input
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Enter project title..."
                />
              </div>
              <div>
                <label>Study Group</label>
                <Select
                  value={selectedGroupId}
                  onValueChange={setSelectedGroupId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a study group" />
                  </SelectTrigger>
                  <SelectContent>
                    {studyGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name} ({group.subject})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Due Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="popover-trigger-button"
                    >
                      <CalendarIcon className="icon-sm icon-gap" />
                      {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label>Description</label>
                <Textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe the project..."
                  rows={3}
                />
              </div>
              <div className="dialog-actions">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateProject}
                  disabled={
                    !projectTitle.trim() || !selectedGroupId || !dueDate
                  }
                >
                  Create Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className={"projectCardContent"}>
            <FileText className="project-empty-icon" />
            <h3 className="project-empty-title">No projects yet</h3>
            <p className="project-empty-message">
              {studyGroups.length === 0
                ? "Create a study group first, then start collaborating on projects!"
                : "Create your first group project to start collaborating!"}
            </p>
            {studyGroups.length > 0 && (
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="icon-sm icon-gap" />
                Create Project
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className={"projectCollaborationGrid"}>
          {projects.map((project) => {
            const group = studyGroups.find((g) => g.id === project.groupId);
            const progress = getProjectProgress(project);
            const daysUntilDue = Math.ceil(
              (project.dueDate.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            );

            // Map status to CSS class
            const statusClass =
              project.status === "planning"
                ? "projectStatus projectStatusPlanning"
                : project.status === "in-progress"
                ? "projectStatus projectStatusInProgress"
                : project.status === "review"
                ? "projectStatus projectStatusReview"
                : project.status === "completed"
                ? "projectStatus projectStatusCompleted"
                : "projectStatus projectStatusDefault";

            return (
              <Card key={project.id} className={"projectCard"}>
                <CardHeader className="project-card-header">
                  <div className="project-card-header-row">
                    <CardTitle className={"projectCardTitle"}>
                      {project.title}
                    </CardTitle>
                    <Badge variant="outline" className={statusClass}>
                      {project.status}
                    </Badge>
                  </div>
                  {group && (
                    <Badge variant="secondary" className="badge-fit">
                      {group.name}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className={"projectCardDescription"}>
                    {project.description || "No description"}
                  </p>

                  <div className="project-progress-wrapper">
                    <div className="project-progress-row">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className={"projectProgress"} />
                  </div>

                  <div className="project-meta-row">
                    <div className="project-meta-left">
                      <Clock className="icon-xs" />
                      <span
                        className={
                          daysUntilDue < 0
                            ? "projectOverdue"
                            : daysUntilDue < 7
                            ? "projectDueSoon"
                            : ""
                        }
                      >
                        {daysUntilDue < 0
                          ? `${Math.abs(daysUntilDue)} days overdue`
                          : daysUntilDue === 0
                          ? "Due today"
                          : `${daysUntilDue} days left`}
                      </span>
                    </div>
                    <div className="project-meta-right">
                      <Users className="icon-xs" />
                      <span>{group?.members.length || 0}</span>
                    </div>
                  </div>

                  <div className={"projectCardActions"}>
                    <Button size="sm" variant="outline" className="btn">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <FileText className="icon-xs" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
