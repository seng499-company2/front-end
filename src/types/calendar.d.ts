type Semester = "fall" | "spring" | "summer";

type PEngRequired = {
    [key in Semester]: boolean;
};

interface Course {
    title: string;
    code: string;
    yearRequired: number;
    pengRequired: PEngRequired;
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
    id?: number;
    display?: string;
    capacity: number;
    professor: Professor;
    timeSlots: TimeSlot[];
}

interface ScheduledCourse {
    course: Course;
    section: Section;
    sections: Section[];
}

type ScheduledCourseEvent = {
    course: ScheduledCourse;
    start: Date;
    end: Date;
    id: string;
} & Event;

type ScheduleCourseEventChange = {
    start: Date;
    end: Date;
    event: ScheduledCourseEvent;
    resourceId: string | number;
};

type Schedule = {
    fall: ScheduledCourseEvent[];
    spring: ScheduledCourseEvent[];
    summer: ScheduledCourseEvent[];
};

export {
    Semester,
    PEngRequired,
    Course,
    Professor,
    TimeSlot,
    Section,
    ScheduledCourse,
    ScheduledCourseEvent,
    ScheduleCourseEventChange,
    Schedule,
};
