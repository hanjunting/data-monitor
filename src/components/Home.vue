<template>
  <div>
    <!-- <button v-on:click="gotoTest">test mock data</button> -->
    <Navbar></Navbar>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  mounted() {
    
  },
  methods: {
     gotoTest()  {
      //  var that = this;
      //   console.log(that);
      console.log('axios sent!');
      axios({
        method: 'POST',
        url: '/beginData',
        data: this.inputData,
      }).then(res => console.log(res.data))
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
