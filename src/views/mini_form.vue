<template>
    <div>
        Full Name: <input @blur="$emit('savename', this.name)" v-model="name" /><br>
        ID: <input @blur="$emit('saveID', this.ID)" v-model="ID" /> <br>

        <button @click="$emit('submitChildData')">Submit</button>
        <button @click="$emit('PushToProfile')">Profile</button>
        
    </div>
</template>
<script>

export default {
    props: {
        name: {},
        ID: {}
    },
    setup(props) {
        return {
            name: props.name,
            ID: props.ID
        }
    },
}
</script>
