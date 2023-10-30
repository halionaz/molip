import { useState } from "react";
import ContentEditable from "react-contenteditable";

const EditableBlock = ({ id, tag, html}) => {

    const [content, setContent] = useState({ id, tag, html });

    const onChangeHandler = (e) => {
        // 입력 시 content에 담김
        setContent({ ...content, html: e.target.value });
    }

    return (
        <ContentEditable
            className="block"
            tagName={content.tag}
            html={content.html}
            onChange={onChangeHandler}
        />
    );
};

export default EditableBlock;
