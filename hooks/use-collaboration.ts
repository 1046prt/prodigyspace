"use client";

import { useProdigyStorage, dateTransformers } from "@/lib/storage";
import type {
  StudyGroup,
  Project,
  ChatMessage,
  MeetingSchedule,
} from "@/types/collaboration";

export function useCollaboration() {
  const [studyGroups, setStudyGroups] = useProdigyStorage<StudyGroup[]>(
    "study-groups",
    [],
    dateTransformers,
  );

  const [projects, setProjects] = useProdigyStorage<Project[]>(
    "projects",
    [],
    dateTransformers,
  );

  const [messages, setMessages] = useProdigyStorage<ChatMessage[]>(
    "messages",
    [],
    dateTransformers,
  );

  const [meetings, setMeetings] = useProdigyStorage<MeetingSchedule[]>(
    "meetings",
    [],
    dateTransformers,
  );

  const createStudyGroup = (
    groupData: Omit<StudyGroup, "id" | "createdAt" | "members">,
  ) => {
    const newGroup: StudyGroup = {
      ...groupData,
      id: Date.now().toString(),
      createdAt: new Date(),
      members: [
        {
          id: "current-user",
          name: "You",
          email: "you@example.com",
          role: "admin",
          joinedAt: new Date(),
          isOnline: true,
        },
      ],
    };
    setStudyGroups([...studyGroups, newGroup]);
    return newGroup;
  };

  const createProject = (
    projectData: Omit<Project, "id" | "createdAt" | "tasks" | "files">,
  ) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      tasks: [],
      files: [],
    };
    setProjects([...projects, newProject]);
    return newProject;
  };

  const addMessage = (messageData: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  const scheduleMeeting = (meetingData: Omit<MeetingSchedule, "id">) => {
    const newMeeting: MeetingSchedule = {
      ...meetingData,
      id: Date.now().toString(),
    };
    setMeetings([...meetings, newMeeting]);
    return newMeeting;
  };

  return {
    studyGroups,
    projects,
    messages,
    meetings,
    createStudyGroup,
    createProject,
    addMessage,
    scheduleMeeting,
  };
}
