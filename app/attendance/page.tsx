"use client";

import { AttendanceTracker } from "@/components/attendance-tracker";
import "@/styles/attendance.css";

export default function AttendancePage() {
  return (
    <div className="w-full py-6 attendance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 attendance-container">
        <AttendanceTracker />
      </div>
    </div>
  );
}
