import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

const EditableBlock = ({ html, tagName }) => {
    const [content, setContent] = useState({ html, tagName });
    const contentEditable = useRef(null);

    const onChangeHandler = (e) => {
        setContent({ ...content, html: e.target.value });
    };

    return (
        <ContentEditable
            className={"Block"}
            innerRef={contentEditable}
            html={content.html}
            tagName={content.tagName}
            onChange={onChangeHandler}
        />
    );
};

export default EditableBlock;
