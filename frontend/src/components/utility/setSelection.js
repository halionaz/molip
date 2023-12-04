// selection 조정하는거 개빡세네

const setSelection = (element, startPos, endPos)=>{
    const sel = window.getSelection();
    // const curRange = sel.getRangeAt(0);

    const startContainer = element.firstChild;
    const endContainer = element.firstChild;

    const newRange = document.createRange();
    newRange.setStart(startContainer, startPos);
    newRange.setEnd(endContainer, endPos);

    // 현재 sel이 가지고 있는 range값 삭제
    sel.removeAllRanges();
    sel.addRange(newRange);
}

export default setSelection;