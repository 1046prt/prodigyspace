"use client";

import { EmptyState } from "@/components/ui-elements";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users, Plus, Calendar, MessageCircle, Settings } from "lucide-react";
import type { StudyGroup } from "@/types/collaboration";
import "@/styles/study-group-manager.css";

interface StudyGroupManagerProps {
  studyGroups: StudyGroup[];
  onCreateGroup: (
    groupData: Omit<StudyGroup, "id" | "createdAt" | "members">,
  ) => void;
  onSelectGroup: (group: StudyGroup) => void;
}

export function StudyGroupManager({
  studyGroups,
  onCreateGroup,
  onSelectGroup,
}: StudyGroupManagerProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupSubject, setGroupSubject] = useState("");

  const handleCreateGroup = () => {
    if (!groupName.trim() || !groupSubject.trim()) return;

    onCreateGroup({
      name: groupName.trim(),
      description: groupDescription.trim(),
      subject: groupSubject.trim(),
      isActive: true,
    });

    setGroupName("");
    setGroupDescription("");
    setGroupSubject("");
    setShowCreateDialog(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Study Groups</h2>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="createButton">
              <Plus className="icon-sm icon-gap" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Study Group</DialogTitle>
            </DialogHeader>
            <div className="dialogContent">
              <div>
                <label className="formLabel">Group Name</label>
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="Enter group name..."
                />
              </div>
              <div>
                <label className="formLabel">Subject</label>
                <Input
                  value={groupSubject}
                  onChange={(e) => setGroupSubject(e.target.value)}
                  placeholder="e.g., Mathematics, Computer Science..."
                />
              </div>
              <div>
                <label className="formLabel">Description</label>
                <Textarea
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  placeholder="Describe the group's purpose..."
                  rows={3}
                />
              </div>
              <div className="actionButtons">
                <Button
                  variant="outline"
                  onClick={() => setShowCreateDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  disabled={!groupName.trim() || !groupSubject.trim()}
                >
                  Create Group
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {studyGroups.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No study groups yet"
          description="Create your first study group to start collaborating!"
          action={{
            label: "Create Group",
            onClick: () => setShowCreateDialog(true),
          }}
        />
      ) : (
        <div className="groupsGrid">
          {studyGroups.map((group) => (
            <Card key={group.id} className="groupCard">
              <CardHeader className="cardHeader">
                <div className="cardHeaderContent">
                  <div>
                    <CardTitle className="cardTitle">{group.name}</CardTitle>
                    <Badge variant="outline" className="subjectBadge">
                      {group.subject}
                    </Badge>
                  </div>
                  <Badge variant={group.isActive ? "default" : "secondary"}>
                    {group.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="descriptionText">
                  {group.description || "No description"}
                </p>

                <div className="membersContainer">
                  <div className="avatarGroup">
                    {group.members.slice(0, 3).map((member) => (
                      <Avatar
                        key={member.id}
                        className="avatar-sm avatar-border"
                      >
                        <AvatarFallback className="avatar-fallback-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="memberCount">
                    {group.members.length} member
                    {group.members.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="actionButtonsGroup">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSelectGroup(group)}
                    className="chatButton"
                  >
                    <MessageCircle className="icon-xs icon-gap-sm" />
                    Chat
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSelectGroup(group)}
                  >
                    <Calendar className="icon-xs" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSelectGroup(group)}
                  >
                    <Settings className="icon-xs" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
