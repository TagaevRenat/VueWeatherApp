<template>
    <div class="city_card" @click="goToCity">
        <h2 class="city_name">{{ props.city.name }}</h2>
        <button class="delete_button" @click.stop="deleteCity">x</button>
    </div>
</template>
  
<script setup lang="ts">
import type { UserCity } from '@/services/ApiService';
import type { PropType } from 'vue';

const emit = defineEmits(['deleteCity', 'goToCity'])


const props = defineProps({
    city: {
        type: Object as PropType<UserCity>,
        required: true
    }
})

const goToCity = (): void => {
    emit('goToCity', props.city)
}
const deleteCity = (): void => {
    emit('deleteCity', props.city.name)
}
</script>
  
<style scoped>
.city_card {
    width: 300px;
    height: 50px;
    border-radius: 10px;
    background-color: #f5f5f5;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    transition: background-color 0.3s ease;
    margin-bottom: 10px;
}

.city_name {
    font-size: 16px;
    font-weight: bold;
}

.temperature {
    font-size: 20px;
}

.city_card:hover {
    background-color: #e0e0e0;
    cursor: pointer
}

.delete_button {
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.delete_button:hover {
    background-color: #ff4444;
}
</style>