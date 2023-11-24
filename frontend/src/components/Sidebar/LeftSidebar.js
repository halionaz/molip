import styles from "./LeftSidebar.module.css";

import {
    GoArchive,
    GoHistory,
    GoSearch,
} from "react-icons/go";
import PageBtn from "../Button/PageBtn/PageBtn";

const LeftSidebar = ({ pid, pagesList, fetchPagesList }) => {
    return (
        <div className={styles.container}>
            <nav className={styles.sidebar}>
                <div className={styles.bars}>
                    <div className={styles.mainBar}>
                        <div
                            className={[
                                styles.mainBarComponent,
                                styles.selected,
                            ].join(" ")}
                        >
                            <GoArchive className={styles.mainBarBtn} />
                        </div>
                        <div className={styles.mainBarComponent}>
                            <GoSearch className={styles.mainBarBtn} />
                        </div>
                        <div className={styles.mainBarComponent}>
                            <GoHistory className={styles.mainBarBtn} />
                        </div>
                    </div>
                    <div className={styles.subBar}>
                        {pagesList.map((page, id) => {
                            return <PageBtn key={id} data={page} pid={pid} fetchPagesList={fetchPagesList} />
                        })}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default LeftSidebar;
