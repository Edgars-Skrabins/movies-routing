import styles from './App.module.css'
import {Header} from "./components/header/header.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter as Router} from "react-router-dom";

export const queryClient = new QueryClient();

const App = () => {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <div className={styles.container}>
                    <Router>
                        <Header/>
                    </Router>
                </div>
            </QueryClientProvider>
        </>
    )
}

export default App
