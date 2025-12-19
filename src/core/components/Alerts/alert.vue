<script setup>
    import { useAlertStore } from '../../stores/AlertStore';
    const alertControl = useAlertStore();
</script>

<template>
    <div id="alert" class="z-50 absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 p-2 rounded-full w-fit border-[1px] " :class="{'border-green-500 text-green-500 bg-green-100' : alertControl.isSuccess,'border-red-500 text-red-500 bg-red-100' : !alertControl.isSuccess,'active' : alertControl.isShow,'hide' : !alertControl.isShow}">
        <i class="fa-solid text-xl" :class="{'fa-circle-check' : alertControl.isSuccess,'fa-circle-xmark' : !alertControl.isSuccess}"></i>
        <p class="text-sm font-medium">{{alertControl.isSuccess ? alertControl.sucessMessage : alertControl.errorMessage}}</p>
    </div>
</template>



<style>

    #alert.active{
        animation:alert-active .5s linear forwards alternate ;
    }
    #alert.hide{
        animation:alert-unactive .5s linear backwards alternate ;
    }
    @keyframes alert-active {
        from{
            top: 10px;
            opacity: 0;
        }to{
            opacity: 1;
            top: 24px;
        }
    }
    @keyframes alert-unactive {
        from{
            top: 24px;
            opacity: 1;
        }to{
            opacity: 0;
            top: 10px;
        }
    }
</style>