import styles from './header.module.css'

import {Link, Route, Routes} from "react-router-dom";
import Home from "../home/home.tsx";
import Movies from "../movies/movies.tsx";
import About from "../about/about.tsx";
import MovieFullscreen from "../movieFullscreen/movieFullscreen.tsx";

export const Header = () => {

    return (
        <div>
            <div className={styles.container}>
                <nav>
                    <ul className={styles.header}>
                        <li>
                            <Link
                                className={styles.link}
                                to="/"
                            >Home</Link>
                        </li>
                        <li>
                            <Link
                                className={styles.link}
                                to="/movies"
                            >Movies</Link>
                        </li>
                        <li>
                            <Link
                                className={styles.link}
                                to="/about"
                            >About</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/movies" element={<Movies/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path=":id" element={<MovieFullscreen/>}/>
            </Routes>

        </div>
    )
}