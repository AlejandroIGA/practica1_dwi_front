import { Routes, Route } from "react-router-dom";
import { ProgramaEducativo } from "../pages/ProgramaEducativo";
import  Division  from "../pages/Division";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProgramaEducativo />} />
            <Route path="/divisiones" element={<Division />} />
        </Routes>
    );
};

export default AppRoutes;
