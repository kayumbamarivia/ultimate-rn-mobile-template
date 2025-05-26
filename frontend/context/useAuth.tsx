/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from "expo-router";
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useToast } from "react-native-toast-notifications";
import axios from "../api/api";
import { User } from "../types/index";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    loggingIn: boolean;
    register: (name: string, email: string, password: string) => Promise<void>;
    registering: boolean;
    logout: () => Promise<void>;
    loggingOut: boolean;
    initialLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const toast = useToast();
    const [loggingIn, setLoggingIn] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const pathname = usePathname();

    useEffect(() => {
        if (user) {
            setInitialLoading(false);
            return;
        }
        const fetchUser = async () => {
            try {
                const { data } = await axios.get("/users/me");
                setUser(data.user);
            } catch (error: any) {
                setUser(null);
                // Optionally log the error for debugging
                if (typeof error === "object" && error !== null && "response" in error) {
                    // handle specific error cases if needed
                }
                if (!['/', '/Login', '/Register'].includes(pathname)) {
                    router.push("/Login");
                }
            } finally {
                setInitialLoading(false);
            }
        };
        fetchUser();
    }
        , [pathname, user]);

    const login = async (email: string, password: string) => {
        setLoggingIn(true);
        try {
            const { data } = await axios.post("/users/login", {
                email,
                password,
            });
            setUser(data.user);
            AsyncStorage.setItem("token", data.token);
            toast.show("Logged in successfully", {
                type: "success",
            });
            router.push("/(tabs)/Home");
        } catch (error: any) {
            console.log(error);
            if (
                error &&
                typeof error === "object" &&
                "response" in error &&
                error.response &&
                typeof error.response === "object" &&
                "status" in error.response
            ) {
                if (error.response.status === 400) {
                    toast.show("Invalid email or password", {
                        type: "danger",
                    });
                } else {
                    toast.show(
                        error.response.data?.message ?? "An error occurred",
                        {
                            type: "danger",
                        }
                    );
                }
            } else {
                toast.show("An error occurred", {
                    type: "danger",
                });
            }
        } finally {
            setLoggingIn(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setRegistering(true);
        try {
            await axios.post("/users/register", {
                name,
                email,
                password,
            });
            toast.show("Registered successfully", {
                type: "success",
            });
            router.push("/Login");
        } catch (error: any) {
            console.log(error)
            toast.show(error?.response?.data?.message ?? "An error occurred", {
                type: "error",
            });
        } finally {
            setRegistering(false);
        }
    };


    const logout = async () => {
        setLoggingOut(true);
        try {
            setUser(null);
            AsyncStorage.removeItem("token");
            toast.show("Logged out successfully", {
                type: "success",
            });
            router.push("/Login");
        } catch (error) {
            console.error("Logout error:", error);
            toast.show("An error occurred", {
                type: "error",
            });
        } finally {
            setLoggingOut(false);
        }
    };

    const contextValue = useMemo(() => ({
        user,
        login,
        loggingIn,
        register,
        registering,
        logout,
        loggingOut,
        initialLoading
    }), [user, loggingIn, registering, loggingOut, initialLoading]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );

}

export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

