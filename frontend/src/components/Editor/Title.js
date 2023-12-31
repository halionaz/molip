import ContentEditable from "@/components/utility/content-editable";

import styles from "./Title.module.css";

const Title = ({ emoji, titleName, setEmoji, setTitle }) => {
    return (
        <div className={styles.title}>
            <ContentEditable
                className={styles.titleEmoji}
                html={emoji}
                onChange={(event) => {
                    setEmoji(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        // 제목 줄로 Caret 옮기기
                    }
                }}
                tagName={"h1"}
            />
            <ContentEditable
                className={styles.titleName}
                tagName={"h1"}
                html={titleName}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        // 컨텐츠 블럭의 첫 줄로 Caret 옮기기
                    }
                }}
            />
        </div>
    );
};

export default Title;
