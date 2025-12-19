<script setup>
    import card from '../Card.vue'
    import { defineProps } from 'vue';
    import { useModalStore } from '../../stores/ModalStore';
    defineProps({
        nested:Boolean
    });
    const modalControl = useModalStore();
</script>
<template>
    <div class="absolute top-0 left-0 w-full h-full backdrop-blur-xs z-50">
        <div class="relative w-full h-full">
            <div class="absolute top-1/2 left-1/2 bg-none rounded-2xl shadow-xl  -translate-1/2">
                <card>
                    <i @click="modalControl.closeModal(nested)" class="fa-solid fa-xmark absolute top-5 right-5 cursor-pointer text-text hover:text-main transition-colors"></i>
                    <div class="mt-4">
                        <slot></slot>
                    </div>
                </card>
            </div>
        </div>
    </div>
</template>