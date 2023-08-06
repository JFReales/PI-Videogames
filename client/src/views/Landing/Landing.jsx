
import style from "./Landing.module.css"
import { Link } from "react-router-dom"

const Landing = () =>{
    return(
     <div className={style.all}>
        <div className={style.landing}>
            <Link to='/home' >
                <button className={style.button}> Vamos a ver! </button>
            </Link>
        </div>
     </div>
    )
}

export default Landing;