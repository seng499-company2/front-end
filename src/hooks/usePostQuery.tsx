import useAxios from "axios-hooks";

const usePostQuery = (route: string) => {
    const prefix = "http://localhost:8000/api"; //testing endpoint, move to env

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
