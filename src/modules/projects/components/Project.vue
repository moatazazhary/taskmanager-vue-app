<script setup>
    import { useProjectStore } from '../store/ProjectsStore';
    const project = defineProps({
        data:Object
    });
    const projectControl = useProjectStore();

    const projectTasks = projectControl.getProjectTasks(projectControl.ProjectTasksList,project.data.id)
  
</script>
<template>
    <RouterLink :to="`/projects/${project.data.id}`" class="p-6 bg-back border-[1px] rounded-xl border-gray-100 cursor-pointer"  >
        <img class="rounded-xl h-32 w-full object-cover" src="/images/Styles=3.svg" alt="">
        <div class="my-3">
            <h3 class="text-lg text-title font-bold">{{project.data.title}}</h3>
            <div class="flex items-center gap-2">
                <p class="text-[12px] text-text font-semibold">{{ project.data.category }}</p> 
                <span class="text-in-active">|</span>
                <div class="flex items-center gap-2">
                    <p :class="project.data.isUregen ? 'bg-[#feb9b9]':'bg-[#b9cbfe]'" class=" text-back text-[12px] px-2 py-0.5 font-medium rounded-lg text-center" >{{project.data.isUregen ? 'Uregent':'Normal'}}</p>
                    <p v-if="project.data.isCompleted" class="bg-[#b9c9fe] text-back text-[12px] px-2 py-0.5 font-medium rounded-lg text-center" >in process</p>
                </div>
            </div>
        </div>
        <div>
            <p class="text-[16px] text-title font-bold">Progress</p>
            <div class="w-full mt-2 relative">
                <!-- status when project is done -->
                <!-- <span class="relative block rounded-full w-full h-2.5 bg-[#b9c7fe] ">
                    <span  class="absolute block left-0 top-0 h-full w-11/12 bg-green-500 rounded-full">
                        <span id="progress-tracker" class=" relative w-full h-full block">
                        </span>
                    </span>
                </span>
                <span class="absolute -top-8 right-0 text-green-500 font-semibold text-[16px]">90%</span> -->

                <span class="relative block rounded-full w-full h-2.5 bg-[#b9c7fe] ">
                    <span  class="absolute block left-0 top-0 h-full bg-main rounded-full" :style="projectTasks.tasks.length === 0 ? 'width:0%;' : `width:${Math.round(( projectTasks.tasks.filter(t=>t.isCompleted).length / projectTasks.tasks.length)*100)}%;`">
                        <span id="progress-tracker" class=" relative w-full h-full block">
                        </span>
                    </span>
                </span>
                <span class="absolute -top-8 right-0 text-main font-semibold text-[16px]">{{projectTasks.tasks.length === 0 ? 0 : Math.round(( projectTasks.tasks.filter(t=>t.isCompleted).length / projectTasks.tasks.length)*100) }} %</span>
            </div>
        </div>
        <div class="mt-4 flex items-center justify-between">
            <div class=" flex items-center gap-2">
                <!-- status when project is done -->
                <!-- <i class="fa-solid fa-circle-check font-semibold text-green-500"></i>
                <span class="text-[16px] text-green-500 font-bold">Done</span> -->

                <i class="fa-regular fa-clock font-semibold text-text"></i>
                <span class="text-[16px] text-title font-bold">{{ projectControl.diffDate(project.data.startDate,project.data.endDate)}}</span>
            </div>
            <div class="flex flex-row -space-x-3">
                <img v-for="(value, index) in projectTasks.team" class="rounded-full border-2 border-back w-7 h-7" :style="`z-index:${projectTasks.team.length - index }`" src="/images/indian-male-man-svgrepo-com.svg" alt="">
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>
    #progress-tracker::before{
        content: '';
        position:absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        background-color: var(--color-main);
        border-radius: 100%;
        border: 3px solid white;
        height: 18px;
        width:18px;
        box-shadow: 0px 0px 1px rgba(0, 0, 0, .3);
    }
</style>