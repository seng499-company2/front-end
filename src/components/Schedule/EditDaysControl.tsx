import { ButtonGroup, Button, useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";

const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
];

const EditDaysControl = ({ timeslots, isThick, disabled }) => {
    const daysData = useMemo(() => {
        let daysArr = [];
        timeslots.forEach((slot) => {
            if (!daysArr.includes(slot.dayOfWeek)) {
                daysArr.push(slot.dayOfWeek);
            }
        });
        return daysArr;
    }, [timeslots]);
    return (
        <ButtonGroup
            size={isThick ? "md" : "sm"}
            isAttached
            isDisabled={disabled}
        >
            {days.map((day) => (
                <Button
                    key={day}
                    variant="days"
                    isActive={daysData.includes(day)}
                    height={isThick && 30}
                >
                    {day.substring(0, 1)}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default EditDaysControl;
