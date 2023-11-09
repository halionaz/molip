// 특정 프로젝트를 열었다고 가정

import Editor from "@/components/Editor/Editor";
import styles from "./LoremProject.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";

const LoremProject = () => {
    return (
        <div style={{ display: "flex" }}>
            <div className={styles.main}>
                <Sidebar />
                <div className={styles.editor}>
                    <Editor />
                </div>
            </div>
        </div>
    );
};

export default LoremProject;
