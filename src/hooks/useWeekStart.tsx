import { useMemo } from "react";

export const useWeekStart = (input?: Date) => {
    const now = useMemo(() => {
        return input ?? new Date();
    }, [input]);

    const weekStart = useMemo(() => {
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - now.getDay()
        );
    }, [now]);

    return { weekStart, now };
};
