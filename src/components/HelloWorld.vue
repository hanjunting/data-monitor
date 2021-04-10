<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <button v-on:click="gotoTest">axios Test</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    
  },
  methods: {
     gotoTest()  {
       var that = this;
        console.log(that);
      console.log('axios sent!');
      axios.get('/api/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=h&fenlei=256&rsv_pq=de9ff4540001c083&rsv_t=08f6TVAU1lVfesMADgZcI16aUouqDPdezw9j65eKwSiAV%2BZUqFQK8rHezDQ&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=4&rsv_sug2=0&rsv_btype=t&inputT=1321&rsv_sug4=1917')
        .then(res => console.log(res.data))
        .catch(res => console.log(res.msg));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
