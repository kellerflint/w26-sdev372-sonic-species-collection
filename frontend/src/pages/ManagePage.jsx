import { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from "./ManagePage.module.css";

const API_URL = "";

export default function ManagePage() {
    const [tab, setTab] = useState("species");
    const [species, setSpecies] = useState([]);
    const [traits, setTraits] = useState([]);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState("");

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

    const handleUpdateSpecies = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/species/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editName }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setSpecies((prev) => prev.map((s) => s.id === id ? { ...s, name: editName } : s));
            setEditId(null);
            setEditName("");
        } catch (err) {
            setError(err.message || "Failed to update species.");
        }
    };

    const handleUpdateTrait = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/traits/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editName }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setTraits((prev) => prev.map((t) => t.id === id ? { ...t, name: editName } : t));
            setEditId(null);
            setEditName("");
        } catch (err) {
            setError(err.message || "Failed to update trait.");
        }
    };

    const handleUpdate = tab === "species" ? handleUpdateSpecies : handleUpdateTrait;
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
                        {editId === item.id ? (
                            <>
                                <input
                                    className={styles.input}
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <div className={styles.actions}>
                                    <button
                                        className={styles.saveBtn}
                                        onClick={() => handleUpdate(item.id)}
                                        disabled={!editName.trim()}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className={styles.cancelBtn}
                                        onClick={() => { setEditId(null); setEditName(""); }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <span className={styles.name}>{item.name}</span>
                                <div className={styles.actions}>
                                    <button
                                        className={styles.editBtn}
                                        onClick={() => { setEditId(item.id); setEditName(item.name); }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}