import { useMemo } from "react";

export const useWeekStart = () => {
    const now = useMemo(() => {
        return new Date();
    }, []);

    const weekStart = useMemo(() => {
        return new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - now.getDay()
        );
    }, [now]);

    return { weekStart, now };
};
