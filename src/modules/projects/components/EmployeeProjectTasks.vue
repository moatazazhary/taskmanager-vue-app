<script setup>
    import userCard from '../../../core/components/UserCard.vue'
    import Line from '../../../core/components/Line.vue'

    const props = defineProps({
        employee:Object
    })

</script>
<template>
    <div class="w-92" v-for="employee in props.employee.data">
        <userCard :userName="`${employee.firstName}  ${employee.lastName}`" :gender="employee.gender" :jobTitle="employee.jobTitle"></userCard>
        <Line></Line>
        <div class="mt-5">
            <h3 class="text-title text-xl font-medium">Tasks</h3>
            <div class="flex flex-col gap-3 mt-4">

                <div class="flex items-center justify-between cursor-default p-2" v-for="task in employee.tasks">
                    <div class="flex items-center gap-2">
                        <i class="" :class="task.isCompleted ? 'fa-solid fa-circle-check text-green-500':'fa-regular fa-clock text-text'"></i>
                        <p class="text-sm text-text font-normal">{{ task.title }}</p>
                    </div>
                    <span class="text-title text-[12px] font-medium">{{task.date ? task.date :'not yet'}}</span>
                </div>
            </div>
        </div>
    </div>

</template>

