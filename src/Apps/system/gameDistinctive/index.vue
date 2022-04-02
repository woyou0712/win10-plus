<template>
  <div class="system-game-distinctive">
    <div class="table">
      <div class="tr" v-for="(row, index) in colorList" :key="index">
        <div
          class="td"
          v-for="(item, n) in row"
          :key="n"
          :style="{ backgroundColor: item }"
          :class="`t${colorList.length}`"
          @click="submit(index, n)"
        ></div>
      </div>
    </div>
    <div class="time">剩余时间：<span class="num" v-text="time"></span>s</div>
    <div class="grade-box" v-show="showGrade">
      <div class="grade">
        <p class="num-box">通过 <span class="num" v-text="grade"></span> 关</p>
        <p
          class="msg"
          v-text="
            grade < 20
              ? '龟速'
              : grade < 40
              ? '正常水平'
              : grade < 70
              ? '超常发挥'
              : '开挂了'
          "
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
window.gameDistinctiveSetTime = null; // 定时器
import { onMounted } from "@vue/runtime-core";
export default {
  id: "system-game-distinctive", // 应用唯一标识
  permission: null, // 权限标识，为空则表示所有用户可用
  name: "找色游戏", // APP名称
  width: "500px",
  height: "580px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  setup() {
    const {
      grade,
      sizeNumber,
      colorList,
      setList,
      submit,
    } = require("./index.js");
    onMounted(() => {
      // 初始化图形
      sizeNumber.value = 2;
      setList(sizeNumber.value);
      // 初始化关卡
      grade.value = 0;
    });
    return { colorList, submit, grade };
  },
  data() {
    return {
      endTime: 0,
      time: 60,
      showGrade: false,
    };
  },
  mounted() {
    this.initTime();
  },
  methods: {
    initTime() {
      clearInterval(window.gameDistinctiveSetTime);
      this.endTime = parseInt(Date.now() / 1000) + 60; // 结束时间
      window.gameDistinctiveSetTime = setInterval(() => {
        this.time = this.endTime - parseInt(Date.now() / 1000);
        if (this.time <= 0) {
          this.showGrade = true;
          clearInterval(window.gameDistinctiveSetTime);
        }
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
.system-game-distinctive {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .table {
    width: 482px;
    height: 482px;
    border: 1px solid #ddd;
    .tr {
      display: flex;
      + .tr {
        border-top: 1px solid #ddd;
      }
      .td {
        + .td {
          border-left: 1px solid #ddd;
        }
      }
      .t2 {
        width: 240px;
        height: 239px;
      }
      .t4 {
        width: 120px;
        height: 119px;
      }
      .t8 {
        width: 60px;
        height: 59px;
      }
      .t16 {
        width: 30px;
        height: 29px;
      }
    }
  }
  .time {
    width: 100%;
    text-align: center;
    padding: 5px;
    .num {
      color: #a00;
    }
  }
  .grade-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    background: rgba($color: #000000, $alpha: 0.5);
    .grade {
      width: 100%;
      background-color: rgba($color: #ff0000, $alpha: 0.6);
      p {
        margin: 10px 0;
      }
      .num-box {
        font-size: 50px;
        color: #fff;
        .num {
          color: chartreuse;
          margin: 0 10px;
        }
      }
      .msg {
        font-size: 30px;
        color: aqua;
      }
    }
  }
}
</style>
