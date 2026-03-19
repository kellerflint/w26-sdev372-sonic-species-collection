import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SpeciesPage from "./pages/SpeciesPage";
import TraitsPage from "./pages/TraitsPage";
import AddSpeciesPage from "./pages/AddSpeciesPage";
import AddTraitPage from "./pages/AddTraitPage";
import "./App.css";

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/species" element={<SpeciesPage />} />
                <Route path="/traits" element={<TraitsPage />} />
                <Route path="/species/add" element={<AddSpeciesPage />} />
                <Route path="/trait/add" element={<AddTraitPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
