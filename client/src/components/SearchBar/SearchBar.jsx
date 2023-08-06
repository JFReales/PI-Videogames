import { useState } from "react";
import { onSearch } from "../../redux/actions";
import { useDispatch } from "react-redux";


const SearchBar=() =>{
    const dispatch = useDispatch();

    const [nameState, setNameState] = useState("");
    const [error, setError] = useState("");

    const handleSearch = (event) =>{
        setNameState(event.target.value);
        setError("");
    }

    const handleClick = async () =>{
        if (nameState.trim() === "") {
            setError("Ingresar el nombre del juego a buscar")  
        }else{
            try {
                await dispatch(onSearch(nameState))
            } catch (error) {
                setError("Perdón! No conocemos el nombre de ese juego")
            }
        }
    }
    return(
        <div>
            <input type="search" placeholder="Nombre del juego" value={nameState} onChange={handleSearch} />
            <button className="" onClick={()=>{handleClick(); setNameState("")}}>Search</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default SearchBar