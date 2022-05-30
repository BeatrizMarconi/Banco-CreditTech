import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Operations from "../pages/Operations";
import Profile from "../pages/Profile";
import Extract from "../pages/Extract";
import { isLogged } from "../services/auth";

export default function RoutesPages(){

    //verifica se tem algo dentro de userIsLogged, se sim deixa acessar a rota se não retorna para home
    const Private = ({children}) => {
        const [userIsLogged] = isLogged();

        if (!userIsLogged) {
            return <Navigate to='/' />
        }

        return children;
    }

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="login" element={<Login/>}/>

                    <Route path="signUp" element={<SignUp/>}/>

                    <Route path="dashboard" element={<Private><Dashboard/></Private>}/>

                    <Route path="operations" element={<Private><Operations/></Private>}/>

                    <Route path="profile" element={<Private><Profile/></Private>}/>

                    <Route path="extract" element={<Private><Extract/></Private>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}