import { createContext, useState } from "react";

export const LogoutContext = createContext()

export const LogoutProvider = ({children}) =>{
    const [logoutBox, setLogoutBox] = useState(false)

    return (
        <LogoutContext.Provider value={{logoutBox, setLogoutBox}}>{children}</LogoutContext.Provider>
    )
}