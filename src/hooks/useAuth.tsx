import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import { getCurrentUser } from "../lib/user";
import { useRouter } from "next/router";

export interface User {
    id: string;
    role: string;
}

export interface AuthContextType {
    user: User;
    error?: AxiosResponse<any>;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<AxiosError<any> | null>();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    if (error) setError(null);

    // useEffect(() => {
    //     // get current user with api call
    //     const getUser = async () => {
    //         const user = await getCurrentUser();
    //         setUser(user);
    //     };

    //     getUser();
    // }, []);

    const login = useCallback(
        async (username: string, password: string) => {
            setIsLoading(true);
            try {
                const response = await axios.post(
                    "http://localhost:3000/api/login/",
                    {
                        username,
                        password,
                    }
                );
                setUser(response.data);
                setIsLoading(false);
                router.push("/");
            } catch (error) {
                setIsLoading(false);
                setError(error);
            }
        },
        [router]
    );

    const logout = useCallback(async () => {
        // logout user with api call
        const result = await axios.post("/api/logout");
        if (result.status === 200) {
            setUser(undefined);
            router.push("/login");
        } else {
            setError(result.data);
        }
    }, [router]);

    // Make the provider update only when it should
    const memoedValue = useMemo(
        () => ({
            user: {
                id: user?.id,
                role: user?.role,
            },
            isLoading,
            login,
            logout,
        }),
        [user?.id, user?.role, isLoading, login, logout]
    );

    return (
        <AuthContext.Provider value={memoedValue as AuthContextType}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth(): AuthContextType {
    return useContext(AuthContext);
}
