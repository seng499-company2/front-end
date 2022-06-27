import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import axios from "axios";

import { useRouter } from "next/router";

export interface User {
    id: string;
    role: string;
}

export interface AuthContextType {
    user: User;
    isError: boolean;
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
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isError) setIsError(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    // TODO
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
                if (response.status === 200) {
                    setUser(response.data);
                    setIsLoading(false);
                    router.push("/");
                } else {
                    setIsLoading(false);
                    setIsError(true);
                }
            } catch (error) {
                setIsLoading(false);
                setIsError(true);
            }
        },
        [router]
    );

    const logout = useCallback(async () => {
        // logout user with api call
        let result;
        try {
            result = await axios.post("/api/logout");
        } catch (error) {
            setIsError(true);
        }
        if (result.status === 200) {
            setUser(undefined);
            router.push("/login");
        } else {
            setIsError(true);
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
            isError,
            login,
            logout,
        }),
        [user?.id, user?.role, isLoading, isError, login, logout]
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
