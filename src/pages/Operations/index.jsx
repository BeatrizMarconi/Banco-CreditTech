import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { isLogged } from "../../services/auth";

export default function Operations() {

    const navigate = useNavigate();
    const [userIsLogged] = isLogged();

    useEffect(() => {
        if (userIsLogged === "") {
            navigate(`/login`);
        }
    },);
    return (
        <>
            <Header/>
            <h1>OPERAÇÃO</h1>
        </>
    )
}