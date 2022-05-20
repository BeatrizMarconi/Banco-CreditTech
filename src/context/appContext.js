import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const [saldo, setSaldo] = useState(0);
    
    return(
        <AppContext.Provider value={[saldo, setSaldo]}>
            {children}
        </AppContext.Provider>
    )
}