import useAxios, { Options } from "axios-hooks";

import { API_HOST } from "@lib/constants";

const useGetQuery = (route: string, opts?: Options) => {
    const prefix = API_HOST; //testing endpoint, move to env

    const [{ data, loading: isLoading, error: isError }, execute] = useAxios(
        prefix + route,
        {
            ...opts,
        }
    );

    // render data
    return { data, isLoading, isError, execute };
};

export default useGetQuery;
