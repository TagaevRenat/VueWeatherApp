<template>
    <div>
        <SearchBar @citySelected="addCity" />
        <div v-for="city in selectedCities" :key="city.name">
            <CityListCard :city="city" @deleteCity="deleteCity" />
        </div>
        <div v-if="selectedCities.length === 0">Нет отслеживаемых городов</div>
    </div>
</template>
<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar.vue';
import CityListCard from '@/components/UI/CityListCard.vue'
import { onBeforeMount, ref, type Ref } from 'vue';
import type { UserCity } from '@/services/ApiService';
const selectedCities: Ref<UserCity[]> = ref([])


const addCity = (city: UserCity): void => {
    if (selectedCities.value.find(el => el.name === city.name)) return
    selectedCities.value.push(city)
}

const deleteCity = (city: string): void => {
    selectedCities.value = selectedCities.value.filter(el => el.name !== city)
}

onBeforeMount(() => {
    selectedCities.value = JSON.parse(localStorage.getItem('cities') ?? '')
})

window.addEventListener('beforeunload', () => {
    localStorage.setItem('cities', JSON.stringify(selectedCities.value))
});
</script>
<style></style>