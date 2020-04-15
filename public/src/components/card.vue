<template>
    <div :class="cardClass" v-on:click="click">
        <div class="card-title">
            {{title}}
        </div>
        <div class="card-info">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["color", "title"],
        computed: {
            cardClass() {
                return {
                    card: true,
                    "card-blue": this.color === "blue",
                    "card-green": this.color === "green"
                };
            }
        },
        methods: {
            click(e) {
                this.$emit("click", e);
            }
        }
    }
</script>
