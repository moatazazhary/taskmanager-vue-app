<template>
    <div class="loader z-50 absolute top-0 left-0 w-full h-screen overflow-hidden backdrop-blur-xl">
        <div class="relative w-full h-full">
            <div class="absolute top-1/2 left-1/2 -translate-1/2 p-0 m-0 overflow-hidden bg-white border-[1px] border-gray-200 rounded-full w-20 h-1.5">
                <span id="tracker" class="w-10 h-full block rounded-full bg-main"></span>
            </div>
        </div>
    </div>
</template>
<style scoped>
    #tracker{
        animation: tracker .5s linear infinite alternate-reverse;
    }
    @keyframes tracker {
        0%{
            transform: translateX(-100%);
        }
        100%{
            transform: translateX(200%);
        }
    }
</style>
