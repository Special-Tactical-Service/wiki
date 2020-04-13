<template>
    <div>
        <sts-menu></sts-menu>
        <div class="content">
            <div class="content-main">
                <div class="content-main-left">
                    <slot name="left"></slot>
                </div>
                <div class="content-main-right">
                    <slot></slot>
                </div>
            </div>
        </div>
        <sts-footer></sts-footer>
    </div>
</template>

<script>
    import stsMenu from "./menu.vue";
    import stsFooter from "./footer.vue";

    export default {
        components: {stsMenu, stsFooter}
    }
</script>
