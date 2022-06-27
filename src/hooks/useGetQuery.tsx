import useAxios from "axios-hooks";
import axios from "axios";

// request interceptor to add token to request headers
axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = {
                authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

const useGetQuery = (route: string) => {
    const prefix = "http://localhost:8000/api"; //testing endpoint, move to env

    const [{ data, loading: isLoading, error: isError }, refetch] = useAxios(
        prefix + route
    );

    // render data
    return { data, isLoading, isError, refetch };
};

export default useGetQuery;
