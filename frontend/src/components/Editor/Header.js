import styles from "./Header.module.css";

const Header = ({ emoji, titleName, canSave }) => {
    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.emoji}>{emoji}</div>
                <div className={styles.title}>{titleName}</div>
                {canSave ? "•" : ""}
            </div>
        </div>
    );
};

export default Header;
