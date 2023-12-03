// 현재 Caret이 있는 문자열 상의 위치를 반환

const getCaretPosition = () => {

    const sel = window.getSelection();

    sel.modify("extend", "backward", "paragraphboundary");

    const pos = sel.toString().length;

    if (sel.anchorNode != undefined) {
        sel.collapseToEnd();
    }

    return pos;
};

export default getCaretPosition;
