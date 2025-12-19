<script setup>
import { computed } from 'vue';
import { useTaskStore } from '../../tasks/store/TaskStore';

const taskControl = useTaskStore();

    const employee = defineProps({
        data:Object
    })
    const tasksCount = computed(()=>{
        return (id)=>{
            return taskControl.tasksList?.filter(t=>t.assignedId==id).length;
        }
    })
    const truncateText = computed(()=>{
        if(!employee.data.about)
            return '';
        const words = employee.data.about.trim().split(/\s+/)
        if(words.length <= 10)
            return employee.data.about
        return words.slice(0,10).join(' ')+'...'
    })

</script>
<template>
    <div class="rounded-xl border-[1px] border-gray-200  bg-back p-6">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <img class="rounded-full w-16" :src="`/images/${employee.data.gender === 'Male'? 'indian-male-man-svgrepo-com.svg':'avatar-female-girl-svgrepo-com.svg'}`" alt="">
                <div>
                    <h3 class="text-title text-xl font-medium">{{ employee.data.firstName +" "+ employee.data.lastName }}</h3>
                    <div class="mt-1 flex items-center gap-2">
                        <p class="text-text text-sm  font-medium">{{employee.data.jobTitle}}</p>
                        <!-- in mentor tab --> 
                        <span v-if="employee.data.role === 'Mentor'" class="text-in-active">|</span>
                        <p v-if="employee.data.role === 'Mentor'" class="bg-[#feb9b9] text-back text-[12px] px-2 py-0.5 font-medium rounded-lg text-center" >mentor</p>
                    </div>
                </div>
            </div>
            <router-link :to="`/profile/${employee.data.id}`" class="text-main text-[16px] font-medium" href="javascript:;">View</router-link>
        </div>
        <p class="text-in-active text-[16px] my-6 font-medium">{{truncateText}}</p>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-clone text-title"></i>
                <span class="text-title text-[16px] font-semibold">{{ tasksCount(employee.data.id) }} Tasks</span>
            </div>
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-star text-yellow-300"></i>
                <span class="text-title text-[16px] font-semibold">4,5 (30 Reviews)</span>
            </div>
        </div>
    </div>
</template>