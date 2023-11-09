// 특정 프로젝트를 열었다고 가정

import Editor from "@/components/Editor/Editor";
import styles from "./LoremProject.module.css";

const LoremProject = () => {
    return <>
        <nav className={styles.sidebar}>
            <h1 className={styles.molip}>💭 mol.ip</h1>
            <div className={styles.search}>검색</div>
            <div className={styles.history}>업데이트</div>
        </nav>
        <Editor />
    </>
}

export default LoremProject;