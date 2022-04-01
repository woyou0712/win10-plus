<template>
  <div class="calculator">
    <div class="view-number">
      <div class="history">
        <div class="h-item" v-for="(item, i) in history" :key="i">
          <span v-text="item"></span>
        </div>
        <div class="expression">
          <span v-text="expression"></span>
        </div>
      </div>
      <div class="num">
        <span v-text="num"></span>
      </div>
    </div>
    <div class="view-button">
      <table>
        <tr>
          <td>
            <div class="btn s" @click="setStorage">储存</div>
          </td>
          <td>
            <div class="btn s" @click="getStorage">取存</div>
          </td>
          <td>
            <div class="btn s" @click="del">退格</div>
          </td>
          <td>
            <div class="btn s" @click="clear">清屏</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="btn l" @click="plusOrMinus">±</div>
          </td>
          <td>
            <div class="btn l" @click="userInput('/')">÷</div>
          </td>
          <td>
            <div class="btn l" @click="userInput('*')">×</div>
          </td>
          <td>
            <div class="btn l" @click="userInput('-')">-</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="btn m" @click="userInput(7)">7</div>
          </td>
          <td>
            <div class="btn m" @click="userInput(8)">8</div>
          </td>
          <td>
            <div class="btn m" @click="userInput(9)">9</div>
          </td>
          <td rowspan="2">
            <div class="btn l" @click="userInput('+')">+</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="btn m" @click="userInput(4)">4</div>
          </td>
          <td>
            <div class="btn m" @click="userInput(5)">5</div>
          </td>
          <td>
            <div class="btn m" @click="userInput(6)">6</div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="btn m" @click="userInput(1)">1</div>
          </td>
          <td>
            <div class="btn m" @click="userInput(2)">2</div>
          </td>
          <td>
            <div class="btn m" @click="userInput(3)">3</div>
          </td>
          <td rowspan="2">
            <div class="btn submit l" @click="submit">=</div>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <div class="btn m" @click="userInput(0)">0</div>
          </td>
          <td>
            <div class="btn l" @click="userInput('.')">.</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  id: "system-calculator", // 应用唯一标识
  permission: null, // 权限标识，为空则表示所有用户可用
  name: "计算器", // APP名称
  width: "320px",
  height: "450px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  showHome: true, // 是否在桌面显示
  data() {
    return {
      isSubmit: false, // 是否提交过
      history: [], // 历史记录
      expression: "", // 当前正在计算的表达式
      num: "", // 当前数值
      storage: "" // 储存的值
    };
  },
  methods: {
    // 用户输入
    userInput(v) {
      v = String(v);
      // 输入的是符号
      if (isNaN(v) && v != ".") {
        this.iptStr(v);
      } else {
        this.iptNum(v);
      }
    },
    // 输入符号
    iptStr(v) {
      // 如果提交过，将刚刚提交的结果保存到历史记录中
      if (this.isSubmit) {
        this.history = [this.expression, this.num];
        this.expression = this.num + v;
        this.num = "";
        this.isSubmit = false;
      }
      // 如果 当前值不存在
      if (!this.num || this.num == "-" || this.num == ".") {
        // 表达式的最后一个字符也是符号 替换掉最后那个符号
        if (
          this.expression &&
          isNaN(this.expression[this.expression.length - 1])
        ) {
          this.expression =
            this.expression.slice(0, this.expression.length - 1) + v;
        } else if (this.expression) {
          // 表达式存在 直接在末尾添加
          this.expression += v;
        }
      } else if (this.num) {
        // 如果当前值存在，则直接将当前值和符号添加到表达式后面，清空当前值
        this.expression += this.num + v;
        this.num = "";
      }
    },
    // 输入数字
    iptNum(v) {
      // 如果提交过，将刚刚提交的结果保存到历史记录中
      if (this.isSubmit) {
        this.history = [this.expression, this.num];
        this.expression = "";
        this.num = "";
        this.isSubmit = false;
      }
      if (v == "." && this.num.indexOf(v) >= 0) {
        return;
      }
      let num = this.delSymbol(this.num) + v;
      this.num = this.setSymbol(num);
    },
    // 等于
    submit() {
      if (this.isSubmit) {
        return;
      }
      this.isSubmit = true;
      // 将刚刚输入的数字拼接到表达式的最后
      this.expression += this.num;

      // 如果表达式的最后是符号，则切除
      if (isNaN(this.expression[this.expression.length - 1])) {
        this.expression = this.expression.slice(0, this.expression.length - 1);
      }
      this.num = this.setSymbol(eval(this.delSymbol(this.expression)));
    },
    // 清屏
    clear() {
      this.isSubmit = false;
      this.history = [];
      this.expression = "";
      this.num = "";
    },
    // 退格
    del() {
      if (!this.num || this.isSubmit) {
        return;
      }
      this.num = this.num.slice(0, this.num.length - 1);
    },
    // 正负切换
    plusOrMinus() {
      if (this.num[0] == "-") {
        this.num = this.num.slice(1);
      } else {
        this.num = "-" + this.num;
      }
    },
    // 储存
    setStorage() {
      this.storage = this.num;
    },
    // 取存
    getStorage() {
      // 如果提交过，将刚刚提交的结果保存到历史记录中
      if (this.isSubmit) {
        this.history = [this.expression, this.num];
        this.expression = "";
        this.isSubmit = false;
      }
      this.num = this.storage;
    },
    setSymbol(num = "") {
      if (isNaN(num)) {
        return;
      }

      let nums = String(num).split(".");
      nums[0] = nums[0].replace(/(?=(\B\d{3})+$)/g, ",");
      return nums.join(".");
    },
    delSymbol(num) {
      return String(num).replace(/\,/g, "");
    }
  }
};
</script>

<style lang="scss" scoped>
.calculator {
  width: 320px;
  height: 400px;
  padding: 10px 10px 0;
  user-select: none;
  .view-number {
    height: 78px;
    text-align: right;
    background: #f1f1f1;
    padding: 5px 10px;
    color: #666;
    .history {
      color: #909090;
      font-size: 12px;
      height: 45px;
    }
    .num {
      font-size: 18px;
      font-weight: 700;
    }
  }
  .view-button {
    height: 312px;
    overflow: hidden;
    table {
      width: 100%;
      tr {
        height: 50px;
        td {
          height: 50px;
          padding: 5px;
          .btn {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ddd;
            color: #666;
            font-weight: 700;
            border-radius: 4px;
            box-shadow: 0 2px 4px 0 #666;
            transition: 0.2s;
            cursor: pointer;
          }
          .btn:active {
            box-shadow: none;
            transform: translateY(1px);
          }
          .btn.submit {
            background-color: #409eff;
            color: #ffffff;
          }
          .s {
            font-size: 14px;
          }
          .m {
            font-size: 16px;
          }
          .l {
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>