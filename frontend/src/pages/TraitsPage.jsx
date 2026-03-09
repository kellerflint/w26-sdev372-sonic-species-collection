import { useEffect, useState } from "react";
import { Link } from "react-router";
import Dropdown from "../components/Dropdown";
import Card from "../components/Card";
import CharacterStrip from "../components/CharacterStrip";
import styles from "./TraitsPage.module.css";

const API_URL = "";

export default function TraitsPage() {
    const [traits, setTraits] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [species, setSpecies] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/traits`)
            .then((res) => res.json())
            .then((data) => setTraits(data))
            .catch(() => setError("Unable to load traits list."));
    }, []);

    useEffect(() => {
        if (!selectedId) return;
        fetch(`${API_URL}/api/traits/${selectedId}/species`)
            .then((res) => res.json())
            .then((data) => setSpecies(data.species ?? []))
            .catch(() => setError("Unable to load species."));
    }, [selectedId]);

    const handleChange = (e) => {
        const id = e.target.value;
        setSelectedId(id);
        setSpecies([]);
        setError("");
        const match = traits.find((t) => String(t.id) === String(id));
        setSelectedName(match?.name ?? "");
    };

    return (
        <div className={styles.page}>
            <Link to="/" className={styles.back}>← Back</Link>

            <img
                src={`${import.meta.env.BASE_URL}images/Sonic.webp`}
                alt="Sonic the Hedgehog"
                className={styles.sonicImg}
            />

            <h1 className={styles.heading}>Search by Trait</h1>

            <Dropdown
                label="Trait:"
                value={selectedId}
                onChange={handleChange}
                options={traits}
                placeholder="choose one"
            />

            {selectedId && (
                <section className={styles.results}>
                    <h2 className={styles.resultsHeading}>Species with: {selectedName}</h2>
                    {error ? (
                        <p className={styles.message}>{error}</p>
                    ) : species.length === 0 ? (
                        <p className={styles.message}>No species found.</p>
                    ) : (
                        <div className={styles.cardGrid}>
                            {species.map((s) => (
                                <Card key={s.id} name={s.name} />
                            ))}
                        </div>
                    )}
                </section>
            )}

            {!selectedId && (
                <p className={styles.message}>Select a trait to see which species have it.</p>
            )}
            <CharacterStrip />
        </div>
    );
}
