import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./routes/Login";

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;