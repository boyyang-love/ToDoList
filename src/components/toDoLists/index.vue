<template>
  <div class="todolists">
    <div class="input">
      <input type="text" placeholder="输入今天您想做的事" v-model="plans" @keyup.enter="addPlans" />
      <div class="submit" @click="addPlans">添加</div>
    </div>
    <div class="lists">
      <ul>
        <li v-for="(item, i) in lists" :key="i" class="animated bounceInRight">
          <span class="number" @click="editor(i)">{{i+1}}</span>
          <span :class=" ['willDo', item.checked == true ? 'checked': ''] ">{{item.content}}</span>
          <span class="check">
            <input type="checkbox" name id :checked="item.checked" @click="checked(i)" />
          </span>
          <span class="iconfont icon-cuo" @click="del(i)"></span>
        </li>
      </ul>
    </div>
    <div class="alertBox" v-show="isShow">
      <input type="text" v-model="afterValue" />
      <div class="submit">
        <span class="iconfont icon-bianji" @click="change"></span>
        <span class="iconfont icon-nb-" @click="exit"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
export default {
  setup() {
    const state = reactive({
      lists: [
        {
          content: "吃饭",
          checked: false
        },
        {
          content: "睡觉",
          checked: false
        },
        {
          content: "打豆豆",
          checked: true
        }
      ],
      plans: "",
      changeId: "",
      afterValue: "",
      isShow: false
    });
    // 添加待做事件
    let addPlans = () => {
      if (state.plans == "") {
        alert("输入不能为空");
      } else {
        state.lists.push({ content: state.plans, checked: false });
        localStorage.setItem("ToDoList", JSON.stringify(state.lists));
        state.plans = "";
      }
    };
    // 勾选已经做过的事件
    let checked = i => {
      state.lists[i].checked = !state.lists[i].checked;
      localStorage.setItem("ToDoList", JSON.stringify(state.lists));
    };
    // 删除事件
    let del = i => {
      console.log(i);
      state.lists.splice(i, 1);
      localStorage.setItem("ToDoList", JSON.stringify(state.lists));
    };
    // 编辑事件
    let editor = i => {
      state.afterValue = state.lists[i].content;
      state.changeId = i;
      state.isShow = true;
    };
    // 本地存储事件
    onMounted(async () => {
      if (localStorage.getItem("ToDoList")) {
        let lists = await localStorage.getItem("ToDoList");
        state.lists = await JSON.parse(lists);
      }
    });
    // 编辑确定事件
    let change = () => {
      console.log(state.changeId);
      state.lists[state.changeId].content = state.afterValue;
      localStorage.setItem("ToDoList", JSON.stringify(state.lists));
      state.isShow = false;
    };
    // 退出编辑事件
    let exit = () => {
      state.isShow = false;
    };

    return {
      ...toRefs(state),
      addPlans,
      checked,
      del,
      editor,
      change,
      exit
    };
  }
};
</script>

<style scoped lang='less'>
.checked {
  text-decoration-line: line-through;
  opacity: 0.5;
  color: black;
  font-weight: normal;
}
.todolists {
  width: 100%;
  height: 475px;
  overflow-y: scroll;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 70px;
  position: relative;
  .input {
    position: fixed;
    top: 65px;
    z-index: 2;
    width: 45%;
    height: 50px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
    background-color: #c2ccd0;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    input {
      width: 75%;
      height: 100%;
      border: none;
      outline: none;
      padding-left: 20px;
    }
    .submit {
      width: 20%;
      height: 100%;
      border: 1px solid white;
      background-color: #cca4e3;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .submit:hover {
      background-color: #dc3023;
    }
  }
  .lists {
    margin-top: 50px;
    width: 45%;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      overflow: hidden;
      li {
        width: 100%;
        height: 60px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        background-color: #424c50;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        display: flex;
        position: relative;
        margin: 5px 0px;
        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background-color: #3de1ad;
          border-radius: 100%;
          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
          font-size: 18px;
          color: white;
          position: absolute;
          left: 5px;
          margin: 0 10px;
          cursor: pointer;
        }
        .number:hover {
          background-color: red;
        }
        .willDo {
          color: whitesmoke;
          font-weight: bold;
          margin: 0 58px;
        }
        .check {
          position: absolute;
          right: 35px;
          input {
            width: 25px;
            height: 25px;
            box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.4);
            cursor: pointer;
          }
        }
        .iconfont {
          position: absolute;
          right: 5px;
          font-size: 25px;
          color: #1685a9;
          cursor: pointer;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.4);
        }
        .iconfont:hover {
          color: red;
        }
      }
    }
  }
  .alertBox {
    position: fixed;
    top: 200px;
    width: 50%;
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.4);
    input {
      width: 95%;
      height: 45px;
      background-color: #a4e2c6;
      border: none;
      outline: none;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
      margin: 5px;
    }
    .submit {
      width: 95%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        font-size: 30px;
        color: sandybrown;
        cursor: pointer;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
        border-radius: 3px;
      }
      .iconfont:hover {
        color: #ff2d51;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .todolists {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;
    .input {
      width: 90%;
      height: 50px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
      background-color: #c2ccd0;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      input {
        width: 95%;
        height: 100%;
        border: none;
        outline: none;
        padding-left: 20px;
      }
      .submit {
        width: 20%;
        height: 100%;
        border: 1px solid white;
        background-color: #cca4e3;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .submit:hover {
        background-color: #dc3023;
      }
    }
    .lists {
      width: 90%;
      ul {
        list-style: none;
      }
    }
    .alertBox {
      width: 90%;
      height: 125px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 5px;
      background-color: white;
      box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.4);
      input {
        width: 95%;
        height: 45px;
        background-color: #a4e2c6;
        border: none;
        outline: none;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
        margin: 5px;
      }
      .submit {
        width: 95%;
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iconfont {
          font-size: 30px;
          color: sandybrown;
          cursor: pointer;
          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
          border-radius: 3px;
        }
        .iconfont:hover {
          color: #ff2d51;
        }
      }
    }
  }
}
</style>