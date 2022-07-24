import { ScheduledCourse, ScheduledCourseEvent } from "src/types/calendar";
import { formatSectionNum } from "./format";

export type Schedule = {
    fall: ScheduledCourse[] | ScheduledCourseEvent[];
    spring: ScheduledCourse[] | ScheduledCourseEvent[];
    summer: ScheduledCourse[] | ScheduledCourseEvent[];
};

export const DAY_ENUM = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
};

const semesters = ["fall", "spring", "summer"];

export const convertScheduleData = (data: {
    [semester: string]: any[];
}): Schedule => {
    const generatedSchedule = { fall: [], spring: [], summer: [] };

    if (!data) {
        return generatedSchedule;
    }

    for (const [semester, scheduleArray] of Object.entries(data)) {
        if (!scheduleArray || scheduleArray?.length === 0) {
            generatedSchedule[semester] = [];
        } else {
            generatedSchedule[semester] = scheduleArray.flatMap((course) =>
                convertBackendDataToOurData(course)
            );
        }
    }
    return generatedSchedule;
};

// convert backend data to our data format per course
export const convertBackendDataToOurData = (backendData) => {
    const { course, sections } = backendData;
    const { code, title } = course;

    const ourData = sections.map((section, idx) => {
        const {
            capacity,
            professor: { name },
            timeSlots,
        } = section;

        const time = timeSlots.reduce((acc, timeSlot) => {
            const { dayOfWeek, timeRange } = timeSlot;
            const [startTime, endTime] = timeRange;
            const timeString = `${startTime} - ${endTime}`;

            const timeArray = acc[timeString] || [];
            timeArray.push(DAY_ENUM[dayOfWeek]);
            acc[timeString] = timeArray;

            return acc;
        }, {});

        return {
            course: { code, title },
            section: formatSectionNum(idx + 1),
            professor: name,
            time,
            capacity,
        };
    });

    return ourData;
};

// TODO fix this output
export const convertToEvents = (
    data: ScheduledCourse[],
    semester: string,
    firstDate: Date
): Schedule => {
    const events = { fall: [], spring: [], summer: [] };

    if (!data) {
        return events;
    }

    for (const sem of semesters) {
        for (const course of data[sem]) {
            for (const sectionIdx in course.sections) {
                const section = course.sections[sectionIdx];
                for (const { dayOfWeek, timeRange } of section.timeSlots) {
                    // schedule for each day in current week
                    for (let i = 1; i < 6; i++) {
                        if (DAY_ENUM[dayOfWeek] === i) {
                            const startTime = new Date(firstDate);
                            startTime.setDate(firstDate.getDate() + i);
                            startTime.setHours(
                                parseInt(timeRange[0].split(":")[0], 10),
                                parseInt(timeRange[0].split(":")[1], 10)
                            );
                            const endTime = new Date(startTime);
                            endTime.setHours(
                                parseInt(timeRange[1].split(":")[0], 10),
                                parseInt(timeRange[1].split(":")[1], 10)
                            );
                            const event = {
                                start: startTime,
                                end: endTime,
                                course: {
                                    ...course,
                                    section: formatSectionNum(+sectionIdx + 1),
                                },
                                id: `${course.course.code}-${sectionIdx}-${section.professor.id}-${i}-${semester}`,
                            };
                            events[sem].push(event);
                        }
                    }
                }
            }
        }
    }

    return events;
};
