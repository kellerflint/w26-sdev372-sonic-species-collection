import { useEffect, useState } from "react";
import { Link } from "react-router";
import Dropdown from "../components/Dropdown";
import Card from "../components/Card";
import CharacterStrip from "../components/CharacterStrip";
import styles from "./SpeciesPage.module.css";

const API_URL = "http://localhost:3001";

export default function SpeciesPage() {
    const [species, setSpecies] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [traits, setTraits] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/all`)
            .then((res) => res.json())
            .then((data) => setSpecies(data))
            .catch(() => setError("Unable to load species list."));
    }, []);

    useEffect(() => {
        if (!selectedId) return;
        fetch(`${API_URL}/api/species/${selectedId}/traits`)
            .then((res) => res.json())
            .then((data) => setTraits(data.traits ?? []))
            .catch(() => setError("Unable to load traits."));
    }, [selectedId]);

    const handleChange = (e) => {
        const id = e.target.value;
        setSelectedId(id);
        setTraits([]);
        setError("");
        const match = species.find((s) => String(s.id) === String(id));
        setSelectedName(match?.name ?? "");
    };

    return (
        <div className={styles.page}>
            <Link to="/" className={styles.back}>← Back</Link>

            <img
                src={`${import.meta.env.BASE_URL}images/Sonic.png`}
                alt="Sonic the Hedgehog"
                className={styles.sonicImg}
            />

            <h1 className={styles.heading}>Search by Species</h1>

            <Dropdown
                label="Species:"
                value={selectedId}
                onChange={handleChange}
                options={species}
                placeholder="choose one"
            />

            {selectedId && (
                <section className={styles.results}>
                    <h2 className={styles.resultsHeading}>{selectedName} Traits</h2>
                    {error ? (
                        <p className={styles.message}>{error}</p>
                    ) : traits.length === 0 ? (
                        <p className={styles.message}>No traits found.</p>
                    ) : (
                        <div className={styles.cardGrid}>
                            {traits.map((trait) => (
                                <Card key={trait.id} name={trait.name} />
                            ))}
                        </div>
                    )}
                </section>
            )}

            {!selectedId && (
                <p className={styles.message}>Select a species to see its traits.</p>
            )}
            <CharacterStrip />
        </div>
    );
}
