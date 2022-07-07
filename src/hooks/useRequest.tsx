import useAxios, { Options } from "axios-hooks";
import axios from "axios";

import { API_HOST } from "@lib/constants";
import { getToken } from "@lib/auth";

axios.interceptors.request.use(
    async (config) => {
        const token = getToken();

        if (token) {
            config.headers = {
                authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const useGetQuery = (route: string, opts?: Options) => {
    const prefix = API_HOST;

    const [{ data, loading: isLoading, error: isError }, execute] = useAxios(
        prefix + route,
        {
            ...opts,
        }
    );
    return { data, isLoading, isError, execute };
};

export const usePostQuery = (route: string) => {
    const prefix = API_HOST;

    const [{ data, loading: isLoading, error: isError }, execute] = useAxios(
        {
            url: prefix + route,
            method: "POST",
        },
        { manual: true }
    );
    return { data, isLoading, isError, execute };
};
