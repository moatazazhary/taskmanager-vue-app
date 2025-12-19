<script setup>
    import Card from '../../../core/components/Card.vue'
</script>
<template>

    <div v-if="true" class="mt-10 flex items-center gap-3 justify-center">
        <i class="fa-solid fa-spinner text-text"></i>
        <p class="text-sm text-text font-medium">Comming Soon...</p>
    </div>

    <div v-else class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card v-for="value in 4">
            <div class="w-fit pb-4 flex items-center gap-3">
                <p v-for="value in 3" class="bg-[#cbcbcb] text-back text-[12px] px-3 py-1 font-medium rounded-lg text-center" >Not started</p>
            </div>
            <img class="w-full h-40 rounded-2xl object-cover" src="/images/original-5d23f3052261513e43c0745b5a7cb870.png" alt="">
            <div class="my-5">
                <h2 class="text-title text-xl font-medium">Creating Awesome Mobile Apps</h2>
                <p class="text-text text-sm font-normal mt-3">Follow the video tutorial above. Understand how to use each tool in the Figma application. Also learn how to make a good and correct design. Starting from spacing, typography, content, and many other design hierarchies. Then try to make it yourself with your imagination and inspiration.</p>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-clock text-text"></i>
                <span class="text-sm text-title font-medium">Deadline : <span class="text-in-active text-[12px]">12 - 19 jul 2025</span></span>
            </div>
            <div class="mt-5 rounded-lg bg-hover w-full p-3 ">
                <div class="flex items-center justify-between cursor-pointer">
                    <div class="flex items-center gap-2">
                        <i class="fa-regular fa-folder text-text"></i>
                        <span class="text-sm text-title font-medium">Files</span>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="flex items-center gap-0.5">
                            <span class="text-sm text-title font-medium">12</span>
                            <i class="fa-regular fa-file-lines text-text"></i>
                        </div>
                        <i class="fa-solid fa-angle-down text-text"></i>
                    </div>
                </div>
                <div v-if="true" class="flex flex-col mt-5 gap-3">
                    <div class="flex items-center justify-between gap-3 p-2 rounded-lg cursor-default hover:bg-hover transition-colors" v-for="value in 3">
                        <div class="flex items-center gap-5">
                            <img class="w-8" src="/icons/Excel.svg" alt="">
                            <h4 class="text-sm font-medium text-title">task-one-details.xlsx</h4>
                            <span class="text-[12px] text-title font-medium">12MB</span>
                        </div>
                        <button class="outline-none border-none text-text text-[12px] font-medium cursor-pointer flex items-center gap-2 hover:text-main transition-colors">
                            <i class="fa-solid fa-download"></i>
                            <span>Download</span>
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>