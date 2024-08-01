/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserInfo } from "@/helper/authHelper";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null)


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<any>(getUserInfo() ?? null)

    const [loading, setLoading] = useState(false)

    // const [refresh, setRefreshUser] = useState(false)

    useEffect(() => {
        setLoading(true)
        const userData = getUserInfo();
        console.log(userData)
        if (userData?.email) {
            setUser(userData);
            setLoading(false)
        }
    }, []);

    const refreshUser = () => {
        setLoading(true)
        const userData = getUserInfo();

        if (userData) {

            setUser(userData);
            setLoading(false)
        }
        setLoading(false)
    };

    console.log(user)
    return (
        <AuthContext.Provider value={{ user, refreshUser, loading }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext

