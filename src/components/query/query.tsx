import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {MovieProps, QueryProps} from "../movies/movies.tsx";
import {useEffect} from "react";

export const apiMoviesUrl = "http://localhost:3004/movies"

const Query = ({onFetchSuccess}: QueryProps) => {
    const getMoviesDB = async () => {
        try {
            const response = await axios.get(apiMoviesUrl);
            console.log("Got data successfully", response.data);
            return response.data as MovieProps[];
        } catch (error) {
            console.error("Error getting data", error);
        }
    }

    const cacheStaleTimeInMs = 60000;

    const {data, isSuccess} = useQuery({
            queryKey: ['movies'],
            queryFn: getMoviesDB,
            staleTime: cacheStaleTimeInMs,
        }
    );

    useEffect(() => {
        if (isSuccess) {
            onFetchSuccess(data as MovieProps[]);
        }
    }, [isSuccess,data]);

    return (
        <></>
    );

};

export default Query;