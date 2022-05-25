import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {

    const [saldo, setSaldo] = useState(0);
    const [monthSelect, setMonthSelect] = useState(null)

    return(
        <AppContext.Provider value={[saldo, setSaldo, monthSelect, setMonthSelect]}>
            {children}
        </AppContext.Provider>
    )
}