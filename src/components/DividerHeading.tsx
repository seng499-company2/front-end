import {
    Heading,
    Divider
} from "@chakra-ui/react";

const DividerHeading = (props) => {
    const { title, mt } = props;
    return (
        <>
            <Heading as='h3' size='md' mb={1} mt={mt}>{title}</Heading>
            <Divider mb={5} />
        </>
    );
};

export default DividerHeading;
