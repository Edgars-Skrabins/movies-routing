import styles from './movies.module.css'
import {useState} from "react";
import Movie from "../movie/movie.tsx";
import Query, {apiMoviesUrl} from "../query/query.tsx";
import CreateMovie from "../createMovie/createMovie.tsx";
import {queryClient} from "../../App.tsx";
import axios from "axios";

export type CreateMovieProps = {
    onCreateMovie: (newMovie: MovieProps) => void,
    onDelete: (id:number) => void,
}

export type MovieProps = {
    id: number,
    name: string,
    release_date: string,
    director: string,

    comments: string[],

    onDelete: (id:number) => void,
}

export type QueryProps = {
    onFetchSuccess: (movies: MovieProps[]) => void,
}

const Movies = () => {

    const postMovieDB = async (newMovie: MovieProps) => {
        try {
            const response = await axios.post(apiMoviesUrl, newMovie);
            console.log("Posted data successfully", response.data);

            await queryClient.invalidateQueries({queryKey:['movies']});

            return response.data as MovieProps[];
        } catch (error) {
            console.error("Error posting data", error);
        }
    }

    const deleteMovieDB = async (id:number) => {
        const entryToDeleteUrl = `${apiMoviesUrl}/${id}`

        try {
            const response = await axios.delete(entryToDeleteUrl);
            console.log("Deleted data successfully");

            await queryClient.invalidateQueries({queryKey:['movies']});

            return response.data as MovieProps[];
        } catch (error) {
            console.error("Error deleting data", error);
        }
    }


    const [loadedMovies, setLoadedMovies] = useState<MovieProps[]>([]);

    const createMovie = (newMovie: MovieProps) => {
        postMovieDB(newMovie);
    }

    const deleteMovie = (id:number) => {
        deleteMovieDB(id);
    }

    return (
        <>
            <Query
                onFetchSuccess={(movies) => setLoadedMovies(movies)}
            />

            <div className={styles.container}>

                <CreateMovie
                    onCreateMovie={createMovie}
                    onDelete={deleteMovie}
                />

                <div className={styles.movieContainer}>
                    {loadedMovies.map(({id, name, release_date, director,comments}) => (
                        <Movie
                            key={id}
                            id={id}
                            name={name}
                            release_date={release_date}
                            director={director}
                            comments={comments}

                            onDelete={deleteMovie}
                        />
                    ))}
                </div>

            </div>
        </>
    );
};

export default Movies;