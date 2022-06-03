import Sidesheet from "../Layout/Sidesheet";
import SampleForm from "./SampleForm";

export const SampleSidesheet = (props) => {
    const { handleSubmit } = props;
    return (
        <Sidesheet size='xl' title="Sample Form" submitLabel="Submit Form" formId='sample-form' {...props}>
            <SampleForm handleSubmit={handleSubmit} />
        </Sidesheet>
    )
};

export default SampleSidesheet;
