// Builds and returns table of contents based on headline elements in given DOM.
export function buildTableOfContents(dom) {
    let toc = [];
    let id = 0;
    let h2Number = 0;
    let h3Number = 0;
    let activeHeadline = null;

    dom.childNodes.forEach(e => {
        let tag = e.tagName.toUpperCase();
        let text = e.innerText;

        if(e.innerText === "") {
            text = "-";
        }

        if(tag === "H2") {
            id++;
            h2Number++;
            toc.push({id, e, tag, text: text, number: h2Number, active: false, children: []});
            activeHeadline = toc[toc.length-1];
        }
        else if(tag === "H3") {
            id++;
            h3Number++;

            if(activeHeadline) {
                activeHeadline.children.push({id, e, tag, text: text, number: h3Number, active: false});
            }
            else {
                toc.push({id, e, tag, text: text, number: h3Number, active: false});
            }
        }
    });

    if(toc.length) {
        toc[0].active = true;
    }

    return toc;
}
