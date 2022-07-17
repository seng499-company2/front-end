import {
    CalendarYearSchedule,
    EventSection,
    PEngRequiredList,
    ScheduleEvent,
    Semester,
    YearSchedule,
} from "src/types/calendar";
import { formatInitEventTimes, formatSectionNum } from "./format";

export const DAY_ENUM = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
};

const semesters: Semester[] = ["fall", "spring", "summer"];

export const convertScheduleData = (data: {
    [semester: string]: any[];
}): YearSchedule => {
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

export const convertRawToEvents = (
    data: YearSchedule,
    semester: string,
    firstDate: Date
): CalendarYearSchedule => {
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
                            const { startTime, endTime } = formatInitEventTimes(
                                firstDate,
                                i,
                                timeRange
                            );

                            const sections: EventSection[] =
                                course.sections.map((section, i) => ({
                                    ...section,
                                    id: +sectionIdx,
                                    display: formatSectionNum(+i + 1),
                                }));

                            const pengRequiredList: PEngRequiredList =
                                Object.entries(
                                    course.course.pengRequired
                                ).reduce(
                                    (prev, [s, v]) => (v ? [...prev, s] : prev),
                                    []
                                );

                            const event: ScheduleEvent = {
                                start: startTime,
                                end: endTime,
                                details: {
                                    course: {
                                        code: course.course.code,
                                        title: course.course.title,
                                        yearRequired:
                                            course.course.yearRequired,
                                        pengRequired: pengRequiredList,
                                    },
                                    sections,
                                    section: sections[sectionIdx],
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
