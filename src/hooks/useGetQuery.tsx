import useAxios, { Options } from "axios-hooks";

const useGetQuery = (route: string, opts?: Options) => {
    const prefix = "http://localhost:8000"; //testing endpoint, move to env

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
