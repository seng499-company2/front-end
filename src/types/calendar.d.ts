type Semester = "fall" | "spring" | "summer";

type PEngRequiredRaw = {
    [key in Semester]: boolean;
};

type PEngRequiredList = Semester[];

interface BaseCourse {
    title: string;
    code: string;
    yearRequired: number;
}

interface RawCourse extends BaseCourse {
    pengRequired: PEngRequiredRaw;
}

interface EventCourse extends BaseCourse {
    pengRequired: PEngRequiredList;
}

interface Professor {
    name: string;
    id: string;
}

interface TimeSlot {
    dayOfWeek: string;
    timeRange: string[];
}

interface Section {
    capacity: number;
    professor: Professor;
    timeSlots: TimeSlot[];
}

interface EventSection extends Section {
    id: number;
    display: string;
}

interface BaseScheduledCourse {
    section: Section;
    sections: Section[];
}

interface RawScheduledCourse extends BaseScheduledCourse {
    course: RawCourse;
}

interface EventScheduledCourse extends BaseScheduledCourse {
    section: EventSection;
    course: EventCourse;
}

type ScheduleEvent = {
    details: EventScheduledCourse;
    start: Date;
    end: Date;
    id: string;
};

type ScheduleCourseEventChange = {
    start: Date;
    end: Date;
    event: ScheduleEvent;
    resourceId: string | number;
};

type YearSchedule = {
    fall: RawScheduledCourse[];
    spring: RawScheduledCourse[];
    summer: RawScheduledCourse[];
};

type CalendarYearSchedule = {
    fall: ScheduleEvent[];
    spring: ScheduleEvent[];
    summer: ScheduleEvent[];
};

type ScheduleView = "calendar" | "table";

export {
    Semester,
    PEngRequiredRaw,
    PEngRequiredList,
    RawCourse,
    EventCourse,
    Professor,
    TimeSlot,
    Section,
    EventSection,
    EventScheduledCourse,
    RawScheduledCourse,
    ScheduleEvent,
    ScheduleCourseEventChange,
    YearSchedule,
    CalendarYearSchedule,
    ScheduleView,
};
