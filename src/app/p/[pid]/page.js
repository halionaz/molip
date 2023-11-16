// 특정 프로젝트를 열었다고 가정

import Editor from "@/components/Editor/Editor";
import styles from "./Page.module.css";
import LeftSidebar from "@/components/Sidebar/LeftSidebar";
import RightSidebar from "@/components/Sidebar/RightSidebar";

const Page = ({ params }) => {
    const pageID = params.pid;
    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <LeftSidebar />
                <div className={styles.center}>
                    <div className={styles.centerHeader}></div>
                    <Editor id={pageID} />
                </div>
                <RightSidebar />
            </div>
        </div>
    );
};

export default Page;
