import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { RefetchOptions } from "axios-hooks";

import {
    RawSchedule,
    RawScheduledCourse,
    Section,
    Semester,
    RawTimeSlot,
} from "src/types/calendar";
import { useGetQuery } from "./useRequest";

interface RescheduleData {
    courseCode: string;
    courseSectionId: number;
    timeSlots: {
        oldTimeSlots: RawTimeSlot[];
        newTimeSlots: RawTimeSlot[];
    };
}

export interface ScheduleContextType {
    schedule: RawSchedule;
    lastGeneratedDate: Date;
    isLoading: boolean;
    error: AxiosError;
    generated: boolean;
    generateSchedule: (
        config?: AxiosRequestConfig<any>,
        options?: RefetchOptions
    ) => AxiosPromise<void>;
    setCompany: (company: string) => void;
    setUseMockData: (useMockData: boolean) => void;
    rescheduleSection: (
        rescheduleData: RescheduleData,
        semester: Semester
    ) => void;
    saveSchedule: () => void;
}

const ScheduleContext = createContext<ScheduleContextType>(
    {} as ScheduleContextType
);

/**
 * Provides schedule data and controls for fetching new data.
 * Provides functions for rescheduling events.
 * Stores the schedule in localstorage.
 * Loads the schedule from localstorage if it exists.
 */

export function ScheduleProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [schedule, setSchedule] = useState<RawSchedule>(null);
    const [lastGeneratedDate, setLastGeneratedDate] = useState<Date>(null);
    const [generated, setGenerated] = useState(false);

    const [company, setCompany] = useState("2");
    const [useMockData, setUseMockData] = useState(false);

    const {
        data,
        isLoading,
        isError: error,
        execute,
    } = useGetQuery(
        `/schedule/2022/FALL/${company}${
            useMockData ? "?use_mock_data=true" : ""
        }`,
        {
            manual: true,
            ssr: false,
        }
    );

    // load schedule from localstorage or use query data
    useEffect(() => {
        console.log("loading schedule");
        const localSchedule = localStorage.getItem("schedule");
        if (localSchedule) {
            console.log("loaded schedule from localstorage");
            try {
                const parsedSchedule = JSON.parse(localSchedule);
                console.log("parsed schedule", parsedSchedule);
                setLastGeneratedDate(parsedSchedule.date);
                setSchedule({
                    fall: parsedSchedule.fall,
                    spring: parsedSchedule.spring,
                    summer: parsedSchedule.summer,
                });
                setGenerated(true);
            } catch (e) {
                console.error(e);
                setSchedule(data);
            }
        } else {
            setSchedule(data);
        }
    }, [data]);

    // save schedule to localstorage
    const saveSchedule = () => {
        if (schedule) {
            console.log("saving schedule");
            const scheduleWithDate = {
                ...schedule,
                date: new Date(),
            };
            localStorage.setItem("schedule", JSON.stringify(scheduleWithDate));
        } else {
            console.log("no schedule to save");
        }
    };

    const generateSchedule = useCallback(
        (
            config?: AxiosRequestConfig<any>,
            options?: RefetchOptions
        ): AxiosPromise<void> => {
            localStorage.removeItem("schedule");
            setGenerated(true);
            return execute(config, options);
        },
        [execute]
    );

    // reschedule section
    const rescheduleSection = useCallback(
        /**
         *
         * @param courseCode the course code of the section to reschedule
         * @param courseSectionId the id of the section to reschedule (e.g. A01 -> 0)
         * @param timeSlots the old and new time slots to reschedule to
         * @param semester the semester of the section to reschedule
         */
        (rescheduleData: RescheduleData, semester: Semester) => {
            const { courseCode, courseSectionId, timeSlots } = rescheduleData;

            console.log("rescheduleSection");

            setSchedule((prevSchedule) => {
                const newSchedule = {
                    ...prevSchedule,
                    [semester]: prevSchedule[semester].map(
                        (scheduledCourse: RawScheduledCourse) => {
                            if (scheduledCourse.course.code === courseCode) {
                                console.log({ scheduledCourse });
                                // update start and end times

                                return {
                                    ...scheduledCourse,
                                    sections: scheduledCourse.sections.map(
                                        (section: Section, idx: number) => {
                                            if (idx === courseSectionId) {
                                                return {
                                                    ...section,
                                                    timeSlots:
                                                        timeSlots.newTimeSlots,
                                                };
                                            }
                                            return section;
                                        }
                                    ),
                                };
                            }
                            return scheduledCourse;
                        }
                    ),
                };
                return newSchedule;
            });
        },
        []
    );

    // edit course and/or section data
    const editCourse = useCallback((newCourseData, semester): void => {
        setSchedule((prevSchedule) => ({
            // const newSchedule = {
            ...prevSchedule,
            [semester]: prevSchedule[semester].map((course) => {
                if (course.course.code === newCourseData.code) {
                    return {
                        ...course,
                        course: {
                            ...course.course,
                            ...newCourseData,
                        },
                    };
                }
                return course;
            }),
        }));
    }, []);

    console.log("ScheduleProvider: render");

    return (
        <ScheduleContext.Provider
            value={{
                schedule,
                lastGeneratedDate,
                isLoading,
                error,
                generated,
                generateSchedule,
                setCompany,
                setUseMockData,
                rescheduleSection,
                saveSchedule,
            }}
        >
            {children}
        </ScheduleContext.Provider>
    );
}

export default function useSchedule(): ScheduleContextType {
    return useContext(ScheduleContext);
}
