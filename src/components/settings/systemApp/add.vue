<template>
  <div class="add-app">
    <div class="form-item" v-if="!form.id">
      <div class="label">应用类型：</div>
      <div class="data">
        <label>
          <input
            v-model="form.type"
            type="radio"
            name="type"
            :value="0"
          />外部链接
        </label>
        <label>
          <input
            v-model="form.type"
            type="radio"
            name="type"
            :value="1"
          />内置组件
        </label>
      </div>
    </div>
    <div class="form-item">
      <div class="label">应用名称：</div>
      <div class="data">
        <input class="input" type="text" v-model="form.name" />
      </div>
    </div>

    <div class="form-item" v-show="form.type == 0">
      <div class="label">网络地址：</div>
      <div class="data">
        <input class="input" type="text" v-model="form.url" />
      </div>
    </div>

    <div class="form-item" v-show="form.type == 1">
      <div class="label">APPID：</div>
      <div class="data">
        <input class="input" type="text" v-model="form.app_id" />
      </div>
    </div>

    <div class="form-item">
      <div class="label">图标：</div>
      <div class="data">
        <textarea class="input" v-model="form.icon_el" cols="30" rows="5" />
      </div>
    </div>
    <div class="form-item">
      <div class="label">快捷方式：</div>
      <div class="data">
        <label>
          <input
            v-model="form.show_home"
            type="radio"
            name="show_home"
            :value="1"
          />是
        </label>
        <label>
          <input
            v-model="form.show_home"
            type="radio"
            name="show_home"
            :value="0"
          />否
        </label>
      </div>
    </div>
    <div class="form-item">
      <div class="label"></div>
      <div class="data">
        <button class="btn" @click="submit(form)">确 定</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  id: "system-add-app",
  parentId: "system-settings",
  name: "系统应用",
  width: "400px",
  height: "355px",
  miniBtn: false, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  props: {
    form: {
      type: Object,
      default() {
        return reactive({
          id: null,
          type: 0,
          app_id: null,
          name: null,
          url: null,
          icon_el: null,
          show_home: 1,
        });
      },
    },
    submit: {
      type: Function,
      default() {
        return () => {};
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.add-app {
  .form-item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    font-size: 15px;
    .label {
      width: 80px;
    }
    .data {
      .input {
        width: 300px;
        line-height: 20px;
        padding: 3px 10px;
      }
      .btn {
        width: 300px;
        line-height: 20px;
        padding: 3px 10px;
        background-color: #409eff;
        color: #ffffff;
        border-color: #409eff;
        border-radius: 3px;
      }
    }
  }
}
</style>