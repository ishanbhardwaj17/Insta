import { createContext, useState } from "react";
import { authApi } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (username, password) => {
        setLoading(true);

        try {
            const response = await authApi.login(username, password);
            setUser(response.user);
            setError(null);

        } catch (error) {
            console.error("Login error:", error);
            setError(error);
        }
        setLoading(false);
    }
    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const response = await authApi.register(username, email, password);
            setUser(response.user);
            setError(null);
        } catch (error) {
            console.error("Registration error:", error);
            setError(error);
        }
        setLoading(false);
    }

    const handleLogout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, error, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}
