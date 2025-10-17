export interface AttendanceSubject {
  id: string;
  name: string;
  totalClasses: number;
  attendedClasses: number;
  targetPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceStats {
  currentPercentage: number;
  classesToSkip: number;
  classesNeeded: number;
  isOnTrack: boolean;
}
