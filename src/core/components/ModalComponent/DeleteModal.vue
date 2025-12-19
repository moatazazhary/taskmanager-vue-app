<script setup>
    import Modal from './Modal.vue';
    import { useModalStore } from '../../stores/ModalStore';
    defineProps({
        isActive : Boolean
    });


</script>
<template>
    <Modal>
        <h2 class="text-lg text-title font-medium">Delete</h2>
        <div class="mt-5">
            <h3 class="text-text text-sm">Are you Sure you want to delete this? </h3>
            <p class="text-red-500 text-sm font-medium">This cannot be undone!</p>
        </div>
        <slot></slot>
        <div class="mt-7">
        <button @click="useModalStore().modalName = ''" class="text-white text-[16px] font-medium rounded-lg bg-red-500  p-3 w-full outline-none border-none cursor-pointer hover:shadow-xl hover:text-back transition-shadow disabled:bg-disabled" :disabled="!isActive">
            <i v-if="!isActive" class="fa-solid fa-spinner animate-spin"></i>
            <span v-if="isActive">Delete</span>
        </button>
    </div>
    </Modal>
</template>