<template>
  <div>
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {  
      document.body.removeChild(document.getElementById('Loading')
    )   
  }
}
</script>

<style>

</style>
