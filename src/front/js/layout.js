import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Voluntario } from "./pages/voluntario";
import { Single } from "./pages/single";
import { AddForm } from "./pages/addVoluntario";
import { EditForm } from "./pages/editForm";
import { VoluntarioLogin } from "./pages/voluntarioLogin";
import { VoluntarioSignup } from "./pages/voluntarioSignup";
import { DashboardVoluntario } from "./pages/dashboardVoluntario";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Voluntario />} path="/voluntario" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route path="/editForm/:theid" element={<EditForm />} />
                        <Route path="/addVoluntario" element={<AddForm />} />
                        <Route path="/voluntarioLogin" element={<VoluntarioLogin />} />
                        <Route path="/voluntarioSignup" element={<VoluntarioSignup />} />
                        <Route path="/dashboardVoluntario" element={<DashboardVoluntario />} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
