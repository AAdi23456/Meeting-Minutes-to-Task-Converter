import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

// Extend dayjs with plugins
dayjs.extend(relativeTime)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a due date string into a more readable format
 * @param dateStr The date string to format
 * @returns Formatted date string
 */
export function formatDueDate(dateStr: string): string {
  if (!dateStr || dateStr === 'Unspecified') {
    return 'Unspecified';
  }

  // Handle common natural language date references
  const lowerDateStr = dateStr.toLowerCase();
  
  if (lowerDateStr === 'today') {
    return 'Today';
  }
  
  if (lowerDateStr === 'tomorrow') {
    return 'Tomorrow';
  }
  
  if (lowerDateStr === 'tonight') {
    return 'Tonight';
  }
  
  // Try to parse as a date
  const parsedDate = dayjs(dateStr);
  
  if (parsedDate.isValid()) {
    const now = dayjs();
    const diffInDays = parsedDate.diff(now, 'day');
    
    // If it's within the next 7 days, show the relative time
    if (diffInDays >= 0 && diffInDays < 7) {
      return parsedDate.fromNow();
    }
    
    // Otherwise, show the formatted date
    return parsedDate.format('MMM D, YYYY');
  }
  
  // If we can't parse it, just return the original string
  return dateStr;
}
