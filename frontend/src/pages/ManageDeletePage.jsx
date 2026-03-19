import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./ManageDeletePage.module.css";

const API_URL = "";

export default function ManagePage() {
    const [tab, setTab] = useState("species");
    const [species, setSpecies] = useState([]);
    const [traits, setTraits] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/all`)
            .then((res) => res.json())
            .then((data) => setSpecies(data))
            .catch(() => setError("Unable to load species."));
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/api/traits`)
            .then((res) => res.json())
            .then((data) => setTraits(data))
            .catch(() => setError("Unable to load traits."));
    }, []);

    const handleDeleteSpecies = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/species/${id}/gone`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setSpecies((prev) => prev.filter((s) => s.id !== id));
        } catch (err) {
            setError(err.message || "Failed to delete species.");
        }
    };

    const handleDeleteTrait = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/traits/${id}/gone`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setTraits((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            setError(err.message || "Failed to delete trait.");
        }
    };

    const activeList = tab === "species" ? species : traits;
    const handleDelete = tab === "species" ? handleDeleteSpecies : handleDeleteTrait;

    return (
        <div className={styles.page}>
            <Link to="/" className={styles.back}>← Back</Link>

            <h1 className={styles.heading}>Manage</h1>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${tab === "species" ? styles.active : ""}`}
                    onClick={() => setTab("species")}
                >
                    Species
                </button>
                <button
                    className={`${styles.tab} ${tab === "traits" ? styles.active : ""}`}
                    onClick={() => setTab("traits")}
                >
                    Traits
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <ul className={styles.list}>
                {activeList.map((item) => (
                    <li key={item.id} className={styles.item}>
                        <span className={styles.name}>{item.name}</span>
                        <button
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}