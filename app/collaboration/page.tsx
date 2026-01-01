"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Users,
  Plus,
  Search,
  MessageCircle,
  Calendar,
  FolderOpen,
  Clock,
  Video,
  Share2,
  Settings,
} from "lucide-react";
import { useState } from "react";
import "@/styles/collaboration.css";

export default function CollaborationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  // Mock data - replace with actual data management
  const studyGroups = [
    {
      id: 1,
      name: "Advanced Algorithms Study Group",
      description:
        "Weekly discussions on complex algorithms and data structures",
      members: 8,
      subject: "Computer Science",
      nextMeeting: "2024-01-20T14:00:00",
      isActive: true,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "Calculus Problem Solving",
      description: "Collaborative problem-solving sessions for Calculus III",
      members: 12,
      subject: "Mathematics",
      nextMeeting: "2024-01-18T16:00:00",
      isActive: true,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "History Research Group",
      description: "Research and discussion on 20th century history",
      members: 6,
      subject: "History",
      nextMeeting: null,
      isActive: false,
      avatar: "/api/placeholder/40/40",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Machine Learning Web App",
      description: "Building a web application that demonstrates ML algorithms",
      status: "In Progress",
      priority: "High",
      dueDate: "2024-02-15",
      team: ["Alice", "Bob", "Charlie"],
      progress: 65,
      subject: "Computer Science",
    },
    {
      id: 2,
      title: "Statistical Analysis Report",
      description: "Analyzing survey data for statistics class project",
      status: "Review",
      priority: "Medium",
      dueDate: "2024-01-25",
      team: ["Diana", "Eve"],
      progress: 90,
      subject: "Mathematics",
    },
    {
      id: 3,
      title: "Historical Timeline Presentation",
      description: "Interactive timeline of World War II events",
      status: "Planning",
      priority: "Low",
      dueDate: "2024-03-01",
      team: ["Frank", "Grace", "Henry", "Ivy"],
      progress: 25,
      subject: "History",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Review":
        return "bg-yellow-100 text-yellow-800";
      case "Planning":
        return "bg-gray-100 text-gray-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="collaboration-page">
      <div className="collaboration-container">
        {/* Header */}
        <div className="collaboration-header">
          <div className="collaboration-title-section">
            <h1 className="collaboration-title">Collaboration Hub</h1>
            <p className="collaboration-subtitle">
              Connect with classmates and work together on projects
            </p>
          </div>
          <div className="collaboration-actions">
            <Dialog
              open={isCreateGroupOpen}
              onOpenChange={setIsCreateGroupOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto">
                  <Users className="h-4 w-4 mr-2" />
                  New Group
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Study Group</DialogTitle>
                  <DialogDescription>
                    Start a new study group for collaborative learning
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Group name..." />
                  <Input placeholder="Subject..." />
                  <Input placeholder="Description..." />
                  <div className="flex flex-col md:flex-row justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateGroupOpen(false)}
                      className="w-full md:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setIsCreateGroupOpen(false)}
                      className="w-full md:w-auto"
                    >
                      Create Group
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isCreateProjectOpen}
              onOpenChange={setIsCreateProjectOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create Project</DialogTitle>
                  <DialogDescription>
                    Start a new collaborative project
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Project title..." />
                  <Input placeholder="Subject..." />
                  <Input placeholder="Description..." />
                  <Input type="date" placeholder="Due date..." />
                  <div className="flex flex-col md:flex-row justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateProjectOpen(false)}
                      className="w-full md:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setIsCreateProjectOpen(false)}
                      className="w-full md:w-auto"
                    >
                      Create Project
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search */}
        <div className="collaboration-search">
          <Search className="collaboration-search-icon" />
          <Input
            placeholder="Search groups and projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="collaboration-search-input"
          />
        </div>

        <Tabs defaultValue="groups" className="collaboration-tabs">
          <TabsList className="collaboration-tabs-list">
            <TabsTrigger value="groups" className="collaboration-tab-trigger">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Study Groups</span>
              <span className="sm:hidden">Groups</span>
              <Badge variant="secondary" className="ml-2">
                {studyGroups.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="projects" className="collaboration-tab-trigger">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
              <Badge variant="secondary" className="ml-2">
                {projects.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            {studyGroups.length === 0 ? (
              <div className="collaboration-empty-state">
                <Users className="collaboration-empty-icon" />
                <h3 className="collaboration-empty-title">
                  No study groups yet
                </h3>
                <p className="collaboration-empty-description">
                  Create or join study groups to collaborate with classmates
                </p>
                <button
                  className="collaboration-empty-button"
                  onClick={() => setIsCreateGroupOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Create Study Group
                </button>
              </div>
            ) : (
              <div className="collaboration-grid">
                {studyGroups.map((group) => (
                  <div key={group.id} className="collaboration-group-card">
                    <div className="collaboration-group-header">
                      <div className="collaboration-group-info">
                        <div className="collaboration-group-avatar">
                          {group.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div className="collaboration-group-details">
                          <h3 className="collaboration-group-name">
                            {group.name}
                          </h3>
                          <span className="collaboration-group-subject">
                            {group.subject}
                          </span>
                        </div>
                      </div>
                      <div className="collaboration-group-status">
                        {group.isActive && (
                          <div className="collaboration-status-indicator"></div>
                        )}
                      </div>
                    </div>

                    <p className="collaboration-group-description">
                      {group.description}
                    </p>

                    <div className="collaboration-group-meta">
                      <span className="collaboration-member-count">
                        {group.members} members
                      </span>
                      {group.nextMeeting && (
                        <div className="collaboration-next-meeting">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(group.nextMeeting)}</span>
                        </div>
                      )}
                    </div>

                    <div className="collaboration-group-actions">
                      <button className="collaboration-action-button collaboration-action-button-primary">
                        <MessageCircle className="h-3 w-3" />
                        Chat
                      </button>
                      <button className="collaboration-action-button collaboration-action-button-secondary">
                        <Video className="h-3 w-3" />
                        Meet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {projects.length === 0 ? (
              <div className="collaboration-empty-state">
                <FolderOpen className="collaboration-empty-icon" />
                <h3 className="collaboration-empty-title">No projects yet</h3>
                <p className="collaboration-empty-description">
                  Create collaborative projects to work with your team
                </p>
                <button
                  className="collaboration-empty-button"
                  onClick={() => setIsCreateProjectOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  Create Project
                </button>
              </div>
            ) : (
              <div className="collaboration-grid">
                {projects.map((project) => {
                  const daysUntilDue = getDaysUntilDue(project.dueDate);

                  return (
                    <div
                      key={project.id}
                      className="collaboration-project-card"
                    >
                      <div className="collaboration-project-header">
                        <div className="collaboration-project-info">
                          <h3 className="collaboration-project-title">
                            {project.title}
                          </h3>
                          <div className="collaboration-project-badges">
                            <span
                              className={`collaboration-project-badge ${getStatusColor(
                                project.status
                              )}`}
                            >
                              {project.status}
                            </span>
                            <span
                              className={`collaboration-project-badge ${getPriorityColor(
                                project.priority
                              )}`}
                            >
                              {project.priority}
                            </span>
                          </div>
                        </div>
                        <div className="collaboration-project-actions">
                          <button className="collaboration-project-action">
                            <Share2 className="h-3 w-3" />
                          </button>
                          <button className="collaboration-project-action">
                            <Settings className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <p className="collaboration-project-description">
                        {project.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="collaboration-progress-section">
                        <div className="collaboration-progress-header">
                          <span className="collaboration-progress-label">
                            Progress
                          </span>
                          <span className="collaboration-progress-value">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="collaboration-progress-bar">
                          <div
                            className="collaboration-progress-fill"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="collaboration-team-section">
                        <div className="collaboration-team-avatars">
                          {project.team.slice(0, 3).map((member, index) => (
                            <div
                              key={index}
                              className="collaboration-team-avatar"
                            >
                              {member[0]}
                            </div>
                          ))}
                          {project.team.length > 3 && (
                            <div className="collaboration-team-overflow">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="collaboration-team-count">
                          {project.team.length} members
                        </span>
                      </div>

                      {/* Footer */}
                      <div className="collaboration-project-footer">
                        <span className="collaboration-project-subject">
                          {project.subject}
                        </span>
                        <div
                          className={`collaboration-due-date ${
                            daysUntilDue < 0
                              ? "collaboration-due-date-overdue"
                              : daysUntilDue < 7
                              ? "collaboration-due-date-warning"
                              : "collaboration-due-date-normal"
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          <span>
                            {daysUntilDue < 0
                              ? `${Math.abs(daysUntilDue)} days overdue`
                              : daysUntilDue === 0
                              ? "Due today"
                              : `${daysUntilDue} days left`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
