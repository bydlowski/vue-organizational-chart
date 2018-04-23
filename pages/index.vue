<template>
  <section class="organograma">
    <div class="organograma-container" :style="{ 'width': childNodeAreaSize }">
      <div class="levels">
        <span class="bottom"></span>
        <span 
          v-for="levelObject in firstLevelNodes" 
          :key="levelObject.id" 
          class="level-node organograma-node"
        >{{ levelObject.name }}</span>
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
          <span class="node-area-child organograma-node">{{ secondLevelObject.name }}</span>
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

          <span v-if="thirdLevelObject.name != 'empty'" class="full-node organograma-node">{{ thirdLevelObject.name }}</span>
          <span class="empty-node" v-else></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      levels: [
        {
          name: 'Presidente',
          elements: [
            {
              name: 'VP Finanças',
              elements: [
                {
                  name: 'João'
                },
                {
                  name: 'Carlos'
                },
                {
                  name: 'Roberta'
                }
              ]
            },
            {
              name: 'VP Marketing',
              elements: []
            },
            {
              name: 'VP Vendas',
              elements: [
                {
                  name: 'Paulo'
                },
                {
                  name: 'Andre'
                },
                {
                  name: 'José'
                },
                {
                  name: 'Alberto'
                },
                {
                  name: 'Luis'
                },
                // {
                //   name: 'Caio'
                // },
                // {
                //   name: 'Nelson'
                // }
              ]
            },
            {
              name: 'VP RH',
              elements: [
                {
                  name: 'Fabio'
                },
                {
                  name: 'Bruno'
                },
              ]
            }
          ],
        }
      ],
      firstLevelNodes: [],
      secondLevelNodes: [],
      thirdLevelNodes: []
    }
  },
  created() {
    console.log('Created')
    this.createNodes();
    this.setFirstAndLastChild();
  },
  computed: {
    childNodeAreaSize() {
      // Cada childNode (150) + margens (30)
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
          if (node.elements.length == 0) this.thirdLevelNodes.push({ name: 'empty' });
          node.elements.map((childNode) => {
            childNode['superior'] = node.name;
            this.thirdLevelNodes.push(childNode);
          })
        })
      })
    },
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
        
      })
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
