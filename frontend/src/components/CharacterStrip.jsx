import styles from "./CharacterStrip.module.css";

const characters = [
    "Amy",
    "Blaze",
    "Cream",
    "Eggman",
    "Knuckles",
    "Shadow",
    "Tails",
];

export default function CharacterStrip() {
    return (
        <div className={styles.strip}>
            {characters.map((name) => (
                <img
                    key={name}
                    src={`${import.meta.env.BASE_URL}images/${name}.webp`}
                    alt={name}
                    className={styles.img}
                />
            ))}
        </div>
    );
}
