import React from "react";
import ScheduleSelector from "react-schedule-selector";

type PropsType = { color: string; semester: string };
class Timetable extends React.Component<PropsType> {
    state = { schedule: [], data: [], semester: this.props.semester };
    today = new Date();
    first = this.today.getDate() - this.today.getDay() + 1;
    unselectedColorDict = {
        Blue: "rgba(162, 198, 248, 1)",
        Orange: "rgba(255, 165, 0)",
        Pink: "rgba(255, 182, 193)",
    };
    selectedColorDict = {
        Blue: "rgba(89, 154, 242, 1)",
        Orange: "rgba(255, 140, 0)",
        Pink: "rgba(255, 105, 180)",
    };

    handleChange = (newSchedule) => {
        const arr = [];
        newSchedule.forEach((element) => {
            const time = {
                day: element.getDay(),
                time: element.getHours(),
            };
            arr.push(time);
        });
        this.setState({
            schedule: newSchedule,
            data: arr,
        });
    };

    render() {
        return (
            <ScheduleSelector
                selectedColor={this.selectedColorDict[this.props.color]}
                unselectedColor={this.unselectedColorDict[this.props.color]}
                selection={this.state.schedule}
                numDays={5}
                minTime={8}
                maxTime={20}
                hourlyChunks={1}
                dateFormat={"dddd"}
                startDate={new Date(this.today.setDate(this.first))}
                onChange={this.handleChange}
            />
        );
    }
}

export default Timetable;
