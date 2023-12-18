import {useParams} from "react-router-dom";
import Query, {apiMoviesUrl} from "../query/query.tsx";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import {MovieProps} from "../movies/movies.tsx";
import styles from './movieFullscreen.module.css'
import {queryClient} from "../../App.tsx";
import {z} from "zod";

const commentSchema = z.string().refine((value) => {
    if (value.trim().length === 0) {
        throw new Error("Comment cannot be empty");
    }

    const regex = /^[a-zA-Z0-9.,!?(){}[\]<>-_\s]+$/;
    if (!regex.test(value)) {
        throw new Error("Comment contains invalid symbols");
    }

    return true;
});

const MovieFullscreen = () => {

    const [movie, setMovie] = useState<MovieProps>();

    const {id} = useParams();

    const commentInputRef = useRef<HTMLTextAreaElement>(null);

    const getMovieById = async () => {
        const entryToFindUrl = `${apiMoviesUrl}/${id}`
        try {
            const response = await axios.get<MovieProps>(entryToFindUrl);
            console.log("Got data successfully", response.data);
            setMovie(response.data);
        } catch (error) {
            console.error("Error posting data", error);
        }
    }

    const putMovieComment = async (newComment: string) => {
        const entryToFindUrl = `${apiMoviesUrl}/${id}`

        if (!movie) return;

        const newMovie = {...movie};
        newMovie.comments.push(newComment);

        try {
            const response = await axios.put(entryToFindUrl,newMovie);
            console.log("Updated data successfully", response.data);
            clearCommentInput();
            queryClient.invalidateQueries({queryKey: ['movies']});
        } catch (error) {
            console.error("Error updating data", error);
        }
    }

    const clearCommentInput = () => {
        if (commentInputRef.current) {
            commentInputRef.current.value = '';
        }
    }
    const submitComment = () => {
        if (commentInputRef.current) {
            const commentValue = commentInputRef.current.value;
            try{
                commentSchema.parse(commentValue);
                putMovieComment(commentValue);
            } catch (error)
            {
                console.error("Failed to validate comment:", error);
            }
        }
    }

    useEffect(() => {
        getMovieById();
    }, []);

    return (
        <div className={styles.container}>

            <Query onFetchSuccess={getMovieById}/>

            <div className={styles.movieContainer}>
                <h2> {movie?.name} </h2>

                <div className={styles.info}>
                    <h3> Release Date: {movie?.release_date} </h3>
                    <h3> Director: {movie?.director} </h3>
                </div>
            </div>

            <textarea
                ref={commentInputRef}
                className={styles.commentInput}
                maxLength={600}
            ></textarea>

            <button
                className={styles.submitButton}
                onClick={submitComment}
            > Submit
            </button>

            <div className={styles.commentSection}>
                <h2> Comment Section </h2>

                {movie?.comments.map((currentComment) => (
                    <p key={Math.random()}> {currentComment} </p>
                ))}

            </div>

        </div>
    );
};

export default MovieFullscreen;