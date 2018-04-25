<template>
  <section class="organograma">
    <div class="organograma-container" :style="{ 'width': chartAreaSize }">
      <div class="levels">
        <span class="bottom"></span>
        <div 
          v-for="levelObject in firstLevelNodes" 
          :key="levelObject.id" 
          class="level-node organograma-node"
        >
          <p>{{ levelObject.name }}</p>
          <p>{{ levelObject.position }}</p>
        </div>
      </div>
      <div class="nodes">
        <div 
          v-for="(secondLevelObject, index) in secondLevelNodes" 
          :key="secondLevelObject.id" 
          :style="{ 'width': (secondLevelObject.elements.length * (150 + 30)) - 30  + 'px'}"
          class="node-area"
        >
          <span class="top"></span>
          <span v-if="secondLevelNodes.length == 1"></span>
          <span v-else-if="index == 0" class="top-right-big"></span>
          <span v-else-if="index == secondLevelNodes.length - 1" class="top-left-big"></span>
          <span v-else class="top-sides-big"></span>
          <span></span>
          <span :class="{ 'bottom': secondLevelObject.elements.length }"></span>
          <div class="node-area-child organograma-node">
            <p>{{ secondLevelObject.name }}</p>
            <p>{{ secondLevelObject.position }}</p>
          </div>
        </div>
      </div>
      <div class="child-nodes">
        <div 
          v-for="thirdLevelObject in thirdLevelNodes" 
          :key="thirdLevelObject.id" 
          class="child-node-area"
        >
          <span class="top"></span>
          <span :class="linesClass(thirdLevelObject)"></span>
          <span :class="{ 'bottom-left': thirdLevelObject.elements.length }"></span>
          <div v-if="thirdLevelObject.name != 'empty'" class="full-node organograma-node">
            <p>{{ thirdLevelObject.name }}</p>
            <p>{{ thirdLevelObject.position }}</p>
          </div>
          <span class="empty-node" v-else></span>
        </div>
      </div>
      <div class="last-nodes">
        <div 
          v-for="forthLevelObject in forthLevelNodes" 
          :key="forthLevelObject.id" 
          class="last-node-area"
        >
          <div v-if="forthLevelObject.name != 'empty'">
            <div v-for="forthLevelNode in forthLevelObject.children" :key="forthLevelNode.id" class="full-last-node organograma-node">
              <span class="left-left"></span>
              <span :class="[ (forthLevelNode.last) ? 'left-bottom' : 'left-middle' ]"></span>
              <p>{{ forthLevelNode.name }}</p>
              <p>{{ forthLevelNode.position }}</p>
            </div>
          </div>
          <span class="empty-last-node" v-else>
            <!-- <p>{{ forthLevelObject.name }}</p> -->
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import chart from '@/assets/files/completeChart'

export default {
  data() {
    return {
      levels: chart,
      firstLevelNodes: [],
      secondLevelNodes: [],
      thirdLevelNodes: [],
      forthLevelNodes: []
    }
  },
  created() {
    console.log('Created')
    this.createNodes();
  },
  computed: {
    chartAreaSize() {
      // Calcular tamanho total do organograma - cada childNode (150) + margens (30)
      let childNodeSizes = this.thirdLevelNodes.length * (150 + 30);
      return childNodeSizes + 'px';
    }
  },
  methods: {
    // Função para ver o objeto levels e criar os diferentes níveis/nodes
    createNodes() {
      this.levels.map((level) => {
        this.firstLevelNodes.push(level);
        level.elements.map((node) => {
          this.secondLevelNodes.push(node);
          if (node.elements.length == 0) this.thirdLevelNodes.push({ name: 'empty', elements: [] });
          node.elements.map((childNode) => {
            childNode['superior'] = node.name;
            this.thirdLevelNodes.push(childNode);
          });
        });
      });
      this.createLastLevels();
    },
    createLastLevels() {
      let list = this.thirdLevelNodes;
      list.map((node) => {
        if (node.elements.length == 0) {
          this.forthLevelNodes.push({ name: 'empty' });
        } else {
          this.forthLevelNodes.push({ name: 'full', children: node.elements });
        }
      });
      this.setFirstAndLastChild();
    },
    // Função para adicionar ao objeto se ele é o primeiro ou últimos, para arrumar as linhas em cima das caixas
    setFirstAndLastChild() {
      let previousSuperior = '';
      this.thirdLevelNodes.map((node, index) => {
        if (index == 0) {
          node['first'] = true;
          previousSuperior = node.superior;
        } else if (node.superior != previousSuperior) {
          this.thirdLevelNodes[index - 1]['last'] = true;
          node['first'] = true;
          previousSuperior = node.superior;
        } else if (index == (this.thirdLevelNodes.length - 1)) {
          node['last'] = true;
        } else {
          node['middle'] = true;
        }
      });
      this.forthLevelNodes.map((node, index) => {
        if (node.name != 'empty') {
          console.log(node)
          let childNodeLength = node.children.length;
          node.children.map((childNode, index) => {
            (index == (childNodeLength - 1)) ? childNode['last'] = true : childNode['middle'] = true;
          });
        };
      });
    },
    linesClass(node) {
      if (node.name != 'empty') {
        if (node.first && node.last) {
          return 'top-top'
        } else if (node.first) {
          return 'top-right'
        } else if (node.last) {
          return 'top-left'
        } else {
          return 'top-sides'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./index.scss";
</style>
