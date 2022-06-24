import useAxios from "axios-hooks";

const useGetQuery = (route: string) => {
    const prefix = "https://reqres.in/api"; //testing endpoint, move to env

    const [{ data, loading, error }, refetch] = useAxios(prefix + route);

    // render data
    return { data: data, isLoading: loading, isError: error, refetch };
};

export default useGetQuery;
