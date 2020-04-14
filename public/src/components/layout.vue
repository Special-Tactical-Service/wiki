<template>
    <div>
        <sts-menu></sts-menu>
        <div class="content">
            <div class="content-main">
                <div>
                    <slot></slot>
                </div>
                <div class="content-main-right">
                    <slot name="right"></slot>
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
