// 현재 Caret이 있는 문자열 상의 위치를 반환
// 

const getCaretPosition = () => {

    const sel = window.getSelection();
    

    return {
        startNode : sel.anchorNode,
        startOffset : sel.anchorOffset,
        endNode : sel.focusNode,
        endOffset : sel.focusOffset
    };
};

export default getCaretPosition;
