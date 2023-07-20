<script>
import axios from 'axios';
import image from "../logo.png"
import { reactive } from 'vue';
import router from "../router/index"

export default {
  
  // name: 'Profile',
  computed: {
    getTabSpace() {
      return '&nbsp;&nbsp;&nbsp;&nbsp;'; // Four spaces represented by HTML entity
    }
  },
  mounted() {
    // alert("mounted")
    axios
      .get('http://localhost:3000/users')
      .then((response) => {
        console.log(response.data[0].Username)
        this.users=response.data
        this.Fname = response.data[0].Fname
        this.Lname=response.data[0].Lname
        this.mobileNo=response.data[0].mobileNo
        this.qualification=response.data[0].qualification
        this.Gender=response.data[0].Gender
        this.CNIC=response.data[0].CNIC
     
      })
  }
,
  methods: {
    displayimg() {
      return {
        image: image
      }
    },
    disableInput() {
  var inputElement = document.getElementById("myInput");
  inputElement.disabled = true;
},

    async check() {

  //     if (this.Fname == "" || this.Lname == "" || this.mobileNo == "" || this.Gender == "" && (result.status != 201)) { swal("error") }
  //     else {

  //       swal(this.Fname + " successfully logged in")
	// }
      router.push("/home")
      }
    },
  setup() 
  {

    return reactive({
      users:[],   
      Fname: "",
      Lname: "",
      Gender: "",
      CNIC: "",
      mobileNo: "",
      qualification: ""
    // }
  })
  }

}
</script>

<template>
  <div class="container" >

    <br><br>
    <img src="logo.png" alt="" width="200" height="200">
    <br>
   YOUR CREDENTIALS:
    <br><br>
    <div class="NAME" >
      Enter First Name: <input disabled="disabled" id="Fname" v-model="this.Fname" /><br><br>

      Enter Last Name: <input disabled="disabled" id="Lname"  v-model="this.Lname" /><br><br>
    </div>
    <div class="CNIC">
      Enter CNIC: <input disabled="disabled" id="CNIC" 
        v-model="this.CNIC" /><br><br>
    </div>
    <div class="Gender" >

      <div>Choose Gender:
        {{  }}</div><br>
      
      <input class="a" disabled="disabled" type="radio" id="male" name="gender" value="male" v-model="this.Gender" />
      <label for="male">male  &nbsp;</label>

      <input class="a" disabled="disabled" type="radio" id="female" name="gender" value="female"
        v-model="Gender" />
      <label for="female">female</label>
      <br><br>
    </div>
    <div class="MobileNo">
      Mobile no: <input disabled="disabled" id="MobileNo"
        v-model="this.mobileNo" /><br><br>
    </div>
    <div class="QA">
      <label style="margin-right:115px">qualification: </label>
      <select disabled="disabled" class="QA" name="qualification"  v-model="qualification">
        <option>Student</option>
        <option>Bachelors</option>
        <option>Masters</option>
      </select>

    </div>
    <br>
    <button @click="check">Back to home page</button>

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
  /* padding-left:1rem; 
  padding-right: 1rem;  */
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
.container {
  height:55rem;
  width:75rem;
  color: rgb(8, 7, 5);
  background-image: url("../perf.png");
}

img {
  border-radius: 50%;
}

.CNIC {
  color: rgb(22, 2, 2);
  margin-left: 2.8%;
  text-align: center;
}

.name {
  color: rgb(8, 1, 1);
}

.Gender {
  color: rgb(7, 0, 0);
  position: relative;
  right: 91px;
}

.MobileNo {
  color: rgb(5, 1, 1);
  text-align: center;
  margin-left: 2.8%;
}

.QA {
  color: rgb(10, 0, 0);
}

input {
  color: rgb(202, 43, 202);
  
  word-spacing: 50%;
  margin-bottom:10px;
  padding-bottom: 10px;
}/* 
.a{
  /* right:1000px;
  padding-right: 1000%;
  margin-right: 50%; */
  

input#male {
 
 margin-right: 0.5%;}
 
 input#male.a{
  margin-left: 20%;
 }

</style>