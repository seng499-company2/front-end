import {
    Difficulty,
    Willingness,
} from "../components/Preferences/CoursePreferencesTable";

const getCourses = () => {
    return ["CSC 225", "CSC 226", "ECE 260", "ECE 310", "SENG 265", "SENG 310"];
};

const coursePreferencesInit = getCourses().reduce((obj, course) => {
    obj[course] = {
        willingness: Willingness.notQualified,
        difficulty: Difficulty.notQualified,
    };
    return obj;
}, {});

const defaultInitialValues = {
    nonTeachingSemester: "fall",
    numCoursesPerSem: {
        fall: 0,
        spring: 0,
        summer: 0,
    },
    sabbatical: {
        value: false,
        duration: "HALF",
        fromMonth: "1",
    },
    teachingDaysPerWeek: {
        fall: 0,
        spring: 0,
        summer: 0,
    },
    preferredDays: [],
    preferredTime: {
        fall: [],
        summer: [],
        spring: [],
    },
    coursePreferences: coursePreferencesInit,
};

function generateCoursePreferencesFromCodesIfNeeded(
    coursePreferences = {},
    courseCodes = []
) {
    // if coursePreferences is empty, generate it from courseCodes
    // default values are set to notQualified
    // i.e. { CSC 225: { difficulty: Difficulty["notQualified"], willingness: Willingness["notQualified"] } }
    // if coursePreferences is not empty for a course, it is not modified
    if (Object.keys(coursePreferences).length === 0) {
        return courseCodes.reduce((obj, course) => {
            obj[course] = {
                difficulty: Difficulty.notQualified,
                willingness: Willingness.notQualified,
            };
            return obj;
        }, {});
    }

    // check for courses that are not in coursePreferences
    // if they are not in coursePreferences, set them to default values
    const courseCodesInPreferences = Object.keys(coursePreferences);
    const courseCodesNotInPreferences = courseCodes.filter(
        (course) => !courseCodesInPreferences.includes(course)
    );

    const coursePreferencesWithDefaultValues =
        courseCodesNotInPreferences.reduce((obj, course) => {
            obj[course] = {
                difficulty: Difficulty.notQualified,
                willingness: Willingness.notQualified,
            };
            return obj;
        }, {});

    return { ...coursePreferences, ...coursePreferencesWithDefaultValues };
}

// fills times with term keys if they are not present
function initTermsObjectIfNeeded(times, initVal) {
    const keys = ["fall", "spring", "summer"];
    const timesWithKeys = keys.reduce((obj, key) => {
        if (!(key in times)) {
            obj[key] = initVal;
        }
        return obj;
    }, {});
    return { ...times, ...timesWithKeys };
}

export function convertFromBackendFormat(input) {
    const data = input || defaultInitialValues;
    if (!input) {
        return data;
    }

    const {
        course_codes,
        resource: {
            taking_sabbatical,
            sabbatical_length,
            sabbatical_start_month,
            preferred_times,
            courses_preferences,
            preferred_non_teaching_semester,
            preferred_courses_per_semester,
            preferred_number_teaching_days,
            preferred_course_day_spreads,
        },
    } = data;

    const frontendData = {
        sabbatical: {
            value: taking_sabbatical,
            duration: sabbatical_length,
            fromMonth: sabbatical_start_month,
        },
        preferredTime: initTermsObjectIfNeeded(preferred_times ?? {}, []),
        coursePreferences: generateCoursePreferencesFromCodesIfNeeded(
            courses_preferences,
            course_codes
        ),
        nonTeachingSemester: preferred_non_teaching_semester || "fall",
        numCoursesPerSem: initTermsObjectIfNeeded(
            preferred_courses_per_semester ?? {},
            0
        ),
        teachingDaysPerWeek: initTermsObjectIfNeeded(
            preferred_number_teaching_days ?? {},
            0
        ),
        preferredDays: preferred_course_day_spreads,
    };
    return frontendData;
}

export function convertToBackendPreferencesFormat(data) {
    const backendData = {
        professor: data.professor,
        is_submitted: true,
        taking_sabbatical: data.sabbatical.value,
        sabbatical_length: data.sabbatical.duration,
        sabbatical_start_month: +data.sabbatical.fromMonth,
        preferred_times: data.preferredTime,
        courses_preferences: data.coursePreferences,
        preferred_non_teaching_semester: data.nonTeachingSemester,
        preferred_courses_per_semester: data.numCoursesPerSem,
        preferred_number_teaching_days: data.teachingDaysPerWeek,
        preferred_course_day_spreads: data.preferredDays,
    };
    return backendData;
}
