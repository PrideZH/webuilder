<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Box } from '../model/Node';

interface Props {
    node: Box;
    container: any;
}
const props = defineProps<Props>();

const emits = defineEmits(['update:node', 'fetch']);

const target = ref();

let offsetX: number = 0;
let offsetY: number = 0;

function handleMouseDown(event: MouseEvent) {
    offsetX = event.clientX - target.value.offsetLeft;
    offsetY = event.clientY - target.value.offsetTop;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    emits('fetch', props.node);
}

function handleMouseMove(event: MouseEvent) {
    props.node.x = event.clientX - offsetX;
    props.node.y = event.clientY - offsetY;

    target.value.style.left = `${100 * props.node.x / props.container.clientWidth}%`;
    target.value.style.top = `${props.node.y}px`;
}

function handleMouseUp(_event: MouseEvent) {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    
    emits('update:node', props.node);
}

onMounted(() => {
    target.value.style.left = `${100 * props.node.x / props.container.clientWidth}%`;
    target.value.style.top = `${props.node.y}px`;
    target.value.style.width = `${100 * props.node.width / props.container.clientWidth}%`;
    target.value.style.height = `${props.node.height}px`;
})
</script>

<template>
  <div class="node-container" ref="target" @mousedown="handleMouseDown">
    <slot/>
  </div>
  <!-- <div class="stick"></div> -->
</template>

<style scoped>
.node-container {
    position: absolute;
    cursor: pointer;
    border: 1px solid #0000ff33;
}

.node-container:hover {
    border: 1px solid #0000ff;
    border-radius: 4px;
}

/* .stick {
  cursor: nw-resize;
}

.stick:hover::before {
  content: "";
  background-color: #5393ff;
  position: absolute;
  display: block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
}

.stick:hover::after {
  content: "";
  background-color: #5393ff66;
  position: absolute;
  display: block;
  top: -4px;
  left: -4px;
  width: 16px;
  height: 16px;
  border-radius: 8px;
} */
</style>