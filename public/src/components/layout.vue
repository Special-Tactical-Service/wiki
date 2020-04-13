<template>
    <div>
        <sts-menu></sts-menu>
        <div class="content">
            <slot></slot>
            <sts-footer></sts-footer>
        </div>
    </div>
</template>

<script>
    import stsMenu from "./menu.vue";
    import stsFooter from "./footer.vue";

    export default {
        components: {stsMenu, stsFooter}
    }
</script>
