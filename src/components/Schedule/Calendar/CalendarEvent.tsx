import { Box, Text } from "@chakra-ui/react";
import { Event } from "react-big-calendar";

// TODO extract types out of this file
type PEngRequired = { [key: "fall" | "spring" | "summer"]: boolean };

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

export interface ScheduledCourse {
    course: Course;
    sections: Section[];
}

export type ScheduledCourseEvent = {
    id: string;
} & Event &
    ScheduledCourse;

interface CalendarEventProps {
    event: ScheduledCourseEvent;
    title?: string;
}

/* before converting to event times
{
{
    "course": {
        "code": "CSC111",
        "title": "Fundamentals of Programming with Engineering Applications",
        "pengRequired": {
            "fall": true,
            "spring": true,
            "summer": false
        },
        "yearRequired": 1
    },
    "sections": [
        {
            "professor": {
                "id": "32",
                "name": "Kui Wu"
            },
            "capacity": 249,
            "timeSlots": [
                {
                    "dayOfWeek": "TUESDAY",
                    "timeRange": [
                        "08:30",
                        "09:20"
                    ]
                },
                {
                    "dayOfWeek": "WEDNESDAY",
                    "timeRange": [
                        "08:30",
                        "09:20"
                    ]
                },
                {
                    "dayOfWeek": "FRIDAY",
                    "timeRange": [
                        "08:30",
                        "09:20"
                    ]
                }
            ]
        },
        {
            "professor": {
                "id": "32",
                "name": "Kui Wu"
            },
            "capacity": 83,
            "timeSlots": [
                {
                    "dayOfWeek": "TUESDAY",
                    "timeRange": [
                        "08:30",
                        "09:20"
                    ]
                },
                {
                    "dayOfWeek": "WEDNESDAY",
                    "timeRange": [
                        "08:30",
                        "09:20"
                    ]
                },
                {
                    "dayOfWeek": "FRIDAY",
                    "timeRange": [
                        "08:30",
                        "09:20"
                    ]
                }
            ]
        }
    ]
}
*/

/* after converting to event
[
    {
        "event": {
            "start": "2022-07-12T08:30:00.000Z",
            "end": "2022-07-12T09:20:00.000Z",
            "course": {
                "code": "CSC111",
                "title": "Fundamentals of Programming with Engineering Applications"
            },
            "section": "A02",
            "professor": "Kui Wu",
            "capacity": 249,
            "id": "CSC225-A02-2"
        },
        "title": null
    },
    {
        "event": {
            "start": "2022-07-13T08:30:00.000Z",
            "end": "2022-07-13T09:20:00.000Z",
            "course": {
                "code": "CSC111",
                "title": "Fundamentals of Programming with Engineering Applications"
            },
            "section": "A02",
            "professor": "Kui Wu",
            "capacity": 249,
            "id": "CSC225-A02-3"
        },
        "title": null
    },
    {
        "event": {
            "start": "2022-07-15T08:30:00.000Z",
            "end": "2022-07-15T09:20:00.000Z",
            "course": {
                "code": "CSC111",
                "title": "Fundamentals of Programming with Engineering Applications"
            },
            "section": "A02",
            "professor": "Kui Wu",
            "capacity": 249,
            "id": "CSC225-A02-5"
        },
        "title": null
    },
]
*/

// unnecessary?
const DateSemester = (date: Date) => {
    const month = date.getMonth();
    if (month >= 8) {
        return `summer`;
    } else if (month >= 5) {
        return `spring`;
    }
    return `fall`;
};

const WeeksInSemester = (semester: string) => {
    if (semester === `summer`) {
        return 12;
    } else if (semester === `spring`) {
        return 12;
    }
    return 12;
};

// TODO fix this output
const convertToEvents = (
    data: ScheduledCourse,
    semester: string,
    firstDate: Date
) => {
    const events = [];
    for (const section of data.sections) {
        for (const timeSlot of section.timeSlots) {
            // now schedule the event each week in semester
            const numWeeks = WeeksInSemester(semester);
            for (let i = 0; i < numWeeks; i++) {
                const startDate = new Date(
                    firstDate.getFullYear(),
                    firstDate.getMonth(),
                    firstDate.getDate() + i * 7
                );
                const endDate = new Date(
                    firstDate.getFullYear(),
                    firstDate.getMonth(),
                    firstDate.getDate() + i * 7 + 1
                );
                const event = {
                    start: startDate,
                    end: endDate,
                    course: data.course,
                    sections: [section],
                    id: `${data.course.code}-${section.professor.id}-${i}`,
                };
                events.push(event);
            }
        }
    }
    return events;
};

// body of the event
const CalendarEvent: React.FC<any> = (props) => {
    return (
        <Box>
            <Text>{props.event.course.code}</Text>
        </Box>
    );
};

export default CalendarEvent;
