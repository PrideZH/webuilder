<script setup lang="ts">
import { Node } from '../model/Node';
import DragBox from './DragBox.vue';

interface Props {
  node: Node;
  html: string;
  container: any;
}
defineProps<Props>();
</script>

<template>
  <DragBox :box="node" :container="container" >
    <div class="content" v-html="html"></div>
  </DragBox>
</template>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
</style>