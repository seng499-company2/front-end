import { useEffect } from "react";

const AUTOSAVE_INTERVAL = 15000;

export const useAutoSave = (saveFunc, isDisabled = false) => {
    useEffect(() => {
        let timer;
        if (isDisabled) {
            timer ? clearTimeout(timer) : null;
            return () => clearTimeout(timer);
        }
        timer = setTimeout(() => {
            saveFunc();
        }, AUTOSAVE_INTERVAL);

        return () => clearTimeout(timer);
    }, [isDisabled, saveFunc]);

    return null;
};
