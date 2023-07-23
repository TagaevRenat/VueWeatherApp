<template>
    <main class="main">
        <SearchBar @citySelected="addCity" />
        <section class="cities">
            <h2 class="cities__title" v-if="selectedCities.length === 0">Нет выбранных городов!</h2>
            <div class="cities__list" v-for="city in selectedCities" :key="city.name">
                <CityListCard :city="city" @deleteCity="deleteCity" />
            </div>
        </section>
    </main>
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
<style>
.main {
    padding: 20px;
    flex-direction: column;
    height: 100vh;
}

.cities__title {
    font-size: 16px;
    margin-top: 10px
}

.cities__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
}

.city-card {
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.city-card__name {
    font-size: 18px;
    margin: 0;
}

.city-card__delete {
    font-size: 14px;
    color: #f86363;
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
}
</style>