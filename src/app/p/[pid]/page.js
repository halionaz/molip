// molip.com/p/[pid]
"use client";

import Editor from "@/components/Editor/Editor";
import styles from "./Page.module.css";

const Page = ({ params }) => {
    const pageID = params.pid;
    return (
        <div className={styles.page}>
            <Editor id={pageID} />
        </div>
    );
};

export default Page;
