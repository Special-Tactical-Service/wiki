import VueI18n from "vue-i18n";

export function getI18n() {
    return new VueI18n({
        locale: "de",
        fallbackLocale: "de"
    });
}
