type Semester = "fall" | "spring" | "summer";

type PEngRequiredRaw = {
    [key in Semester]: boolean;
};

type PEngRequiredList = Semester[];

type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
type TableTimeSlots = { [time: string]: number[] };

interface BaseCourse {
    title: string;
    code: string;
    yearRequired: number;
    maxCapacity: number;
}

interface RawCourse extends BaseCourse {
    pengRequired: PEngRequiredRaw;
    fall_sections: Section[];
    spring_sections: Section[];
    summer_sections: Section[];
}

interface EventCourse extends BaseCourse {
    pengRequired: PEngRequiredList;
}

interface Professor {
    name: string;
    id: string;
}

interface RawTimeSlot {
    dayOfWeek: DayOfWeek;
    timeRange: string[];
}

interface Section {
    capacity: number;
    professor: Professor;
    timeSlots: RawTimeSlot[];
    maxCapacity: number;
}

interface EventSection extends Section {
    id: number;
    display: string;
}

interface BaseScheduledCourse {
    sections: Section[];
}

interface RawScheduledCourse extends BaseScheduledCourse {
    course: RawCourse;
}

interface TableScheduledCourse {
    capacity: number;
    maxCapacity: number;
    course: BaseCourse;
    professor: string;
    section: string;
    time: TableTimeSlots;
    sections: Sections[];
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

type RawSchedule = {
    fall: RawScheduledCourse[];
    spring: RawScheduledCourse[];
    summer: RawScheduledCourse[];
};

type TableSchedule = {
    fall: TableScheduledCourse[];
    spring: TableScheduledCourse[];
    summer: TableScheduledCourse[];
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
    DayOfWeek,
    RawCourse,
    EventCourse,
    Professor,
    RawTimeSlot,
    Section,
    EventSection,
    EventScheduledCourse,
    RawScheduledCourse,
    TableScheduledCourse,
    ScheduleEvent,
    ScheduleCourseEventChange,
    RawSchedule,
    TableSchedule,
    CalendarYearSchedule,
    ScheduleView,
};
