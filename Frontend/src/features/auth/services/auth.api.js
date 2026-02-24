import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

async function register(username, email, password) {
    try {
        const response = api.post("/register", {
            username,
            email,
            password
        })
        return (await response).data;

    } catch (error) {
        throw error
    }
}

async function login(username, password) {
    try {
        const response = api.post("/login", {
            username,
            password
        })
        return (await response).data;
    } catch (error) {
        throw error;
    }
}

async function getMe() {
    try {
        const response = api.get("/get-me");
        return (await response).data;
    } catch (error) {
        throw error;
    }
}

export const authApi = {
    register,
    login,
    getMe
}   