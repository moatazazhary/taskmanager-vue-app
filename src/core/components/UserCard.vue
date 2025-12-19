<script setup>
    defineProps({
        userName:String,
        gender:String,
        jobTitle:String
    })
</script>
<template>
    <div class="flex items-center gap-2">
        <img class="rounded-full w-16" :src="`/images/${gender === 'Male'? 'indian-male-man-svgrepo-com.svg':'avatar-female-girl-svgrepo-com.svg'}`" alt="">
        <div>
            <h3 class="text-title text-xl font-medium">{{userName}}</h3>
            <p class="text-text text-sm mt-1 font-medium">{{jobTitle}}</p>
        </div>
    </div>
</template>