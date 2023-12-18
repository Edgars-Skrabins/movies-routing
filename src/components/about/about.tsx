import styles from './about.module.css'

const About = () => {
    return (
        <div className={styles.container}>
            <h1> About the Author </h1>
            <h2> Edgars Skrabiņš </h2>
            <p> I am an independant developer who has passion for creating CRUD websites.
                1 every week.
            </p>
        </div>
    );
};

export default About;