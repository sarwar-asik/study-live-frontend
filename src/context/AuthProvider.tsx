/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserInfo } from "@/helper/authHelper";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null)


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<any>(getUserInfo() ?? null)

    const [loading, setLoading] = useState(false)

    // const [refresh, setRefreshUser] = useState(false)
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const userData = await getUserInfo();
                
                if (userData?.email) {
                    setUser(userData);
                    localStorage.setItem('userId', userData?.id);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    

    const refreshUser = async () => {
        setLoading(true);
        try {
            const userData = await getUserInfo();
            if (userData) {
                setUser(userData);
            }
        } catch (error) {
            console.error('Error refreshing user data:', error);
        } finally {
            setLoading(false);
        }
    };
    // console.log(user)
    return (
        <AuthContext.Provider value={{ user, refreshUser, loading }}>{children}</AuthContext.Provider>
    )
}

export default AuthContext

