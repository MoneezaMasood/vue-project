<script>
import router from '../router';
import axios from 'axios';
import { reactive } from 'vue';
import swal from 'sweetalert';

export default {
    setup() {
        return reactive({
            users: [],
            editedUserId: null,
            editedUserData: {
                username: '',
                password: ''
            },
        });
    },
    methods: {
        pushBack() {
            router.push('/home')
        },
        async fetchUsers() {

        },
        editUser(user) {
            this.editedUserId = user.id;
            this.editedUserData.username = user.username;
            this.editedUserData.password = user.password;
        },
        async saveUserUpdate() {
            try {
                const response = await axios.put(`http://localhost:3000/data/${this.editedUserId}`,
                    this.editedUserData, this.editedUserPassword

                );
                console.log(response.data);


                const editedUser = this.users.find(user => user.id === this.editedUserId);
                if (editedUser) {
                    editedUser.username = response.data.username;
                }

                this.cancelEdit();

                console.log(` updated successfully.`);

            } catch (error) {
                swal("error")
                console.error(`Error`, error);
            }
        },
        async deleteUser(userId) {


            try {
                const response = await axios.delete(`http://localhost:3000/data/${userId}`);
                console.log(response.data);

                this.users = this.users.filter(user => user.id !== userId);

                console.log(`User with ID ${userId} deleted successfully.`);
            } catch (error) {
                console.error(`Error deleting user with ID ${userId}:`, error);
            }

        },

        cancelEdit() {
            this.editedUserId = null;
            this.editedUserData.username = '';
        },
    },
    async mounted() {
        try {
            const response = await axios.get('http://localhost:3000/data');
            this.users = response.data;
            console.log(response)
        } catch (error) {
            console.error('Error:', error);
        }
    }
};
</script>


<template>
    <div class="container">
        <br><br>
        <table style="margin-left: 38% ; font-size: larger;" v-if="users.length > 0">

            <tr>
                <th style="font-weight: bold;">Username &nbsp;</th>
                <th style="font-weight: bold;">ID</th>
                <th style="font-weight: bold;">Password &nbsp; </th>
                <th style="font-weight: bold;">Actions &nbsp;</th>
            </tr>

            <tr v-for="user in users" :key="user.id">
                <td>
                    <template v-if="editedUserId !== user.id">
                        {{ user.username }}
                    </template>
                    <template v-else>
                        <input v-model="editedUserData.username" />
                    </template>
                </td>
                <td>{{ user.id }}</td>
                <td>{{ user.password  }}</td>
                <td>
                    <template v-if="editedUserId !== user.id">
                        <button style="font-weight: bold;" @click="editUser(user)">Update </button>&nbsp;
                        <button style="font-weight: bold;" @click="deleteUser(user.id)">Delete</button>
                    </template>
                    <template v-else>
                        <button @click="saveUserUpdate">Save</button>
                        <button @click="cancelEdit">Cancel</button>
                    </template>
                </td>
            </tr>
        </table>
        <p v-else></p>
        <br><br>
        <div>
            <button class="backbtn" @click="pushBack">Back</button>
        </div>
    </div>
</template>
  
  
<style>
.backbtn {
    background: aquamarine;
    padding: 10px;
    border-radius: 15px;
    margin-left: 80px;
}

.container {
    background-image: url("../perf.png");
    height: 568px;
    width: 1180px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}
</style>