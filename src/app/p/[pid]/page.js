// 특정 프로젝트를 열었다고 가정

"use client"

import Editor from "@/components/Editor/Editor";
import styles from "./Page.module.css";
import { useEffect } from "react";

const Page = ({ params }) => {
    useEffect(()=>{
        document.addEventListener("keydown", (event) => {
            if((event.metaKey || event.ctrlKey) && event.key === "s"){
                event.preventDefault();
            }
        });
    }, []);
    const pageID = params.pid;
    return (
        <div className={styles.page}>
            <Editor id={pageID} />
        </div>
    );
};

export default Page;
