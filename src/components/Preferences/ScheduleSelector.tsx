import React from "react";
import ScheduleSelector from "react-schedule-selector";

type colorType = { color: string };
class Timetable extends React.Component<colorType> {
    state = { schedule: [] };
    today = new Date();
    first = this.today.getDate() - this.today.getDay() + 1;
    selectedColorDict = {
        Blue: "rgba(162, 198, 248, 1)",
        Orange: "rgba(255, 165, 0)",
        Pink: "rgba(255, 182, 193)",
    };
    unselectedColorDict = {
        Blue: "rgba(89, 154, 242, 1)",
        Orange: "rgba(255, 140, 0)",
        Pink: "rgba(255, 105, 180)",
    };

    handleChange = (newSchedule) => {
        console.log(newSchedule);
        this.setState({ schedule: newSchedule });
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
