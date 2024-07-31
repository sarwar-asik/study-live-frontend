/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserInfo } from "@/helper/authHelper";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null)


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<any>(null)

    const [refresh, setRefreshUser] = useState(false)

    const refreshUser = () => {
        setRefreshUser(prev => !prev)
    }
    useEffect(() => {
        const userData = getUserInfo()
        setUser(userData)
        refreshUser()
    }, [refresh])

    return (
        <AuthContext.Provider value={{ user, refreshUser }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext

