import { useState } from "react";
import { Link } from "react-router";
import styles from "./AddSpeciesPage.module.css";

const API_URL = "";

export default function AddSpeciesPage() {
    const [name, setName] = useState("");
    const [status, setStatus] = useState(null); // "success" | "error" | null
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        try {
            const res = await fetch(`${API_URL}/api/traits/collect`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ addName: name }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setStatus("success");
            setMessage(`"${data.content.name}" added!`);
            setName("");
        } catch (err) {
            setStatus("error");
            setMessage(err.message || "Something went wrong.");
        }
    };

    return (
        <div className={styles.page}>
            <Link to="/" className={styles.back}>← Back</Link>

            <h1 className={styles.heading}>Add a Trait</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="trait-name">
                    Trait name
                </label>
                <input
                    id="trait-name"
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Long ears"
                    required
                />
                <button
                    className={styles.button}
                    type="submit"
                    disabled={!name.trim()}
                >
                    Add Trait
                </button>
            </form>

            {status === "success" && (
                <p className={`${styles.message} ${styles.success}`}>{message}</p>
            )}
            {status === "error" && (
                <p className={`${styles.message} ${styles.error}`}>{message}</p>
            )}
        </div>
    );
}