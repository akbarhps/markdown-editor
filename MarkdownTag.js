class MarkdownTag extends HTMLElement {

    name;
    prefix;
    postfix;
    icon;

    constructor(name, prefix, postfix, icon) {
        super();
        this.name = name;
        this.prefix = prefix;
        this.postfix = postfix;
        this.icon = icon;
    }

    connectedCallback() {
        this.id = `markdown-${this.name}`;
        this.className = 'markdown-tag'

        const icon = new Image(20, 20);
        icon.src = this.icon;
        icon.alt = this.name;
        icon.title = this.name;

        this.appendChild(icon);
        this.addEventListener('click', this.#onClickHandler);
    }

    #onClickHandler() {
        const selectionStart = inputText.value.substring(0, inputText.selectionStart);
        const selectedText = inputText.value.substring(inputText.selectionStart, inputText.selectionEnd);
        const selectionEnd = inputText.value.substring(inputText.selectionEnd);
        const newText = selectionStart + this.prefix + selectedText + this.postfix + selectionEnd;

        inputText.value = newText;
        inputText.focus();
        renderer.innerHTML = markdownIt.render(newText);

        let cursorPosition = selectionStart.length + this.prefix.length;
        if (selectedText) {
            cursorPosition += selectedText.length + this.postfix.length;
        }
        inputText.selectionEnd = cursorPosition;
    }
}

customElements.define('markdown-tag', MarkdownTag);
