import React from "react";
import { Link } from "react-router-dom";

export const PrivateNav = () => {
    return(
        <>
            <Link to="/dashboard">Home</Link>

            <Link to="/extract">Extrato</Link>

            <Link to="/operations">Transferência</Link>

        </>
    )
}