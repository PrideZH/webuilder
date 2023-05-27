<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { Box } from '../model/Node';

interface Props {
  box: Box;
  container: HTMLElement;
  strategy?: (box: Box) => Box; // 扩展接口
}
const props = defineProps<Props>();

const emits = defineEmits(['update:box']);

const target = ref();
const stick = ref();

const STICK_WIDTH: number = 4;
const STICK_HEIGHT: number = 4;

const currentBox: Ref<Box> = ref({
    x: 0,
    y: 0,
    width: 0,
    height: 0
})

class MoveEvents {
  static offsetX: number = 0;
  static offsetY: number = 0;

  static handleMouseDown(event: MouseEvent) {
    MoveEvents.offsetX = event.clientX - target.value.offsetLeft;
    MoveEvents.offsetY = event.clientY - target.value.offsetTop;

    document.addEventListener('mousemove', MoveEvents.handleMouseMove);
    document.addEventListener('mouseup', MoveEvents.handleMouseUp);
  }

  static handleMouseMove(event: MouseEvent) {
    currentBox.value.x = event.clientX - MoveEvents.offsetX;
    currentBox.value.y = event.clientY - MoveEvents.offsetY;

    currentBox.value.x = Math.min(Math.max(currentBox.value.x, 0), props.container.clientWidth - currentBox.value.width);
    currentBox.value.y = Math.min(Math.max(currentBox.value.y, 0), props.container.clientHeight - currentBox.value.height);

    if (props.strategy) {
        currentBox.value = props.strategy(currentBox.value);
    }

    refresh();
  }

  static handleMouseUp(_event: MouseEvent) {
    document.removeEventListener('mousemove', MoveEvents.handleMouseMove);
    document.removeEventListener('mouseup', MoveEvents.handleMouseUp);
    
    emits('update:box', currentBox.value);
  }
}

class ResizeEvents {
  static sourceWidth: number = 0;
  static sourceHeight: number = 0;
  static sourceX: number = 0;
  static sourceY: number = 0;

  static handleMouseDown(event: MouseEvent) {
    ResizeEvents.sourceWidth = currentBox.value.width;
    ResizeEvents.sourceHeight = currentBox.value.height;

    ResizeEvents.sourceX = event.clientX;
    ResizeEvents.sourceY = event.clientY;

    document.addEventListener('mousemove', ResizeEvents.handleMouseMove);
    document.addEventListener('mouseup', ResizeEvents.handleMouseUp);
  }

  static handleMouseMove(event: MouseEvent) {
    currentBox.value.width = Math.max(ResizeEvents.sourceWidth + event.clientX - ResizeEvents.sourceX, 4);
    currentBox.value.height = Math.max(ResizeEvents.sourceHeight + event.clientY - ResizeEvents.sourceY, 4);

    if (currentBox.value.x + currentBox.value.width > props.container.clientWidth) {
        currentBox.value.width = props.container.clientWidth - currentBox.value.x;
    }
    if (currentBox.value.y + currentBox.value.height > props.container.clientHeight) {
        currentBox.value.height = props.container.clientHeight - currentBox.value.y;
    }

    if (props.strategy) {
        currentBox.value = props.strategy(currentBox.value);
    }

    refresh();
  }

  static handleMouseUp(_event: MouseEvent) {
    document.removeEventListener('mousemove', ResizeEvents.handleMouseMove);
    document.removeEventListener('mouseup', ResizeEvents.handleMouseUp);
    
    emits('update:box', currentBox.value);
  }
}

function refresh() {
  target.value.style.left = `${currentBox.value.x}px`;
  target.value.style.top = `${currentBox.value.y}px`;
  target.value.style.width = `${currentBox.value.width}px`;
  target.value.style.height = `${currentBox.value.height}px`;

  stick.value.style.left = `${currentBox.value.x + currentBox.value.width - STICK_WIDTH / 2}px`;
  stick.value.style.top = `${currentBox.value.y + currentBox.value.height - STICK_HEIGHT / 2}px`;
  stick.value.style.width = `${STICK_WIDTH}px`;
  stick.value.style.height = `${STICK_HEIGHT}px`;
}

onMounted(() => {
  currentBox.value.x = props.box.x;
  currentBox.value.y = props.box.y;
  currentBox.value.width = props.box.width;
  currentBox.value.height = props.box.height;

  refresh();
})
</script>

<template>
  <div class="drag-container" ref="target" @mousedown="MoveEvents.handleMouseDown">
    <slot/>
  </div>
  <div class="stick" ref="stick" @mousedown="ResizeEvents.handleMouseDown"></div>
</template>

<style scoped>
.drag-container {
  position: absolute;
  cursor: pointer;
  border: 1px solid #0000ff33;
}

.node-container:hover {
  border: 1px solid #0000ff;
  border-radius: 4px;
}

.stick {
  position: absolute;
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
</style>