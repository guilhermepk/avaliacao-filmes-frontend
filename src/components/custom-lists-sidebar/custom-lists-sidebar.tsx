import styles from './custom-lists-sidebar.module.scss';

const CustomListsSidebar = () => {
    return (
        <div className={styles.custom_lists_sidebar}>
            <h2> Suas Listas </h2>

                <div className={styles.list_div}>
                    <h3> Favoritos </h3>
                        <p> 18 filmes - 12 séries</p>
                </div>

                <div className={styles.list_div}>
                    <h3> Assistir </h3>
                        <p> 18 filmes - 12 séries</p>
                </div>

            <h2> Listas compartilhadas </h2>

                <div className={styles.list_div}>
                    <h3> Ônibus </h3>
                        <p> 8 filmes - 2 séries </p>
                        <p><i><b> Morelo - João - Diogo </b></i></p>
                </div>

                <div className={styles.list_div}>
                    <h3> Viagem Itapema </h3>
                        <p> 8 filmes - 2 séries </p>
                        <p><i><b> Betina </b></i></p>
                </div>
        </div>
    );
}

export default CustomListsSidebar;