<template>
  <div class="home">
    <div class="content animated bounceInDown">
      <h1 class="title">ToDoList</h1>
      <h3 class="animated slideInRight">记录下今天要做的事吧</h3>
      <div class="btn" @click="routeJumb">Just Do It</div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useRouter } from "vue-router";
export default {
  name: "Home",
  components: {},
  setup() {
    const router = useRouter()

    let routeJumb = () =>{
      router.push('List')
    }

    return {
      routeJumb
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 75%;
    height: 500px;
    margin-top: 45px;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.5);
    background-color: #a1afc9;
    .title {
      margin-bottom: 200px;
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      height: 45px;
      background-color: #44cef6;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
      border-radius: 15px;
      cursor: pointer;
    }
    .btn:hover {
      transform: translateX(3px) translateY(2px);
      color: red;
    }
  }
}

@media screen and (max-width: 510px) {
  .home {
    .content {
      width: 100%;
      .btn {
        font-size: 10px;
      }
    }
  }
}
</style>
