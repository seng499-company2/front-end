import { Box } from "@chakra-ui/react";

const TimeSLotWrapper = (props) => {
    console.log(props);
    // make horizontal line through box
    return <Box {...props}>{props.children}</Box>;
};

export default TimeSLotWrapper;
