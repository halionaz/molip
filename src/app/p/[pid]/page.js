// 특정 프로젝트를 열었다고 가정

import Editor from "@/components/Editor/Editor";
import styles from "./Page.module.css";
import LeftSidebar from "@/components/Sidebar/LeftSidebar";

const Page = ({ params }) => {
    const pageID = params.pid;
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logo}>몰입</div>
                <div className={styles.rightHeader}>
                    <div>도움말</div>
                    <div>설정</div>
                    <div>프로필</div>
                </div>
            </header>
            <div className={styles.main}>
                <LeftSidebar />
                <Editor id={pageID} />
            </div>
        </div>
    );
};

export default Page;
