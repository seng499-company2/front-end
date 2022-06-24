import useAxios from "axios-hooks";

const usePostQuery = (route: string) => {
    const prefix = "https://reqres.in/api"; //testing endpoint, move to env

    const [{ data, loading, error }, execute] = useAxios(
        {
            url: prefix + route,
            method: "POST",
        },
        { manual: true }
    );
    // render data
    return { data: data, isLoading: loading, isError: error, execute };
};

export default usePostQuery;
