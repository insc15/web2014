import Router from "next/router";
import { useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";

export function DefaultLayout({ children }) {
    return(
        <>
            <Header/>
            <div id="content" className="bg-gray-50 py-2">
                { children }
            </div>
            <Footer/>
        </>
    )
}

export function WhiteLayout({ children }) {
    return(
        <div id="content" className="bg-gray-50">
            { children }
        </div>
    )
}