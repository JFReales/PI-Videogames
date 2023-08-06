import style from "./Videogame.module.css"
import {Link} from "react-router-dom"



// eslint-disable-next-line react/prop-types
const Videogame = ({id,name,background_image,genres,rating}) => {
    return(
        <div className={style.videogame}>
            
            <p>Name:{name}</p>
            <p>Background_image:{background_image}</p>
            <p>Genres:{genres}</p>
            <p>Rating:{rating}</p>
            <Link to={`/detail/${id}`}>
                <button>Más información</button>
            </Link>
        </div>
    )
}

export default Videogame