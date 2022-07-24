// TODO extract types out of this file
type PEngRequired = {
    [key in "fall" | "spring" | "summer"]: boolean;
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
    capacity: number;
    professor: Professor;
    timeSlots: TimeSlot[];
}

interface ScheduledCourse {
    course: Course;
    section: string;
    sections: Section[];
}

type ScheduledCourseEvent = {
    course: ScheduledCourse;
    start: Date;
    end: Date;
    id: string;
} & Event;

export {
    PEngRequired,
    Course,
    Professor,
    TimeSlot,
    Section,
    ScheduledCourse,
    ScheduledCourseEvent,
};
