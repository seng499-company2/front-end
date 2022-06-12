import {
    Heading,
    Divider
} from "@chakra-ui/react";

const DividerHeading = (props) => {
    const { title } = props;
    return (
        <>
            <Heading as='h3' size='md' mb={1}>{title}</Heading>
            <Divider mb={5} />
        </>
    );
};

export default DividerHeading;
