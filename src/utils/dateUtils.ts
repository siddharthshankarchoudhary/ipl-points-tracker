/**
 * Utility functions for handling dates with proper timezone conversion to IST
 */

/**
 * Convert UTC time to IST by adding 5 hours 30 minutes
 * @param utcDate - Date object in UTC
 * @returns Date object adjusted to IST
 */
const convertUTCToIST = (utcDate: Date): Date => {
    // IST is UTC+5:30
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
    return istDate;
};

/**
 * Convert a date string to local timezone
 * Ensures UTC string is properly interpreted by appending 'Z' if missing
 * @param dateString - ISO date string from API (typically in UTC)
 * @returns Date object in IST timezone
 */
export const parseToLocalDate = (dateString: string | Date): Date => {
    if (dateString instanceof Date) {
        return dateString;
    }

    // If the string doesn't have a timezone indicator, assume it's UTC and append 'Z'
    let isoString = dateString as string;
    if (!isoString.includes('Z') && !isoString.includes('+') && !isoString.match(/-\d{2}:\d{2}$/)) {
        isoString = isoString + 'Z';
    }

    // Parse the UTC date
    const utcDate = new Date(isoString);

    // Convert to IST by adding 5:30 hours
    return convertUTCToIST(utcDate);
};

/**
 * Format a date to local date and time string (IST)
 * @param date - Date object or ISO string (UTC)
 * @returns Formatted string like "29/03/2026, 7:30 PM" (DD/MM/YYYY format in IST)
 */
export const formatLocalDateTime = (date: string | Date): string => {
    const istDate = parseToLocalDate(date);

    const day = String(istDate.getDate()).padStart(2, '0');
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const year = istDate.getFullYear();

    const hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    return `${day}/${month}/${year}, ${String(hours12).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
};

/**
 * Format a date to local date only (IST)
 * @param date - Date object or ISO string (UTC)
 * @returns Formatted string like "29/03/2026" (DD/MM/YYYY format in IST)
 */
export const formatLocalDate = (date: string | Date): string => {
    const istDate = parseToLocalDate(date);

    const day = String(istDate.getDate()).padStart(2, '0');
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const year = istDate.getFullYear();

    return `${day}/${month}/${year}`;
};

/**
 * Format a date to local time only (IST)
 * @param date - Date object or ISO string (UTC)
 * @returns Formatted string like "7:30:45 PM"
 */
export const formatLocalTime = (date: string | Date): string => {
    const istDate = parseToLocalDate(date);

    const hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');
    const seconds = String(istDate.getSeconds()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    return `${String(hours12).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
};

/**
 * Format a date to show date and time together (IST)
 * @param date - Date object or ISO string (UTC)
 * @returns Formatted string like "29/03/2026 7:30 PM" (DD/MM/YYYY format in IST)
 */
export const formatMatchDateTime = (date: string | Date): string => {
    const istDate = parseToLocalDate(date);

    const day = String(istDate.getDate()).padStart(2, '0');
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const year = istDate.getFullYear();

    const hours = istDate.getHours();
    const minutes = String(istDate.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    return `${day}/${month}/${year} ${String(hours12).padStart(2, '0')}:${minutes} ${ampm}`;
};

/**
 * Check if a date string is today
 * @param dateString - ISO date string or Date object
 * @returns true if the date is today
 */
export const isToday = (dateString: string | Date): boolean => {
    const date = parseToLocalDate(dateString);
    const today = new Date();

    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
};

/**
 * Check if a match is scheduled (not yet started)
 * @param matchDate - ISO date string or Date object
 * @param currentTime - Current time (defaults to now)
 * @returns true if match hasn't started yet
 */
export const isMatchScheduled = (
    matchDate: string | Date,
    currentTime?: Date
): boolean => {
    const date = parseToLocalDate(matchDate);
    const now = currentTime || new Date();
    return date > now;
};
