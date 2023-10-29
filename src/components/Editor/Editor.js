import style from "./Editor.module.css";

const Editor = () => {
    return <div className={style.editor} contentEditable={true}>에디터일겁니다</div>;
};

export default Editor;
