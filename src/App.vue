<template>
  <div class="app">
		<router-view class="app-router-view"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
  },
  
  mounted () {
  },

  methods: {
  }
}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
	}
	html,
  body,
  .app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
	.app-router-view{
		height: 100%;
	}
</style>



