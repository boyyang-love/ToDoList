<template>
  <div class="list">
    <div class="content animated rubberBand">
      <div class="exit iconfont icon-tuichu1" @click="routeJumb"></div>
      <to-do-lists></to-do-lists>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import ToDoLists from "@/components/toDoLists";
export default {
  name: "List",
  components: {
    ToDoLists
  },
  setup() {
    const router = useRouter();

    let routeJumb = () => {
      router.push("/");
    };

    return {
      routeJumb
    };
  }
};
</script>

<style scoped lang='less'>
.list {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .content {
    overflow: hidden;
    width: 75%;
    height: 550px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.5);
    position: relative;
    background-color: #a4e2c6;
    .exit {
      font-size: 28px;
      color: #1bd1a5;
      position: absolute;
      left: 25px;
      top: 20px;
      cursor: pointer;
    }
    .exit:hover {
      color: red;
    }
  }
}

@media screen and (max-width: 510px) {
  .list {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .content {
      width: 100%;
      height: 550px;
      box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.5);
      .exit {
        font-size: 18px;
        color: #ff2d51;
        position: absolute;
        left: 15px;
        top: 15px;
      }
    }
  }
}
</style>