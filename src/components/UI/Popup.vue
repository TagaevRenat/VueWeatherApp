<template>
    <teleport to="body">
        <div v-if="show" class="popup-container">
            <div class="popup" :style="{ backgroundColor: props.color }">
                {{ text }}
            </div>
        </div>
    </teleport>
</template>
  
<script setup lang="ts">
import { ref, onMounted, type PropType } from 'vue';
import { PopupColor } from './popup-color.enum';

const props = defineProps({
    color: {
        type: Object as PropType<PopupColor>,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timeout: {
        type: Number,
        default: 5000
    }
})

const show = ref(true);

onMounted(() => {
    if (props.timeout && props.timeout > 0) {
        setTimeout(() => {
            show.value = false;
        }, props.timeout);
    }
});
</script>
  
<style scoped>
.popup-container {
    position: fixed;
    top: 100px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.popup {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    max-width: 300px;
}

.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9998;
}
</style>