<template>
  <div id="crediton">
    <Header />
    <AddCard />
  </div>
</template>

<script>
import Header from "./components/Header";
import AddCard from "./components/AddCard";

export default {
  name: "App",
  components: {
    Header,
    AddCard,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.preloader-wrap {
  position: relative;
}
.preloader-wrap:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 98;
}

.preloader-wrap:after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 15px;
  height: 15px;
  margin: -9px 0 0 -9px;
  border-radius: 50%;
  border-top: 3px solid #e9e9e9;
  border-right: 3px solid #e9e9e9;
  border-bottom: 3px solid #e9e9e9;
  border-left: 3px solid #587bc3;
  animation: spiner 2s linear infinite;
  z-index: 99;
}

@keyframes spiner {
    0% {
        transform: rotate(0)
    }

    100% {
        transform: rotate(360deg)
    }
}
</style>
