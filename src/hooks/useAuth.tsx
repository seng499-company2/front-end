import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AxiosError, AxiosResponse } from "axios";

import { getCurrentUser } from "../lib/user";

export interface User {
    id: string;
    role: string;
}

export interface AuthContextType {
    user: User;
    error?: AxiosResponse<any>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    const [user, setUser] = useState<User>();
    const [error, setError] = useState<AxiosError<any> | null>();

    if (error) setError(null);

    useEffect(() => {
        // get current user with api call
        const getUser = async () => {
            const user = await getCurrentUser();
            setUser(user);
        };

        getUser();
    }, []);

    function logout() {
        // TODO remove token

        // remove user from state
        setUser(undefined);
    }

    // Make the provider update only when it should
    const memoedValue = useMemo(
        () => ({
            user: {
                id: user?.id,
                role: user?.role,
            },
            logout,
        }),
        [user?.id, user?.role]
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
