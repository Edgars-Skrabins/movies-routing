import styles from './createMovie.module.css'
import {CreateMovieProps, MovieProps} from "../movies/movies.tsx";
import {useEffect, useRef, useState} from "react";

const CreateMovie = ({onCreateMovie,onDelete}: CreateMovieProps) => {

    const [movie, setMovie] = useState<MovieProps>();

    const [movieNameInput, setMovieNameInput] = useState('');
    const [movieReleaseDateInput, setMovieReleaseDateInput] = useState('');
    const [movieDirectorNameInput, setMovieDirectorNameInput] = useState('');

    const nameInputRef = useRef<HTMLInputElement>(null);
    const releaseDateInputRef = useRef<HTMLInputElement>(null);
    const movieDirectorNameInputRef = useRef<HTMLInputElement>(null);

    const clearInputFields = () => {
        if(nameInputRef.current && releaseDateInputRef.current && movieDirectorNameInputRef.current)
        {
            nameInputRef.current.value = '';
            releaseDateInputRef.current.value = '';
            movieDirectorNameInputRef.current.value = '';
        }
    }

    const handleCreateMovieBtn = () => {
        const newMovie: MovieProps = {
            id: Math.random(),
            name: movieNameInput,
            release_date: movieReleaseDateInput,
            director: movieDirectorNameInput,

            comments: [],

            onDelete: (id) => onDelete(id),
        }

        clearInputFields();
        setMovie(newMovie);
    }

    useEffect(() => {
        if (movie) {
            onCreateMovie(movie);
        }
    }, [movie]);

    return (
        <div className={styles.container}>
            <form action="">
                <label className={styles.label}>
                    Movie Name
                    <input
                        placeholder='Type in the Movie name'
                        maxLength={30}
                        className={styles.input}
                        type="text"
                        ref={nameInputRef}
                        onChange={(e) => setMovieNameInput(e.currentTarget.value)}
                    />
                </label>

                <label className={styles.label}>
                    Release date
                    <input
                        className={styles.input}
                        type="date"
                        ref={releaseDateInputRef}
                        onChange={(e) => setMovieReleaseDateInput(e.currentTarget.value)}
                    />
                </label>

                <label className={styles.label}>
                    Movie Director
                    <input
                        placeholder='Type in the Movie Director name'
                        maxLength={30}
                        className={styles.input}
                        type="text"
                        ref={movieDirectorNameInputRef}
                        onChange={(e) => setMovieDirectorNameInput(e.currentTarget.value)}
                    />
                </label>

                <button
                    className={styles.button}
                    onClick={(event) => {
                        event.preventDefault();
                        handleCreateMovieBtn();
                    }}
                > Create
                </button>

            </form>
        </div>
    );
};

export default CreateMovie;