import styles from "./Dropdown.module.css";

export default function Dropdown({ label, value, onChange, options, placeholder = "choose one" }) {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>{label}</label>
            <select className={styles.select} value={value} onChange={onChange}>
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
