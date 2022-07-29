export interface PreferencesFormType {
    nonTeachingSemester: string;
    numCoursesPerSem: {
        fall: number;
        spring: number;
        summer: number;
    };
    sabbatical: {
        value: boolean;
        duration: string;
        fromMonth: string;
    };
    teachingDaysPerWeek: {
        fall: number;
        spring: number;
        summer: number;
    };
    preferredDays: any[];
    preferredTime: any;
    coursePreferences: any;
}
