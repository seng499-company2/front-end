const dayArr = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];

export const convertScheduleData = (data: { [semester: string]: any[] }) => {
    const generatedSchedule = {};
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
            timeArray.push(dayArr.indexOf(dayOfWeek) + 1);
            acc[timeString] = timeArray;

            return acc;
        }, {});

        // convert section idx to A01, A02, A03, ..., A20, ...
        const sectionIdx = idx + 1;
        const sectionId = `A${sectionIdx < 10 ? `0${sectionIdx}` : sectionIdx}`;

        return {
            course: { code, title },
            section: sectionId,
            professor: name,
            time,
            capacity,
        };
    });

    return ourData;
};
