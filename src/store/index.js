import { createStore } from 'vuex'
import axios from 'axios'
import router from '../router'
import swal from 'sweetalert'

export default createStore({
  state: {
    userData: {
      first_name: '1',
      last_name: '2',
      comp1: '',
      comp2: '',
      pluscomp: ''
    },
    loginData: {
      Username: '',
      Password: ''
    },
    logdata: {
      usern: '',
      p: ''
    },
    Dbresponse: {},
    counter: 0,
    data:""
  },
  getters: {
    getUserData: (state) => state.userData,
    getResult: (state) => state.userData.pluscomp
  },
  mutations: {
    saveLastName(state, val) {
      state.userData.last_name = val
    },
    saveFirstName(state, any) {
      state.userData.first_name = any
    },
    savecomp1(state, c1) {
      state.userData.comp1 = c1
    },
    savecomp2(state, c2) {
      state.userData.comp2 = c2
    },
    saveUsername(state, a) {
      state.loginData.Username = a
    },
    savePassword(state, b) {
      state.loginData.Password = b
    },
    saveUserN(state, a1) {
      state.logdata.usern = a1
    },
    saveP(state, b1) {
      state.logdata.p = b1
    },

    plusFtn(state) {
      state.userData.pluscomp = parseInt(state.userData.comp1) + parseInt(state.userData.comp2)
      console.log('value from store:', state.userData.pluscomp)
    },
    inc(state) {
      state.counter++
      console.log('mutation ', state.counter)
    },
    dec(state) {
      state.counter--
      console.log('mutation ', state.counter)
    },
    async onsubmit(state) {
      console.log(state.logdata.usern)
      console.log(state.logdata.p)
      // debugger;
      if (state.logdata.p == '' || state.logdata.usern == '') {
        swal('Kindly fill all the fields.')
      } else {
        // const payloadset = {
        //   Username: state.logdata.usern,
        //   Password: state.logdata.p
        // }
        try {
          state.Dbresponse = await axios.get('http://localhost:3000/data')

          console.log('DbResponse', state.Dbresponse)
          if (state.Dbresponse.status != 201 && state.Dbresponse.status != 200) {
            throw new Error()
          } else {
            state.Dbresponse = state.Dbresponse.data
            console.log('data', state.Dbresponse)
            for (let i = 0; i < state.Dbresponse.length; i++) {
              if (
                state.Dbresponse[i].username.includes(state.logdata.usern) &&
                state.Dbresponse[i].password.includes(state.logdata.p)
              ) {
                // let response = await axios.post('http://localhost:3000/data', payloadset)
                // console.log('response post', response)
                router.push('profile')
                return
              } else {
                swal('user does not exist')
                return
              }
            }
          }
        } catch (err) {
          console.log('catch', err)
          swal('Something went wrong')
        }
      }
    }
  },
  actions: {
    saveLastName({ commit }, name) {
      commit('saveLastName', name)
    },
    saveFirstName({ commit }, first) {
      commit('saveFirstName', first)
    },
    savecomp1({ commit }, c1) {
      commit('savecomp1', c1)
    },
    savecomp2({ commit }, c2) {
      commit('savecomp2', c2)
    },
    plusFtn({ commit }) {
      commit('plusFtn')
    },
    inc({ commit }) {
      console.log('increaseCounter(action)')
      commit('inc')
    },
    dec({ commit }) {
      console.log('decreaseCounter(action)')
      commit('dec')
    },
    saveUsername({ commit }, a) {
      commit('saveUsername', a)
    },
    savePassword({ commit }, b) {
      commit('savePassword', b)
    },
    saveUserN({ commit }, a) {
      commit('saveUserN', a)
    },
    saveP({ commit }, b) {
      commit('saveP', b)
    },
    onsubmit({commit})
    {
      commit('onsubmit')
    }
  },
  modules: {}
})
