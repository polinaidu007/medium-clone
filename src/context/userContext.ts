import { createContext } from "react";

interface IContextProps {
    user: any;
    setUser: any;
}

export const UserContext = createContext({} as any)