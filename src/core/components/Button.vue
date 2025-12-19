<script setup>
    defineProps({
        isActive : Boolean
    });
</script>
<template>
    <div class="mt-5">
        <button type="submit" class="text-white text-[16px] font-medium rounded-lg bg-main  p-3 w-full outline-none border-none cursor-pointer hover:shadow-xl hover:text-back transition-shadow disabled:bg-disabled" :disabled="!isActive">
            <i v-if="!isActive" class="fa-solid fa-spinner animate-spin"></i>
            <span v-if="isActive"><slot></slot></span>
        </button>
    </div>
</template>