import styles from "./Card.module.css";

export default function Card({ name, imageUrl }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageSlot}>
                {imageUrl && (
                    <img src={imageUrl} alt={name} className={styles.image} />
                )}
            </div>
            <p className={styles.label}>{name}</p>
        </div>
    );
}
