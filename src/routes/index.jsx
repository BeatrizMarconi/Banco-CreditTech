import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Operations from "../pages/Operations";
import Profile from "../pages/Profile";

export default function RoutesPages(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                    <Route path="login" element={<Login/>}/>

                    <Route path="signUp" element={<SignUp/>}/>

                    <Route path="dashboard" element={<Dashboard/>}/>

                    <Route path="operations" element={<Operations/>}/>

                    <Route path="profile" element={<Profile/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}