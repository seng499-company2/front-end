import useSWR from "swr";

const useGetQuery = (route: string) => {
    const prefix = "https://reqres.in/api"; //testing endpoint, move to env

    const fetcher = (key) =>
        fetch(prefix + key, {
            headers: {
                Authorization: `Bearer test`,
                "Content-Type": "application/json",
            },
        }).then((r) => r.json());

    const { data, error } = useSWR(route, fetcher, {
        revalidateOnFocus: false,
    });

    // render data
    return { data: data, isLoading: !error && !data, isError: error };
};

export default useGetQuery;
