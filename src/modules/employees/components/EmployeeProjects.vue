<script setup>
    import Line from '../../../core/components/Line.vue'
    const props = defineProps({
        projects:Array
    })

</script>
<template>

    <div class="px-10">
        <div v-if="!props.projects.length" class="flex items-center gap-3">
            <p class="text-sm text-text font-medium">No projects yeat...</p>
        </div>

        <div v-else v-for="project in props.projects" class="p-6 mt-3 rounded-lg shadow-lg shadow-gray-100 ">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-title text-lg font-medium">{{project.title}}</h3>
                    <p class="text-[12px] text-text font-semibold">{{project.category}}</p> 
                </div>
                <div class="flex items-center gap-2">
                    <p class=" text-back text-[12px] px-2 py-0.5 font-medium rounded-lg text-center" :class="project.isUregen ? 'bg-[#feb9b9]':'bg-[#b9c9fe]'" >{{project.isUregen ? 'Uregent':'Not Uregent'}}</p>
                    <p class="text-back text-[12px] px-2 py-0.5 font-medium rounded-lg text-center" :class="project.isCompleted ? 'bg-green-100':'bg-[#fed3b9]'" >{{project.isCompleted ? 'Completed':'In Process'}}</p>
                </div>
            </div>
            <div class="mt-7">
                <p class="text-[16px] text-title font-medium">Employee Tasks</p>
                <div class="w-full mt-4 relative">
                    <!-- status when project is done -->
                    <!-- <span class="relative block rounded-full w-full h-2.5 bg-[#b9c7fe] ">
                        <span  class="absolute block left-0 top-0 h-full w-11/12 bg-green-500 rounded-full">
                            <span id="progress-tracker" class=" relative w-full h-full block">
                            </span>
                        </span>
                    </span>
                    <span class="absolute -top-8 right-0 text-green-500 font-semibold text-[16px]">90%</span> -->

                    <span class="relative block rounded-full w-full h-2 bg-[#b9c7fe] ">
                        <span  class="absolute block left-0 top-0 h-full bg-main rounded-full" :style="project.tasks.length > 0 ? `width:${((project.tasks.filter(t=>t.isCompleted).length)/(project.tasks.length))*100}%;`:'width:0%'">
                            <span id="progress-tracker" class=" relative w-full h-full block">
                            </span>
                        </span>
                    </span>
                    <span class="absolute -top-8 right-0 text-in-active font-medium text-sm">{{project.tasks.filter(t=>t.isCompleted).length}}/{{project.tasks.length}}</span>
                </div>
            </div>
        </div>
    </div>
</template>