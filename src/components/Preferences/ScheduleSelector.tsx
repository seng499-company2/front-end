import React from "react";
import ScheduleSelector from "react-schedule-selector";

class Timetable extends React.Component {
    state = { schedule: [] };
    today = new Date();
    first = this.today.getDate() - this.today.getDay() + 1;

    handleChange = (newSchedule) => {
        this.setState({ schedule: newSchedule });
    };

    render() {
        return (
            <ScheduleSelector
                selection={this.state.schedule}
                numDays={5}
                minTime={8}
                maxTime={18}
                hourlyChunks={1}
                dateFormat={"dddd"}
                startDate={new Date(this.today.setDate(this.first))}
                onChange={this.handleChange}
            />
        );
    }
}

export default Timetable;
