import useAxios from "axios-hooks";

import { API_URL } from "@lib/constants";

const usePostQuery = (route: string) => {
    const prefix = API_URL; //testing endpoint, move to env

    const [{ data, loading: isLoading, error: isError }, execute] = useAxios(
        {
            url: prefix + route,
            method: "POST",
        },
        { manual: true }
    );
    // render data
    return { data, isLoading, isError, execute };
};

export default usePostQuery;
