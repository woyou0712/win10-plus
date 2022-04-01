<template>
  <div class="property">
    <div class="list">
      <!-- 头像、账号 -->
      <div class="item">
        <div class="label">
          <div class="picture">
            <input
              class="img file-selector"
              type="file"
              @change="uploadPicture"
            />
            <img class="img" v-if="userInfo.picture" :src="userInfo.picture" />
            <div class="img" v-else v-html="userIcon"></div>
          </div>
        </div>
        <div class="data nowrap">
          <span v-text="userInfo.account"></span>
        </div>
      </div>
      <!-- 基本信息 -->
      <div class="item" v-for="item in options" :key="item.id">
        <div class="label">
          <div class="text">{{ item.label }}：</div>
        </div>
        <div class="data nowrap">
          <span
            v-show="editItme != item.id"
            @dblclick="editItme = item.id"
            class="item-text"
            v-text="userInfo[item.key]"
          ></span>
          <input
            v-show="editItme == item.id"
            @blur="editItme = null"
            type="text"
            class="item-input"
            v-model="userInfo[item.key]"
          />
        </div>
      </div>
      <!-- 用户组 -->
      <div class="item">
        <div class="label"><div class="text">用户组：</div></div>
        <div class="data nowrap">
          <span
            v-show="editItme != 100"
            @dblclick="editItme = 100"
            class="item-text"
            v-text="userInfo['role_name']"
          ></span>
          <select
            v-show="editItme == 100"
            @blur="editItme = null"
            name="role_id"
            @change="setRole"
          ></select>
        </div>
      </div>
      <div class="item">
        <div class="label"></div>
        <div class="data">
          <button class="btn primary" @click="submitEditInfo">
            保 存 资 料
          </button>
        </div>
      </div>
      <!-- 密码 -->
      <div class="item">
        <div class="label">旧密码：</div>
        <div class="data">
          <input
            type="password"
            class="item-input"
            v-model="passwordForm.oldPassword"
          />
        </div>
      </div>
      <div class="item">
        <div class="label">新密码：</div>
        <div class="data">
          <input
            type="password"
            class="item-input"
            v-model="passwordForm.newPassword"
          />
        </div>
      </div>
      <div class="item">
        <div class="label">确认密码：</div>
        <div class="data">
          <input
            type="password"
            class="item-input"
            v-model="passwordForm.rPassword"
          />
        </div>
      </div>
      <div class="item">
        <div class="label"></div>
        <div class="data">
          <button class="btn primary" @click="submitEditPassword(passwordForm)">
            保 存 密 码
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from "@/utils/Token.js";
import { onMounted } from "@vue/runtime-core";
export default {
  id: "system-user-info", // 应用唯一标识
  name: "用户", // APP名称
  width: "400px",
  height: "580px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  setup() {
    const { userIcon } = require("./open.js");
    const {
      userInfo,
      uploadPicture,
      setRole,
      submitEditInfo,
      submitEditPassword,
    } = require("./setInfo.js");
    onMounted(() => {
      let {
        id,
        picture,
        account,
        name,
        email,
        phone,
        Role: { info },
      } = getUserInfo();
      userInfo.id = id;
      userInfo.picture = picture;
      userInfo.account = account;
      userInfo.name = name;
      userInfo.email = email;
      userInfo.phone = phone;
      userInfo.role_id = info ? info.id : null;
      userInfo.role_name = info ? info.name : null;
    });
    return {
      userInfo,
      userIcon,
      uploadPicture,
      setRole,
      submitEditInfo,
      submitEditPassword,
    };
  },
  data() {
    return {
      editItme: null,
      options: [
        {
          label: "姓名",
          key: "name",
          id: 1,
        },
        {
          label: "邮箱",
          key: "email",
          id: 2,
        },
        {
          label: "手机",
          key: "phone",
          id: 3,
        },
      ],
      // 修改密码
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        rPassword: "",
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.property {
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  background-color: #dfdfdf;
  .list {
    background: #f1f1f1;
    height: 100%;
    padding: 10px;
    color: #666666;
    .item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      + .item {
        border-top: 1px solid #808080;
      }
      .label {
        width: 120px;
        .picture {
          height: 60px;
          position: relative;
          .img {
            width: 60px;
            height: 60px;
            border-radius: 30px;
            position: absolute;
            top: 0;
            left: 0;
          }
          .file-selector {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
            opacity: 0;
            cursor: pointer;
          }
        }
        .text {
          padding-left: 10px;
        }
      }
      .data {
        width: calc(100% - 120px);
        .item-text {
          padding: 5px 0;
        }
        .item-input {
          border: none;
          padding: 5px 10px;
          width: 100%;
        }
        .item-input:focus-visible {
          outline: none;
        }
      }
    }
  }
}
</style>
