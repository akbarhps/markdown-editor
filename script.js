const markdownHelper = document.querySelector('#markdown-helper');
const inputText = document.querySelector('#input-text');
const renderer = document.querySelector('#renderer');

const markdownIt = window.markdownit({
    html: true,
    linkify: true,
    breaks: true,

    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, {language: lang}).value;
            } catch (__) {
            }
        }
        return '';
    }
});

const markdownTags = [
    new MarkdownTag('Title', '# ', '', './assets/title.svg'),
    new MarkdownTag('Bold', '**', '**', './assets/bold.svg'),
    new MarkdownTag('Italic', '*', '*', './assets/italic.svg'),
    new MarkdownTag('StrikeTrough', '~~', '~~', './assets/strike_through.svg'),
    new MarkdownTag('OrderedList', '1. ', '', './assets/ordered_list.svg'),
    new MarkdownTag('UnOrderedList', '- ', '', './assets/unordered_list.svg'),
    new MarkdownTag('Quote', '> ', '', './assets/quote.svg'),
    new MarkdownTag('CodeBlock', '```\n', '\n```', './assets/code.svg'),
    new MarkdownTag('Link', '[', '](url)', './assets/link.svg'),
    new MarkdownTag('Image', '![', '](url)', './assets/image.svg'),
];

markdownHelper.addEventListener('wheel', e => {
    e.preventDefault();
    markdownHelper.scrollTo({
        top: 0,
        left: markdownHelper.scrollLeft + e.deltaY,
    });
});

for (const tag of markdownTags) {
    markdownHelper.appendChild(tag)
}

inputText.addEventListener('input', () => {
    renderer.innerHTML = markdownIt.render(inputText.value);
})
