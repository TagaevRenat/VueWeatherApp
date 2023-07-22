<template>
    <div class="container" v-if="Object.keys(localWeather).length !== 0">
        <h2>{{ city.name }}</h2>
        <h4>Температура воздуха {{ localWeather.main.temp }}</h4>
    </div>
</template>
<script setup lang="ts">
import { ApiService, type WeatherResponse } from '@/services/ApiService';
import { useCityStore } from '@/store/cityStore';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const apiService = new ApiService()
const router = useRouter();
const cityStore = useCityStore()

const city = cityStore.getSelectedCity()
const localWeather = ref(<WeatherResponse>{})

const loadWeather = async (): Promise<void> => {
    localWeather.value = await apiService.getWeatherInfo(city);
};

onBeforeMount(async () => {
    await loadWeather()
})
</script>
<style></style>