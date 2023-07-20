<script>
import router from '../router';
export default {

  async mounted() {
  },
  methods: {

    saveUserN(updatedUserName) {
      this.Username = updatedUserName
      this.$store.dispatch('saveUserN', updatedUserName)
    },
    saveP(updatedPassword) {
      this.Password = updatedPassword
      this.$store.dispatch('saveP', updatedPassword)
    }
    ,
    routeToNextPage() {
      router.push("/usersdata")
    }
  }
  ,
  setup() {
    return {
      Username: "",
      Password: "",
    }
  }
}
</script>

<template>
  <div class="container">
    <div style="margin-top: 150px;">
      <h1>
        WELCOME
      </h1> <br>
      <h2>
        Enter your name and password:
        <br>

      </h2>
      <br>

      NAME: &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<input id="username" @blur="$store.dispatch('saveUserN', this.Username)"
        v-model="Username" />
      <br>
      <br>
      PASSWORD: <input id="password" @blur="$store.dispatch('saveP', this.Password)" v-model="Password" /><br><br>
      <div>
        <button style="margin-left: 27%;" @click="$store.dispatch('onsubmit')">Submit</button>
        <button @click="routeToNextPage"> Show Users Data</button>
      </div>
      <br>
    </div>
  </div>
</template>

<style scoped>
input {
  border: 5px solid rgb(8, 1, 1);
  height: 100%;

  background-color: rgb(227, 235, 236);
}

h1 {
  color: rgb(137, 142, 168);
  background-color: rgb(7, 0, 17);

}

h2 {
  color: rgb(46, 47, 126);
  background-color: rgb(183, 186, 187);
}

.container {
  height: 550px;
  width: 1150px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  color: darkgreen;
  background-color: rgb(18, 41, 33);
  background-image: url("../perf.png")
}

button {
  background: aquamarine;
  padding: 10px;
  border-radius: 15px;
  margin-left: 80px;
}
</style>