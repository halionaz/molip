// molip.com/p/[pid]

"use client";

import Editor from "@/components/Editor/Editor";
import styles from "./Page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
    const pageID = params.pid;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const router = useRouter();
    useEffect(() => {
        fetch(`http://localhost:3001/pages/${pageID}`, {
            cache: "no-store",
        })
            .then((val) => {
                return val.json();
            })
            .then((val) => {
                if (val.error) {
                    router.push("/");
                } else {
                    setData(val[0]);
                    console.log(val);
                    setLoading(false);
                }
            });
    }, []);
    return (
        <div className={styles.page}>{!loading && <Editor data={data} />}</div>
    );
};

export default Page;
