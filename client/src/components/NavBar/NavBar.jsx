import { Link } from "react-router-dom";
import style from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar"


const NavBar = () =>{
    return(
        <div>
        <div className={style.mainContainer}>

            <Link to="/home">HOME</Link>
            <Link to="/create">FORM</Link>

        </div>
        <nav>
            <div><SearchBar /></div>
        </nav>
        </div>
    )
}

export default NavBar;