import { useRef, useState } from "react";
import ContentEditable from "@/components/utility/content-editable";

const EditableBlock = ({ id, tag, html }) => {
    const ref = useRef(null);
    const [content, setContent] = useState({ tag, html });

    const onChangeHandler = (e) => {
        // 입력 시 content에 담김
        setContent({ ...content, html: e.target.value });
    };

    const onBlurHandler = () => {
        console.log(content);
    };

    return (
        <ContentEditable
            className="block"
            innerRef={ref}
            tagName={content.tag}
            html={content.html}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
        />
    );
};

export default EditableBlock;
