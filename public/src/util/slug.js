export function idFromSlug(slug) {
    if(typeof slug !== "string") {
        return "";
    }

    let parts = slug.split("-");
    return parts[parts.length-1];
}
