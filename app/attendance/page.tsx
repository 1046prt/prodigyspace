"use client";

import { AttendanceTracker } from "@/components/attendance-tracker";

export default function AttendancePage() {
  return (
    <div className="w-full py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AttendanceTracker />
      </div>
    </div>
  );
}
