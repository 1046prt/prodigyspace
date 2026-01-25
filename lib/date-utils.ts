/**
 * Common date and time utilities to eliminate duplication across the codebase
 */

export interface TimeZoneOptions {
  timeZone?: string;
  locale?: string;
}

export interface DateFormatOptions extends Intl.DateTimeFormatOptions {
  timeZone?: string;
  locale?: string;
}

/**
 * Get current date for consistent usage across components
 */
export function getCurrentDate(): Date {
  return new Date();
}

/**
 * Get current time formatted as string
 */
export function getCurrentTimeString(options?: TimeZoneOptions): string {
  return new Date().toLocaleTimeString(options?.locale || "en-US", {
    timeZone: options?.timeZone,
  });
}

/**
 * Get current date formatted as string
 */
export function getCurrentDateString(options?: DateFormatOptions): string {
  return new Date().toLocaleDateString(options?.locale || "en-US", {
    weekday: options?.weekday || "long",
    year: options?.year || "numeric",
    month: options?.month || "long",
    day: options?.day || "numeric",
    timeZone: options?.timeZone,
    ...options,
  });
}

/**
 * Format time with timezone for world clock functionality
 */
export function getTimeInTimeZone(
  timeZone: string,
  options?: Omit<TimeZoneOptions, "timeZone">,
): string {
  return new Date().toLocaleTimeString(options?.locale || "en-US", {
    timeZone,
  });
}

/**
 * Common world clock time zones
 */
export const WORLD_CLOCK_TIMEZONES = {
  "New York": "America/New_York",
  London: "Europe/London",
  Tokyo: "Asia/Tokyo",
  Sydney: "Australia/Sydney",
  Mumbai: "Asia/Kolkata",
  Dubai: "Asia/Dubai",
  "Los Angeles": "America/Los_Angeles",
  Berlin: "Europe/Berlin",
} as const;

/**
 * Get time for all common timezones
 */
export function getAllTimeZones(locale?: string): Record<string, string> {
  const result: Record<string, string> = {};
  Object.entries(WORLD_CLOCK_TIMEZONES).forEach(([city, timezone]) => {
    result[city] = getTimeInTimeZone(timezone, { locale });
  });
  return result;
}

/**
 * Format timer time (MM:SS or HH:MM:SS)
 */
export function formatTimerTime(
  minutes: number,
  seconds: number,
  hours: number = 0,
): string {
  const pad = (num: number) => num.toString().padStart(2, "0");

  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Get today's date as ISO string (YYYY-MM-DD format)
 */
export function getTodayISO(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

/**
 * Get system info related to time/locale
 */
export function getTimeSystemInfo() {
  return {
    timezone:
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "Unknown",
    language: typeof navigator !== "undefined" ? navigator.language : "Unknown",
  };
}

/**
 * Generate calendar days for current month
 */
export function getCurrentMonthDays(): number[] {
  const now = new Date();
  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}

/**
 * Get calendar month/year display string
 */
export function getCurrentMonthYear(locale?: string): string {
  return new Date().toLocaleDateString(locale || "en-US", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Common date transformations for storage
 */
export function transformDatesForStorage(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;
  if (obj instanceof Date) return obj.toISOString();
  if (Array.isArray(obj)) return obj.map(transformDatesForStorage);
  if (typeof obj === "object") {
    const transformed: Record<string, unknown> = {};
    Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
      transformed[key] = transformDatesForStorage(value);
    });
    return transformed;
  }
  return obj;
}

/**
 * Common date transformations from storage
 */
export function transformDatesFromStorage(obj: unknown): unknown {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string" && isDateString(obj)) return new Date(obj);
  if (Array.isArray(obj)) return obj.map(transformDatesFromStorage);
  if (typeof obj === "object") {
    const transformed: Record<string, unknown> = {};
    Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
      // Common date field names
      if (
        [
          "date",
          "createdAt",
          "updatedAt",
          "dueDate",
          "completedAt",
          "startTime",
          "endTime",
          "timestamp",
          "deadline",
          "time",
          "startDate",
          "endDate",
        ].includes(key) &&
        typeof value === "string"
      ) {
        transformed[key] = new Date(value);
      } else {
        transformed[key] = transformDatesFromStorage(value);
      }
    });
    return transformed;
  }
  return obj;
}

/**
 * Check if string looks like a date
 */
function isDateString(str: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str) && !isNaN(Date.parse(str))
  );
}
