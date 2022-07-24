import { CalendarRangeOptions, generateCalendarRange } from "@lib/calendar";
import { useWeekStart } from "./useWeekStart";

export const useCalendarRange = (
    inputNow?: Date,
    opts?: CalendarRangeOptions
) => {
    const { now } = useWeekStart();
    return generateCalendarRange(now, opts);
};
