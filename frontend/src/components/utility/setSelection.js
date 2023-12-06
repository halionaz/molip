const setSelection = (element, startPos, endPos)=>{
    // receives startPos and endPos as parameters.
    // A function that selects startPos and endPos within an element.

    const sel = window.getSelection();
    // const curRange = sel.getRangeAt(0);

    const startContainer = element.firstChild;
    const endContainer = element.firstChild;

    const newRange = new Range();

    newRange.setStart(startContainer, startPos);
    newRange.setEnd(endContainer, endPos);

    console.log(newRange.startContainer, newRange.startOffset);
    console.log(newRange.endContainer, newRange.endOffset);

    // 현재 sel이 가지고 있는 range값 삭제
    sel.removeAllRanges();
    sel.addRange(newRange);
}

export default setSelection;