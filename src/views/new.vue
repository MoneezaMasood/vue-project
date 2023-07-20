<script>

import router from '../router';
export default{
methods:
{
    back()
    {
        router.push('/')
    }
}
}
</script>

<template>
    <div>
        <button @click="back">back</button>
    </div>
</template>


