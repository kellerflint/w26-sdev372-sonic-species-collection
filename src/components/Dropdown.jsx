import { useEffect, useState } from "react";

export default function SpeciesDropdown() {
    const [species, setSpecies] = useState([])
    const [selected, setSelected] = useState("")

    useEffect(() => {
        fetch("http://localhost:3001/api/species")
        .then(res => res.json())
        .then(data => setSpecies(data))
    }, [])

    return (
        <>
            <label>Species:</label>
            <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
            >
                <option value=""> choose one </option>
                {species.map(specie => (
                    <option value={specie.name}>{specie.name}</option>
                ))}
            </select>
        </>
    )
}