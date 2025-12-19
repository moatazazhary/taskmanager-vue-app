<script setup>
import sidebar from './core/components/Sidebar.vue'
import navbar from './core/components/Navbar.vue'
import { RouterView } from 'vue-router'

import { useAlertStore } from './core/stores/AlertStore';
import { ref } from 'vue';
import Alert from './core/components/Alerts/alert.vue';
import { useAuthStore } from './core/stores/AuthStore';

  const authControl = useAuthStore()
  const alertControl = useAlertStore();
    const navStatus = ref(false);
    function toggleStatus(){
        navStatus.value = !navStatus.value
        console.log(navStatus.value);
    }
  authControl.loadUser();

</script>

<template>
  <Alert v-if="alertControl.isActive"></Alert>
  <div v-if="!authControl.isLogin">
    <RouterView ></RouterView>
  </div>
  <div v-if="authControl.isLogin" class="flex">
    <sidebar @toggleStatus="toggleStatus" :status="navStatus"></sidebar>
    <div class="w-full">
      <navbar v-if="authControl.userInfo" @toggleStatus="toggleStatus" ></navbar>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>

</style>
