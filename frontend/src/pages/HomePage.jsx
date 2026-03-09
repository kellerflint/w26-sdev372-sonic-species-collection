import { Link } from "react-router";
import CharacterStrip from "../components/CharacterStrip";
import styles from "./HomePage.module.css";

export default function HomePage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <img
                    src={`${import.meta.env.BASE_URL}images/Sonic.webp`}
                    alt="Sonic the Hedgehog"
                    className={styles.sonicImg}
                />
                <div>
                    <h1 className={styles.title}>SONIC SPECIES COLLECTION</h1>
                    <p className={styles.tagline}>
                        The total <em>unofficial</em> collection of traits of every species in the Sonic series
                    </p>
                </div>
            </header>

            <nav className={styles.nav}>
                <Link to="/species" className={styles.navCard}>
                    <h2>Search by Species</h2>
                    <p>Pick a species and see all of its defining traits</p>
                </Link>
                <Link to="/traits" className={styles.navCard}>
                    <h2>Search by Trait</h2>
                    <p>Pick a trait and see which species share it</p>
                </Link>
            </nav>
            <CharacterStrip />
        </div>
    );
}
