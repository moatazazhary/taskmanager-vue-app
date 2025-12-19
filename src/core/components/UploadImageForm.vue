
<!-- 
    TODO: wel be edited later to make width & hight dinamic
-->
<template>
    <div class="flex justify-center flex-col items-center gap-3 border-2 border-main bg-[rgba(40,100,250,.07)] border-dashed rounded-xl h-40 w-72 md:h-52 md:w-96">
        <i class="fa-regular fa-images text-text text-lg"></i>
        <span class=" text-text text-[12px] font-medium">Uplaod images with (1200 x 100)px and 12MB</span>
    </div>
    <!-- TODO: validate span -->
    <div class="mt-4">
        <input type="file" hidden name="" id="upload">
        <label for="upload" class="mt-6 flex items-center justify-center gap-2 font-medium text-sm text-title border-2 w-fit mx-auto border-dashed border-title px-6 py-3 rounded-xl cursor-pointer hover:text-main hover:border-main transition-colors">
            <i class="fa-solid fa-upload"></i>
            <span>Upload Image</span>
        </label>
    </div>
</template>