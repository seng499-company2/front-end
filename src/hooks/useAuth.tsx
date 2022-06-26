import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import router from "next/router";
import { AxiosResponse } from "axios";

import * as userApi from "../lib/userApi";
import * as authApi from "../lib/authApi";

export interface User {
    id: string;
    role: string;
}

export interface AuthContextType {
    user: User;
    loading: boolean;
    error?: AxiosResponse<any>;
    login: (email: string, password: string) => void;
    signUp: (email: string, name: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<AxiosResponse<any> | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    useEffect(() => {
        if (error) setError(null);
    }, [error]);

    useEffect(() => {
        userApi
            .getCurrentUser()
            .then((newUser) => setUser(newUser))
            .catch((_error) => {})
            .finally(() => setLoadingInitial(false));
    }, []);

    function login(username: string, password: string) {
        setLoading(true);

        authApi
            .login({ username, password })
            .then((newUser) => {
                setUser(newUser);
                router.push("/");
            })
            .catch((newError) => setError(newError))
            .finally(() => setLoading(false));
    }

    function logout() {
        authApi.logout();
        setUser(undefined);
    }

    // Make the provider update only when it should
    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            error,
            login,
            logout,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={memoedValue as AuthContextType}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export default function useAuth(): AuthContextType {
    return useContext(AuthContext);
}
