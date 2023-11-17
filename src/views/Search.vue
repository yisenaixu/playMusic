<template>
 <div>
    {{ query }}
    <mybutton v-slot="{color}">
        this is{{ query  }} {{ color }} button
    </mybutton>
    {{ 
     console.log($store.getters.getListById(1))
     }}
     {{ countA }}
    <button @click="$store.commit('increment',{num:1})">this is {{ count }}  {{ countAlias }}  {{ computedQueryCount }} {{ listLen }}</button>
    <button @click="increment({num:1})">this is {{ count }}  {{ countAlias }}  {{ computedQueryCount }} {{ listLen }}</button>
 </div>
</template>

<script>
import Mybutton from '../components/Mybutton.vue'
import {mapActions, mapMutations, mapState} from 'vuex'
export default {
//   inject: ['message'],
  inject: {
    localMessage: {
        from: 'message',
        default: 'defaule value'
    }
  },
  components: { Mybutton },
  props: ['query'],
  computed: {
    ...mapState({
    count: (state) => state.count,
    countA: state => state.a.countA,
    countAlias: 'count',
    computedQueryCount(state) {
      return state.count+this.query
    }
  }),
  listLen() {
    return this.$store.getters.listLen
  },          
  },
  methods: {
    ...mapActions([
      'increment'
    ]),
    // ...mapMutations([
    //   'increment'
    // ])
  },
  created() {
    console.log(this.localMessage);
  }
 }
</script>