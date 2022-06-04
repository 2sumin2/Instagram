import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Login/Signup";
import LogIn from "./components/Login/Login";
import User from "./components/User/User";

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/edit/user" element={<User />} />
                <Route path="/user" element={<User />} />
                <Route path="/home" element={<Home />} />
                <Route path="/account" element={<Signup />} />
                <Route path="/" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;