import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LogIn from "./components/Login";
import User from "./components/User";

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/user" element={<User />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;