// molip.com/p/[pid]

"use client";

// react import
import { useEffect, useState } from "react";

// component import
import styles from "./Page.module.css";
import LeftSidebar from "@/components/Sidebar/LeftSidebar";
import Editor from "@/components/Editor/Editor";

const Page = ({ params }) => {
    const pid = params.pid;
    const [pagesList, setPagesList] = useState([]);

    useEffect(() => {
        // Pages List Server Fatch
        fetchPagesList();
    }, []);

    const fetchPagesList = async () => {
        // 서버에서 페이지 리스트 받아오는 함수
        fetch(`http://localhost:3001/pages`, {
            cache: "no-cache",
        })
            .then((val) => {
                return val.json();
            })
            .then((val) => {
                if (val.error) {
                    console.error(val.error);
                } else {
                    console.log(val);
                    setPagesList(val);
                }
            });
    };

    return (
        <div className={styles.page}>
            <div className={styles.main}>
                <LeftSidebar pid={pid} pagesList={pagesList} fetchPagesList={fetchPagesList} />
                <Editor pid={pid} fetchPagesList={fetchPagesList} />
            </div>
        </div>
    );
};

export default Page;
