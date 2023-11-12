// 특정 프로젝트를 열었다고 가정

import Editor from "@/components/Editor/Editor";
import styles from "./Page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";

const Page = ({params}) => {
    return (
        <div style={{ display: "flex", height: "100%" }}>
            <div className={styles.main}>
                <Sidebar />
                <div className={styles.editor}>
                    <Editor id={params.pid} />
                </div>
            </div>
        </div>
    );
};

export default Page;
