<template>
    <div class="container">
        <h4 id="temp">{{ WeatherStatus[convertedCurrentWeather?.weathercode ?? 0] }}</h4>
        <img :src="iconPath" alt="" id="weatherIcon">
        <h1 id="title">{{ city.name }}</h1>
        <h2 id="temp">{{ convertedCurrentWeather?.temperature_2m }} °C </h2>
        <!-- <h4>Скорость ветра {{ convertedCurrentWeather?.wind_speed }}</h4> -->
        <!-- <br>
        <h4>{{ weatherForecast }}</h4>
        <button>
            <router-link to="/">Go to Home</router-link>
        </button> -->
    </div>
</template>
<script setup lang="ts">
import { WeatherStatus } from '@/components/weatherStatus';
import { WeatherStatusIcons } from '@/components/weatherStatusIcon';
import { ApiService } from '@/services/ApiService';
import { ForecastConverter, type CurrentWeather, type ConvertedForecast } from '@/services/ForecastConverter';
import { useCityStore } from '@/store/cityStore';
import { computed, onBeforeMount, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';

const apiService = new ApiService()
const forecastConverter = new ForecastConverter()
const router = useRouter();
const cityStore = useCityStore()
const forecastRange = 3
const currentHour = new Date().getHours()
const dayNight = currentHour > 6 && currentHour < 18 ? 0 : 1

const iconPath = computed(() => {
    const path = WeatherStatusIcons[convertedCurrentWeather.value?.weathercode ?? 0]
    if (Array.isArray(path)) return '/src/assets/icons/' + path[dayNight]
    else {
        return '/src/assets/icons/' + path
    }
})

const city = cityStore.getSelectedCity()
const weatherForecast: Ref<ConvertedForecast[]> = ref([])
const convertedCurrentWeather: Ref<CurrentWeather | null> = ref(null)
const loadWeatherData = async (): Promise<void> => {
    const weatherForecastResponse = await apiService.getWeatherForecast(city)
    if (weatherForecastResponse) {
        convertedCurrentWeather.value = forecastConverter.getCurrentWeather(weatherForecastResponse)
        weatherForecast.value = forecastConverter.convertForecast(weatherForecastResponse, forecastRange)
    }
}

onBeforeMount(async () => {
    await loadWeatherData()
})
</script>
<style scoped>
#weatherIcon {
    width: 200px;
    height: 200px;
}

#title {
    font-weight: bold;
    font-size: 30px
}

#temp {
    font-weight: bold;
    font-size: 40px
}
</style>