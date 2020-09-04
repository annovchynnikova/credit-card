<template>
  <div class="header-menu">
    <h2 class="header-name">{{ name }}</h2>
    <div class="header-lang">
      <a class="header-lang-ru" href="#">РУ</a>
      <p style="padding: 0 5px ">|</p>
      <a class="header-lang-ua" href="#">УКР</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "main",
  data() {
    return {
      name: "CREDITON",
    };
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.header-menu {
  position: relative;
  background: linear-gradient(
    90deg,
    #5a4be6 0.26%,
    #73aff7 47.1%,
    #93d0d9 99.8%
  );
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-name {
  font-family: "PT Sans", sans-serif;
  color: #cfe0f4;
  font-stretch: extra-expanded;
  font-size: 28px;
}
.header-lang {
  position: absolute;
  height: 19px;
  left: 80.21%;
  right: 15.28%;

  display: flex;
  color: #ffff;
}
.header-lang a {
  text-decoration: none;
}
.header-lang-ru,
.header-lang-ua {
  font-family: "PT Sans", sans-serif;
  color: white;
}
.header-lang-ru {
  color: #587bc3;
}

@media screen and (max-width: 720px) {
  .header-menu {
    justify-content: flex-start;
    padding-left: 24px;
    height: 64px;
  }
}
</style>