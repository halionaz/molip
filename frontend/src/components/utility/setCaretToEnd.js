const setCaretToEnd = (element) => {

    const range = document.createRange();
    const sel = window.getSelection();

    range.selectNodeContents(element);
    range.collapse(false);

    sel.removeAllRanges();
    sel.addRange(range);
};

export default setCaretToEnd;
