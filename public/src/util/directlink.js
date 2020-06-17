const headlineRegexp = /<(h[234])>(.*?)<\/\1>/gm;

export function addDirectLinks(content) {
    let matches = [...content.matchAll(headlineRegexp)];

    for(let match of matches) {
        content = content.replace(match[0], getHeadlineWithAnchor(match[1], match[2]));
    }

    return content;
}

function getHeadlineWithAnchor(headline, content) {
    let textContent = document.createElement("div");
    textContent.innerHTML = content;
    let text = textContent.innerText;
    return `<${headline}>${content} <span class="clipboard-link" text="${text}" title="Link kopieren">#</span></${headline}>`;
}

export function copyToClipboard(text) {
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if(result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(text);
        }
    });
}
