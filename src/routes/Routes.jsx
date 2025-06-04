import { Routes, Route } from "react-router-dom";
import { ProgramaEducativo } from "../pages/ProgramaEducativo";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProgramaEducativo />} />
        </Routes>
    );
};

export default AppRoutes;
