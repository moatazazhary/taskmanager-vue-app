<script setup>
    import { computed } from 'vue';
import Line from '../../../core/components/Line.vue'
import { useTaskStore } from '../store/TaskStore';

    const taskControl = useTaskStore();
    const props = defineProps({
        tasks:Array
    });

 
    const taskLable = computed(()=>{
    return (task) => {
        if(task.isStarted){
            if(task.isCompleted)
                return 'Completed';
            else
                return 'In Process'
        }else
            return 'Not Started'
        }
    })


    const start = computed(()=>{
        return async (task)=>{
            const {data} = await taskControl.started(task);
            if(data)
                props.tasks.find(t=>t.id == data.id).isStarted = true
        }
    })

     const complete = computed(()=>{
        return async (task)=>{
            const {data} = await taskControl.started(task);
            if(data)
                props.tasks.find(t=>t.id == data.id).isCompleted = true
        }
    })
</script>
<template>
    <div class="mt-10 flex flex-col bg-back rounded-lg shadow-lg shadow-gray-100 px-4 py-2">
        <div class="flex items-center justify-between bg-back rounded-lg shadow-lg shadow-gray-100 px-4 py-2">
            <div class="flex items-center gap-10 px-4 w-auto md:w-full">
                <h2 class=" text-sm text-title font-bold">Tasks</h2>
            
            </div>
            <div class="flex items-center justify-between w-auto md:w-full">
                <span class="text-title text-sm font-bold hidden md:block">Complexity</span>
                <span class="text-title text-sm font-bold hidden lg:block">Priority</span>
                <span class="text-title text-sm font-bold">Status</span>
            </div>
        </div>
        <div v-for="task in props.tasks">
            <div class="py-2 flex items-center justify-between">
                <div class="flex items-center gap-4 w-auto md:w-full">
                    <div v-if="!task.isStarted">
                        <button type="button" @click="start(task)" class="flex items-center gap-2 px-2 text-sm  py-1 outline-none cursor-pointer bg-back rounded-lg text-text hover:text-main transition-colors">
                            <i class="fa-regular fa-paper-plane text-[12px]"></i>
                            <span class="font-medium">Start</span>
                        </button>
                    </div>
                    <div v-if="task.isStarted">
                        <input v-model="task.isCompleted" type="checkbox" hidden name="" id="doneInput">
                        <label @click="complete(task)" for="doneInput" :class="task.isCompleted ? 'bg-main':'bg-hover'" class="w-8 h-8 flex items-center justify-center cursor-pointer  rounded-full border-2 border-main">
                            <i v-if="task.isCompleted" class="fa-solid fa-check text-back"></i>
                        </label>
                    </div>
                    <div>
                        <h3 class="text-title text-[16px] font-medium">{{task.title}}</h3>
                        <p class="text-in-active mt-1 text-[12px] font-medium">{{task.date}}</p>
                    </div>
                </div>
                
                
                <div class="flex items-center justify-between w-auto md:w-full">
                    <p :class="{'bg-[#e8f5e9]':task.complexity === 'Easy','bg-[#ffeda7]':task.complexity === 'Medium','bg-[#fed9b9]':task.complexity === 'Hard','bg-[#fecaca]':task.complexity === 'Critical'}" class="bg-[#fed3b9] text-back text-[12px] px-3 py-1 font-medium rounded-lg text-center hidden md:block" >{{ task.complexity }}</p>
                    <p :class="task.isUregen ? 'bg-[#feb9b9]':'bg-[#b9cbfe]'" class="text-back text-[12px] px-3 py-1 font-medium rounded-lg text-center hidden lg:block" >{{task.isUregen ? 'Uregent':'Not Uregent'}}</p>
                    <p :class="{'bg-[#fed3b9]':taskLable(task) === 'In Process','bg-green-300':taskLable(task) === 'Completed','bg-[#cbcbcb]':taskLable(task) === 'Not Started'}" class=" text-back text-[12px] px-3 py-1 font-medium rounded-lg text-center" >{{ taskLable(task)}}</p>
                </div>
            </div>
            <div class="mb-3">
                <Line></Line>
            </div>
        </div>
    </div>
</template>