import styles from "./Sidebar.module.css";

const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <h1 className={styles.molip}>💭 mol.ip</h1>
            <div className={styles.search}>검색</div>
            <div className={styles.history}>업데이트</div>
        </nav>
    );
};

export default Sidebar;
