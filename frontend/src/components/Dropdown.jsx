import { useEffect, useState } from "react";
import styles from "./Dropdown.module.css";

const API_URL = "http://localhost:3001";
const DEMO_IMAGE_URL = `${import.meta.env.BASE_URL}images/Demo_Image.jpg`;

export default function SpeciesDropdown() {
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
        if (!selectedId) {
            return;
        }

        fetch(`${API_URL}/api/species/${selectedId}/traits`)
            .then((res) => res.json())
            .then((data) => {
                setTraits(data.traits ?? []);
            })
            .catch(() => setError("Unable to load traits."));
    }, [selectedId]);

    const handleChange = (event) => {
        const id = event.target.value;
        setSelectedId(id);
        const match = species.find((specie) => String(specie.id) === String(id));
        setSelectedName(match?.name ?? "");
        setError("");
        if (!id) {
            setTraits([]);
        }
    };

    return (
        <div>
            <label id="searchLabel">Species:</label>
            <select value={selectedId} onChange={handleChange}>
                <option value=""> choose one </option>
                {species.map((specie) => (
                    <option key={specie.id} value={specie.id}>
                        {specie.name}
                    </option>
                ))}
            </select>

            <div className={styles.traitsSection}>
                <div className={styles.speciesBox}>
                    <h2 className={styles.speciesTitle}>
                        {selectedName || "Select a Species"}
                    </h2>
                    <h4 className={styles.sectionTitle}>Traits</h4>
                    <div className={styles.imageSlot}>
                        <img
                            src={DEMO_IMAGE_URL}
                            alt="Demo character"
                            className={styles.speciesImage}
                        />
                    </div>
                    {error ? (
                        <p className={styles.empty}>{error}</p>
                    ) : traits.length === 0 ? (
                        <p className={styles.empty}>
                            {selectedId
                                ? "No traits found."
                                : "Select a species to see traits."}
                        </p>
                    ) : (
                        <ul className={styles.traitsList}>
                            {traits.map((trait) => (
                                <li key={trait.id} className={styles.traitItem}>
                                    {trait.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
