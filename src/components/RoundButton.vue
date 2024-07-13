<template>
    <button :class="['text-sm font-medium rounded-full px-3 py-1 transition-all', variants[variant] ?? variants.default ]" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script setup>

const variants = {
    default : 'border border-gray-400 hover:bg-green-500 hover:text-gray-50',
    danger: 'bg-red-300 enabled:hover:bg-red-200 text-red-950'
}

defineProps({
    variant : {
        type: String,
        default: 'default'
    }
})

defineEmits([
    'click'
])
</script>