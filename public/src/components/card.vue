<template>
    <div v-bind:class="{
        'card': true,
        'card-blue': color === 'blue',
        'card-green': color === 'green',
        'card-orange': color === 'orange'
    }" v-on:click="$emit('click')">
        <div class="title" v-if="title">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ["color", "title"]
}
</script>
