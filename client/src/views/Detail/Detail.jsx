
/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetail, getVideogameId } from "../../redux/actions";



function VideogameDetail(){

    const dispatch = useDispatch();

    const gameDetail = useSelector(state => state.detail)

    const {id} = useParams()
   

    useEffect(()=>{
        dispatch(getVideogameId(id));
        return () =>{
            dispatch(cleanDetail());
        }
    }, [id, dispatch]);
    
   

    return (
        
        <div>
            <div>
                <h1>{gameDetail.name}</h1>
                <h1>{gameDetail.description}</h1>
            </div>
            <div>
                <label >Platforms: </label>
                <ul>
                    {
                        gameDetail.platforms?.map((pla) => {
                            return (
                            
                            <li>{pla}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <label>Genres: </label>
                <ul>
                    {
                        gameDetail.genres?.map((gen) => {
                            return (
                            
                            <li>{gen}</li>
                            )
                        })
                    }
                </ul>
            </div>
            <div>
                <h1>Rating:{gameDetail.rating}</h1>
            </div>
            <div>
                <h1>Released:{gameDetail.released}</h1>
            </div>
        </div>
    )
}

export default VideogameDetail;