import { DayOfWeek } from "src/types/calendar";

export const USER_TOKEN = "user-token";
export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const API_URL = `${API_HOST}/api`;

export const DAYS_OF_WEEK: DayOfWeek[] = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
];

export const COURSE_SECTION_KEYS = [
    "fall_sections",
    "spring_sections",
    "summer_sections",
];
