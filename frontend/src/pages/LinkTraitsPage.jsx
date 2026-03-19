import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./LinkTraitsPage.module.css";

const API_URL = "";

export default function LinkTraitsPage() {
    const [species, setSpecies] = useState([]);
    const [traits, setTraits] = useState([]);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState("");
    const [selectedTraitId, setSelectedTraitId] = useState("");
    const [linkedTraits, setLinkedTraits] = useState([]);
    const [status, setStatus] = useState(null); // "success" | "error" | null
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/all`)
            .then((res) => res.json())
            .then((data) => setSpecies(data))
            .catch(() => setMessage("Unable to load species."));

        fetch(`${API_URL}/api/traits`)
            .then((res) => res.json())
            .then((data) => setTraits(data))
            .catch(() => setMessage("Unable to load traits."));
    }, []);

    useEffect(() => {
        if (!selectedSpeciesId) return;
        setLinkedTraits([]);
        setSelectedTraitId("");
        setStatus(null);
        fetch(`${API_URL}/api/species/${selectedSpeciesId}/traits`)
            .then((res) => res.json())
            .then((data) => setLinkedTraits(data.traits ?? []))
            .catch(() => setMessage("Unable to load traits for species."));
    }, [selectedSpeciesId]);

    const availableTraits = traits.filter(
        (t) => !linkedTraits.some((lt) => lt.id === t.id)
    );

    const handleLink = async () => {
        setStatus(null);
        try {
            const res = await fetch(
                `${API_URL}/api/species/${selectedSpeciesId}/traits/${selectedTraitId}`,
                { method: "POST" }
            );
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            const linked = traits.find((t) => String(t.id) === String(selectedTraitId));
            setLinkedTraits((prev) => [...prev, linked]);
            setSelectedTraitId("");
            setStatus("success");
            setMessage(`Trait linked successfully!`);
        } catch (err) {
            setStatus("error");
            setMessage(err.message || "Failed to link trait.");
        }
    };

    const selectedSpeciesName = species.find(
        (s) => String(s.id) === String(selectedSpeciesId)
    )?.name;

    return (
        <div className={styles.page}>
            <Link to="/" className={styles.back}>← Back</Link>

            <h1 className={styles.heading}>Link Traits</h1>

            <div className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="species-select">
                        Species
                    </label>
                    <select
                        id="species-select"
                        className={styles.select}
                        value={selectedSpeciesId}
                        onChange={(e) => {
                            setSelectedSpeciesId(e.target.value);
                            setStatus(null);
                            setMessage("");
                        }}
                    >
                        <option value="">choose one</option>
                        {species.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                </div>

                {selectedSpeciesId && (
                    <>
                        {linkedTraits.length > 0 && (
                            <div className={styles.linked}>
                                <p className={styles.linkedLabel}>
                                    Already linked to {selectedSpeciesName}:
                                </p>
                                <div className={styles.tagList}>
                                    {linkedTraits.map((t) => (
                                        <span key={t.id} className={styles.tag}>{t.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="trait-select">
                                Trait to link
                            </label>
                            {availableTraits.length === 0 ? (
                                <p className={styles.none}>All traits are already linked.</p>
                            ) : (
                                <select
                                    id="trait-select"
                                    className={styles.select}
                                    value={selectedTraitId}
                                    onChange={(e) => setSelectedTraitId(e.target.value)}
                                >
                                    <option value="">choose one</option>
                                    {availableTraits.map((t) => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>

                        <button
                            className={styles.button}
                            onClick={handleLink}
                            disabled={!selectedTraitId}
                        >
                            Link Trait
                        </button>
                    </>
                )}

                {status === "success" && (
                    <p className={`${styles.message} ${styles.success}`}>{message}</p>
                )}
                {status === "error" && (
                    <p className={`${styles.message} ${styles.error}`}>{message}</p>
                )}
            </div>
        </div>
    );
}