import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import SpeciesPage from "./pages/SpeciesPage";
import TraitsPage from "./pages/TraitsPage";
import "./App.css";

function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/species" element={<SpeciesPage />} />
                <Route path="/traits" element={<TraitsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
