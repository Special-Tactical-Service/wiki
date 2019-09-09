<template>
    <div v-bind:class="{
        'card no-select': true,
        'card-blue': color === 'blue',
        'card-green': color === 'green'
    }" v-on:click="$emit('click')">
        <div class="title" v-if="title">
            <i class="material-icons" v-if="pinned">flag</i>
            {{title}}
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["color", "title", "pinned"]
}
</script>
