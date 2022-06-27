import useAxios from "axios-hooks";

const useGetQuery = (route: string) => {
    const prefix = "http://localhost:8000/api"; //testing endpoint, move to env

    const [{ data, loading: isLoading, error: isError }, refetch] = useAxios(
        prefix + route
    );

    // render data
    return { data, isLoading, isError, refetch };
};

export default useGetQuery;
