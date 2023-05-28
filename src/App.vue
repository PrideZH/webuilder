<script setup lang="ts">
import { ref, Ref, reactive } from 'vue';
import NodeContainer from './component/NodeContainer.vue';

import { Node, NodeTemp, Type, SelectInput } from './model/Node';
import template from './model/template';

const mainContainer = ref();

const currentNode: Ref<Node | null> = ref(null);
const nodes: Node[] = reactive([]);

function addNodeHandle(nodeTemp: NodeTemp) {
  nodes.push({
    id: crypto.randomUUID(),
    x: 0,
    y: 0,
    ...nodeTemp
  })
}

/**
 * build html of single node
 * @param node node
 */
function buildhtml(node: Node): string {
  let res: string = '';
  res += '<' + node.element + ' style="';
  res += 'width: 100%; height: 100%;'
  node.styles.forEach((value: string, key: string) => {
    res += key + ": " + value + ";"
  });
  res += '">';
  res += node.content;
  res += '</' + node.element + '>\n';
  return res;
}

function buildHandle() {
  // const documentTemp: Document = window.document.implementation.createHTMLDocument();
  let body: string = '';
  body += '<div style="position: relative; width: 100%; height: 100%; padding: 0; margin: 0;">'
  nodes.forEach((node: Node) => {
    body += `<div style="position: absolute; left: ${100 * node.x / mainContainer.value.clientWidth}%; top: ${node.y}; width: ${100 * node.width / mainContainer.value.clientWidth}%; height: ${node.height};">\n`
    body += buildhtml(node);
    body += '</div>\n'
  });
  body += '</div>\n'
  // documentTemp.body.innerHTML = body;
  console.log(body);
}
</script>

<template>
  <div id="container">
    <div id="nodes-sidebar">
      <button @click="buildHandle"> Build and Print </button>
      <div v-for="item in template">
        <p>{{ item.label }}</p>
        <button v-for="nodeTemp in item.templates" @click="addNodeHandle(nodeTemp)">{{ nodeTemp.label }}</button>
      </div>
    </div>
    <div id="main" ref="mainContainer">
      <NodeContainer
          v-for="node in nodes" :key="node.id"
          :node="node" :container="mainContainer" :html="buildhtml(node)"
          @fetch="n => currentNode = n">
      </NodeContainer>
    </div>
    <div id="node-console">
      <template v-if="currentNode">
        <div>x: {{ currentNode.x }}</div>
        <div>y: {{ currentNode.y }}</div>
        <div>width: {{ currentNode.width }}</div>
        <div>height: {{ currentNode.height }}</div>
        <div>property:</div>
        <div class="params-item" v-for="param in currentNode.params">
          <!-- TODO: v-if="param instanceof InputType" -->
          <template v-if="param.type.type == Type.text">
            <div>{{ param.label }}</div>
            <input style="width: 100%;" :value="param.value" @change="(e: Event) => {
              if (!currentNode) return;
              param.value = (<HTMLInputElement>e.target).value;
              param.handle(currentNode, param.value)
            }">
          </template>
          <template v-else-if="param.type.type == Type.select">
            <div>{{ param.label }}</div>
            <select style="width: 100%;" @change="(e: Event) => {
              if (!currentNode) return;
              param.handle(currentNode, (<HTMLInputElement>e.target).value)
            }">
              <option v-for="option in (<SelectInput>param.type).options" :value="option.value">{{ option.label }}</option>
            </select>
          </template>
        </div>
        <div>event:</div>
      </template>
    </div>
  </div>
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>

<style scoped>
#container {
  display: flex;
  height: 100%;
}

#nodes-sidebar {
  width: 20%;
  min-width: 100px;
  height: 100%;
}

#main {
  flex: 1;
  height: 100%;

  border: 1px solid #666;
  position: relative;
}

#node-console {
  width: 20%;
  min-width: 100px;
  height: 100%;
}

.params-item {
  display: flex;
}
</style>
