<script setup lang="ts">
import { ref, Ref, reactive } from 'vue';
import NodeContainer from './component/NodeContainer.vue';

import { Node, NodeTemp, TextNode, StyleItem } from './model/Node';

const mainContainer = ref();

const nodeTemps: NodeTemp[] = [
  { label: 'Text', width: 256, height: 32, element: 'div', html: 'text', styles: [] },
  { label: 'Button', width: 128, height: 44, element: 'button', html: 'button', styles: [] },
  { label: 'Input', width: 256, height: 44, element: 'input', html: '', styles: [] }
]

const currentNode: Ref<Node | null> = ref(null);
const nodes: Node[] = reactive([
  // { id: crypto.randomUUID(), x: 0, y: 0, width: 100, height: 100, element: 'div', html: '123', styles: [
  //   { key: 'background-color', value: 'blue' }
  // ] },
  // { id: crypto.randomUUID(), x: 400, y: 200, width: 100, height: 20, element: 'input', html: '', styles: [] },
  // { id: crypto.randomUUID(), x: 200, y: 200, width: 100, height: 44, element: 'button', html: 'Login', styles: [
  //   { key: 'border-radius', value: '32px' }
  // ] }
]);

function addNodeHandle(nodeTemp: NodeTemp) {
  nodes.push({
    id: crypto.randomUUID(),
    x: 0,
    y: 0,
    ...nodeTemp
  })
}

function buildhtml(node: Node): string {
  let res: string = '';
  res += '<' + node.element + ' style="';
  res += 'width: 100%; height: 100%;'
  node.styles.forEach((style: StyleItem) => {
    res += style.key + ": " + style.value + ";"
  });
  res += '">';
  res += node.html;
  res += '</' + node.element + '>\n';

  // 属性拓展
  if (node.element == 'text') {
    node = <TextNode> node;
  } else if (node.element == 'button') {
  }

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

      <button v-for="nodeTemp in nodeTemps" @click="addNodeHandle(nodeTemp)">{{ nodeTemp.label }}</button>
    </div>
    <div id="main" ref="mainContainer">
      <NodeContainer
          v-for="node in nodes" :key="node.id"
          :node="node" :container="mainContainer"
          @fetch="n => currentNode = n"
          v-html="buildhtml(node)">
      </NodeContainer>
    </div>
    <div id="node-console">
      <div>x: {{ currentNode?.x }}</div>
      <div>y: {{ currentNode?.y }}</div>
      <div>width: {{ currentNode?.width }}</div>
      <div>height: {{ currentNode?.height }}</div>
      <div>property:</div>
      <div>style:</div>
      <div>event:</div>
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
</style>
