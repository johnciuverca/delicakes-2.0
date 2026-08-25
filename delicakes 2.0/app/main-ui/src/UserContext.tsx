import { useState, type ReactNode } from "react"
import { UserContext, type User } from "./user-context";

export function UserProvider({ children}: { children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value ={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    )
}