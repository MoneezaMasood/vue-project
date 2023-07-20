<script >
import axios from 'axios';
import swal from 'sweetalert';
import { reactive, computed } from 'vue';
import router from '../router';
import miniform from "../views/mini_form.vue"
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    miniform
  },

  setup() {
    const store = useStore()
    const originalValue = ref(5);

    // Computed property
    const computedValue = computed(() => {
      // Perform some computation based on originalValue
      return originalValue.value * 2.2;
    });
    const count = ref(0)
    const first_name = ref('moneeza')
    console.log("ref value", first_name)
    console.log("count: ", count)
    return reactive({
      computedValue,
      originalValue,
      newcomp: "",
      showcomp: "",
      users: "",
      comp1: "",
      comp2: "",
      showData: false,
      count,
      FishName: "",
      FishType: "",
      Username: "",
      firstname: "moneeza",
      message: "",
      lastname: "masood",
      qualification: "",
      show: false,
      Password: "",
      childName: "child",
      ID: "",
      data: "",
      Pass: "",
      first_name,
      myObject: [{
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      },
      ],
      LastName: "",
      FirstName: "",
      showStoreUser: "",
      showResult: computed(() => store.getters.getResult)

    })
  },

  watch: {
    message(newval, oldval) {
      console.log("new value", newval)
      console.log("old value", oldval)
    }
  }
  ,
  methods:
  {
    HideDBdata() {
      this.showData = false
    },

    checkSetTimeout() {
      console.log("Before setTimeout");

      setTimeout(function () {
        swal({
          title: "Auto close alert!",
          text: "I will close in 2 seconds.",
          timer: 2000
        });
      }, 1000);
    }
    ,
    submitChildData() {
      alert("child data submitted")
    },
    savename(updatedname) {
      console.log(updatedname)
      this.childName = updatedname
    },
    goToMiniProject() {
      router.push("/home")
    },
    saveID(updatedID) {
      console.log(updatedID)
      this.ID = updatedID
    },
    savePassword(updatedpass) {
      this.Password = updatedpass
      this.$store.dispatch("savePassword", updatedpass)
    },
    saveUsername(updatedUser) {
      this.Username = updatedUser
      this.$store.dispatch("saveUsername", updatedUser)
    },
    PushToProfile() {
      router.push("profile")
    },
    PushToAnotherPage() {
      router.push("new")
    }
    ,
    read() {
      this.showData = true;
      axios.get('http://localhost:3000/data').then(({ data }) => {
        console.log(data)
        this.users = data;
      })
        .catch((err) => console.error(err));
    },
    async postDbdata() {

      const payloadset = {
        FishName: this.FishName,
        FishType: this.FishType
      };
      let response = await axios.post("http://localhost:3000/fishes", payloadset)
      console.log("response post", response);

    },
    saveFirstName(updatedFirstName) {
      this.FirstName = updatedFirstName
      this.$store.dispatch("saveFirstName", updatedFirstName)
    },
    saveLastName(updatedLastName) {
      this.LastName = updatedLastName
      this.$store.dispatch("saveLastName", updatedLastName)
    },
    savecomp1(updatedcomp1) {
      this.comp1 = updatedcomp1
      this.$store.dispatch("savecomp1", updatedcomp1)
    },
    savecomp2(updatedcomp2) {
      this.comp2 = updatedcomp2
      this.$store.dispatch("savecomp2", updatedcomp2)
    },
    plusFtn() {
      this.showcomp = true
      this.$store.dispatch("plusFtn")
    },
    postStoreData() {
      if (this.first_name == "" || this.last_name == "") { alert("Kindly enter data in all fields") }
      else {
        this.showStoreUser = this.$store.state.userData.first_name + " " + this.$store.state.userData.last_name
      }
    }
  }

  ,


  computed: {
    fullname() {
      return this.firstname + this.lastname
    }
  },
  async mounted() {
    console.log("store", this.$store.getters.getUserData),
      this.$store.dispatch("axios_get")
  },
}
</script>

<template>
  <div style="color: black;">
    <div>
      <button @click="goToMiniProject">Mini Project</button>
      <div>
        <!-- //---------------------------------------- -->
        <h1 style="font-weight: bold;">
          Two way Data binding
        </h1>

        NAME: <input @blur="saveUsername(this.Username)" ref="username" v-model="Username" />
        <br>
        PASSWORD: <input @blur="savePassword(this.Password)" v-model="Password" /><br>
        <div>
          <label>QUALIFICATION: </label>
          <select v-model="qualification">
            <option>Student</option>
            <option>Bachelors</option>
            <option>Masters</option>
          </select>

        </div>
        <div>

          <button @click="onsubmit">Submit</button>
          <br><br>
        </div>
        <h1 style="font-weight: bold;">Display Data</h1>
        <p>User Name : {{ Username }}</p>
        <div>Qualification: {{ qualification }}</div>
        <div>Password : {{ Password }}</div>

        <div>
        </div>
        <br>
      </div>
      <!-- //---------------------------------------- -->
      <h1 style="font-weight: bold;">
        Props and Events Handling
      </h1>

      <miniform :name="childName" :ID="ID" @submitChildData="submitChildData" @savename="savename" @saveID="saveID"
        @PushToProfile="PushToProfile" />
    </div>
    <!-- //---------------------------------------- -->
    <br><br>

    <h1 style="font-weight: bold;">List Rendering</h1>
    <li v-for="(value, index) in myObject" :key="index">
      {{ value.title }}<br>
      {{ value.author }}<br>
      {{ value.publishedAt }}<br>

    </li>



    <br>
    <!-- //---------------------------------------- -->
    <h1 style="font-weight: bold;">
      Watchers
      <br>
    </h1>
    watcher message: <br><input type="text" v-model="message">
    {{ message }}
    <br>
    enter data in box and
    check console to see how <br> the value updates
    <br><br>

    <!-- //---------------------------------------- -->
    <h1 style="font-weight: bold;">
      Template Refs
      <br>
    </h1>

    First Name:
    {{ first_name }}
    <button @click="count++">You clicked me {{ count }} times.</button>
    <br> <br>

    <!-- //---------------------------------------- -->
    <div>
      <h1 style="font-weight: bold;">
        Setting Timeout
      </h1>

      Click to set timeout
      <br>
      <button @click="checkSetTimeout()">click</button>
      <br><br>
    </div>
    <!-- //---------------------------------------- -->
    <h1 style="font-weight: bold;">
      Routing
    </h1>
    <button @click="PushToAnotherPage">Push To Another Page</button>
    <br><br>
    <h1 style="font-weight: bold;">Conditional Rendering</h1>


    <input type="Pass" v-model="Pass" placeholder="Enter your password" />
    <p v-if="Pass.length > 6">Strong Password</p>
    <p v-else>Weak Password</p>


    <h1 style="font-weight: bold;">
      Computed Properties
    </h1>
    <div>
      computed full name: {{ fullname }}
    </div>
    <h1 style="font-weight: bold;">Displaying data from db through axios</h1>
    <button @click="read">Show Data</button>
    <button @click="HideDBdata">Hide db data</button>


    <div v-if="showData">
      <h1 style="font-weight: bold;"> DB Data</h1>
      <div>
        <span style="font-weight: bold;"> Username</span>
        <span style="font-weight : bold; margin-left: 11%;"> Password</span>
        <span style="font-weight : bold; margin-left: 10%;"> ID</span>
      </div>
      <br><br>
      <div class="DbData" v-for="(value, index) in users" :key="index">

        <span>{{ value.username }}</span>
        <span>{{ value.password }}</span>
        <span>{{ value.id }}</span>

      </div>

    </div>
    <div>
      Fish name: <input v-model="FishName">
      Fish type: <input v-model="FishType">
      <button @click="postDbdata"> Post </button>
    </div>
    <h1 style="font-weight: bold;">Computed Values</h1>
    <div>
      <p>Original value in kg: {{ originalValue }}</p>
      <p>Computed value in pounds: {{ computedValue }}</p>
    </div>
    <div>
      <h1 style="font-weight: bold;">Vuex</h1>
      <h2>Task 1</h2>
      First Nmae: <input @blur="saveFirstName(this.FirstName)" v-model="FirstName">
      Last Name: <input @blur="saveLastName(this.LastName)" v-model="LastName">
      <button @click="postStoreData"> Post </button>
      <!-- <p>Your Name Posted in Store: {{ showStoreUser }}</p> -->
      <h2>Task 2</h2>

    </div>
    <div>
      <input @blur="savecomp1(this.comp1)" v-model="comp1">
      +
      <input @blur="savecomp2(this.comp2)" v-model="comp2">

      <button @click="plusFtn">=</button>
      <span v-if="showcomp">
        {{ showResult }}</span>

    </div>
    <h2>Task 3</h2>
    <button @click="$store.dispatch('inc')">+</button>
    <button @click="$store.dispatch('dec')">-</button>
    <br>
    {{ this.$store.state.counter }}
    

  </div>
</template>

<style>
.DbData {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto)
}
</style>