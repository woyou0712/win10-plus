<template>
  <table style="width: 680px">
    <colgroup>
      <col width="150px" />
      <col width="90px" />
      <col width="150px" />
      <col width="90px" />
      <col width="200px" />
    </colgroup>
    <thead>
      <tr>
        <th>名称</th>
        <th>类型</th>
        <th>APPID</th>
        <th>快捷方式</th>
        <th>
          <span class="text-btn" @click="toAddSystemApp">+安装应用</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in appList" :key="item.id">
        <td><div class="name nowrap" v-text="item.name"></div></td>
        <td>
          <div
            class="type"
            v-text="item.type === 1 ? '内置组件' : '外部链接'"
          ></div>
        </td>
        <td><div class="id nowrap" v-text="item.app_id"></div></td>
        <td>
          <div class="home" v-text="item.show_home === 1 ? '是' : '否'"></div>
        </td>
        <td>
          <span class="text-btn" @click="toAddSystemApp(item)">修改</span>
          <span class="text-btn" @click="deleteApp(item.id)">卸载</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { openAddSystemApp } from "./openAdd.js";
import { systemAppDelete } from "@/apis/system/app.js";
import { Message, MessageBox } from "@/new-dream-plus";
import { onMounted } from "@vue/runtime-core";
import { initAPP } from "@/views/methods/setApp.js";
const parentId = "system-settings";
export default {
  setup() {
    const { appList, pullAppList } = require("./table.js");
    onMounted(() => {
      pullAppList();
    });
    return { appList, pullAppList };
  },
  data() {
    return {
      addSystemAppWin: null,
    };
  },
  methods: {
    // 开始添加/修改系统应用
    toAddSystemApp(form) {
      let option = { parentId, getList: this.pullAppList };
      if (form && form.id) {
        option.form = Object.assign({}, form);
      }
      this.addSystemAppWin = openAddSystemApp(option);
    },
    // 删除
    deleteApp(id) {
      new MessageBox({
        msg: "确定卸载该应用吗？",
        parentId,
      }).submit(() => {
        systemAppDelete(id).then(() => {
          new Message("卸载成功");
          this.pullAppList();
          initAPP();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  cursor: default;
  tr {
    padding: 5px 10px;
    font-size: 12px;
    th {
      font-size: 14px;
      padding: 5px 10px 10px 10px;
    }
    th,
    td {
      text-align: center;
    }
    .nowrap {
      width: 150px;
    }
    div {
      padding: 5px 10px;
      width: 100%;
    }
  }
  tbody {
    tr:hover {
      background: #f5f5f5;
      color: #e6a23c;
    }
  }
}
</style>