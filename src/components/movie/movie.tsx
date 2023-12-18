import styles from './movie.module.css'
import {MovieProps} from "../movies/movies.tsx";
import {Link} from "react-router-dom";

const Movie = ({id, name, release_date, director, onDelete}: MovieProps) => {
    return (
        <Link
            to={`/${id}`}
            className={styles.container}
        >
            <h3> {name} </h3>
            <p> {release_date} </p>
            <p> {director} </p>

            <div className={styles.deleteButton__wrapper}>
                <button
                    className={styles.deleteButton}
                    onClick={(event) => {
                        event.preventDefault();
                        onDelete(id);
                    }}
                >Delete
                </button>
            </div>
        </Link>
    );
};

export default Movie;