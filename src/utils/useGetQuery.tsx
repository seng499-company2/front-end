import useAxios, { Options } from "axios-hooks";

const backendUrl = "http://localhost:8000";
// uncomment when needed
// who needs env variables?
// const backendUrl = "http://ec2-52-55-238-236.compute-1.amazonaws.com:8000"

const useGetQuery = (route: string, opts?: Options) => {
    const [{ data, loading, error }, execute] = useAxios(backendUrl + route, {
        ...opts,
    });

    // render data
    return { data: data, isLoading: loading, isError: error, execute };
};

export default useGetQuery;
