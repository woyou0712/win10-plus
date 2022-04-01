<template>
  <div class="system-setting">
    <left-table v-model="menuId" :menusList="menusList">个性化</left-table>
    <div class="set-right">
      <div class="windows">
        <div class="home" :style="bgStyle">
          <div class="windows-win" :style="footStyle"></div>
        </div>
        <div class="footer" :style="footStyle"></div>
      </div>
      <div class="set-bg" v-show="menuId === 1">
        <div class="title">选择图片</div>
        <div class="images">
          <div
            class="img-item"
            v-for="(item, index) in bgImages"
            :key="index"
            :style="{ backgroundImage: `url('${item.url}')` }"
            @click="setStyle({ bg_type: 1, bg_id: item.id })"
          ></div>
        </div>
        <div class="title">上传图片</div>
        <div class="images">
          <div class="img-item upload">
            <input class="file-selector" type="file" @change="uploadBgImage" />
            <svg
              t="1647057135915"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2230"
              width="36"
              height="36"
            >
              <path
                fill="currentColor"
                d="M554.666667 550.4V768h192c85.333333-8.533333 149.333333-81.066667 149.333333-170.666667 0-93.866667-76.8-170.666667-170.666667-170.666666h-4.266666c-21.333333-98.133333-106.666667-170.666667-209.066667-170.666667-119.466667 0-213.333333 93.866667-213.333333 213.333333-72.533333 8.533333-128 72.533333-128 149.333334C170.666667 699.733333 238.933333 768 320 768H512v-217.6l-98.133333 98.133333-29.866667-29.866666 149.333333-149.333334 149.333334 149.333334-29.866667 29.866666-98.133333-98.133333z m0 217.6v42.666667h-42.666667v-42.666667h-64v42.666667h-128C213.333333 810.666667 128 725.333333 128 618.666667c0-85.333333 55.466667-157.866667 128-183.466667C273.066667 311.466667 379.733333 213.333333 512 213.333333c110.933333 0 209.066667 72.533333 243.2 170.666667 102.4 12.8 183.466667 102.4 183.466667 213.333333s-85.333333 200.533333-192 213.333334h-128v-42.666667H554.666667z"
                p-id="2231"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="set-bg" v-show="menuId === 2">
        <div class="title">选择颜色</div>
        <div class="images">
          <div
            class="img-item"
            v-for="(item, index) in bgColors"
            :key="index"
            :style="{ backgroundColor: item.color }"
            @click="setStyle({ bg_type: 0, bg_id: item.id })"
          ></div>
        </div>
      </div>
      <div class="set-bg" v-show="menuId === 3">
        <div class="title">选择主题</div>
        <div class="theme">
          <div
            class="theme-item"
            v-for="(item, index) in footBgColors"
            :key="index"
            :style="{ backgroundImage: item.bg, color: item.color }"
            @click="setStyle({ footer_bg_id: item.id })"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import leftTable from "./leftTable.vue";
import { uploadImage } from "@/utils/uploadFile.js";
import { getUserInfo } from "@/utils/Token.js";
import { systemBgAdd } from "@/apis/system/settings.js";
export default {
  components: { "left-table": leftTable },
  id: "global-system-style-settings", // 应用唯一标识
  name: "个性化设置", // APP名称
  width: "1000px",
  height: "720px",
  miniBtn: true, // 是否显示最小化按钮
  maxBtn: false, // 是否显示最大化按钮
  resize: false, // 是否可缩放
  setup() {
    const menuId = ref(1),
      menusList = [
        {
          id: 1,
          name: "背景图片",
        },
        {
          id: 2,
          name: "背景颜色",
        },
        {
          id: 3,
          name: "主题颜色",
        },
      ];
    const {
      bgStyle, // 背景样式
      bgImages, // 背景图片列表
      bgColors, // 背景颜色列表
      pullBgList,
    } = require("@/views/methods/setHome.js");
    const {
      footStyle, // 任务栏
      footBgColors, // 任务栏主题
    } = require("@/views/methods/setFooter.js");
    const { setStyle } = require("@/views/methods/settingStyle.js");
    return {
      menuId, // 当前显示的菜单
      menusList,
      bgStyle, // 背景样式
      bgImages, // 背景图片列表
      bgColors, // 背景颜色列表
      pullBgList,
      footStyle,
      footBgColors,
      setStyle, // 设置
    };
  },
  data() {
    return {
      userInfo: {},
    };
  },
  mounted() {
    this.userInfo = getUserInfo();
  },
  methods: {
    uploadBgImage(e) {
      let el = e.target;
      let file = el.files[0];
      if (!file) {
        return;
      }
      // 上传图片
      uploadImage(file, `system/settings/${this.userInfo.account}`)
        .then((data) => {
          el.value = null;
          // 添加到背景
          this.addBg(data);
        })
        .catch(() => {
          el.value = null;
        });
    },
    // 将图片添加到背景列表
    addBg(data) {
      systemBgAdd(`${window.WINDOWS_CONFIG.cosUrl}/${data.Key}`).then(() => {
        // 重新获取背景列表
        this.pullBgList();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.system-setting {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 5px 10px;
  .left-table {
    width: 300px;
    height: 100%;
    overflow-y: auto;
    padding: 5px 0;
    background-image: linear-gradient(
      45deg,
      #f5f5f5,
      #f1f1f1,
      #f5f5f5,
      #f1f1f1,
      #f5f5f5,
      #f1f1f1
    );
    .title {
      font-weight: 700;
      padding: 10px;
      cursor: default;
    }
    .left-item {
      padding: 10px 20px;
      color: #444444;
      border-left: 4px solid rgba($color: #000000, $alpha: 0);
      cursor: pointer;
    }
    .left-item.on {
      border-left-color: #409eff;
    }
    .left-item:hover {
      background-color: rgba(220, 220, 220, 0.5);
    }
  }
  .set-right {
    width: calc(100% - 300px);
    height: 100%;
    overflow-y: auto;
    background-image: linear-gradient(
      -45deg,
      #f5f5f5,
      #ffffff,
      #f5f5f5,
      #ffffff,
      #f5f5f5,
      #ffffff,
      #f5f5f5
    );
    padding: 10px 0;
    .windows {
      width: 500px;
      height: 250px;
      border: 1px solid #444;
      margin-left: 15px;
      overflow: hidden;
      .home {
        position: relative;
        width: 100% !important;
        height: 230px !important;
        overflow: hidden;
        background-size: 100% 100%;
        position: relative;
        background-color: #444444;
        .windows-win {
          width: 100px !important;
          height: 130px !important;
          position: absolute;
          left: 0;
          bottom: 0;
          opacity: 0.6;
        }
      }
      .footer {
        width: 100% !important;
        height: 20px !important;
      }
    }
    .set-bg {
      margin-top: 30px;
      font-size: 16px;
      .title {
        padding: 15px;
      }
      .images {
        display: flex;
        flex-wrap: wrap;
        min-height: 60px;
        .img-item {
          border: 1px solid #eeeeee;
          background-color: #f5f5f5;
          cursor: pointer;
          margin-left: 15px;
          margin-top: 15px;
          width: 100px;
          height: 60px;
          background-size: 100% 100%;
          transition: 0.2s;
        }
        .img-item:hover {
          box-shadow: 0 3px 6px 0 #888;
        }
        .img-item.upload {
          border: 1px solid #444444;
          position: relative;
          color: #444444;
          .file-selector {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 1;
          }
          .icon {
            position: absolute;
            z-index: 0;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .img-item.upload:hover {
          box-shadow: initial;
        }
      }
      .theme {
        width: 500px;
        margin-left: 15px;
        .theme-item {
          cursor: pointer;
          width: 100%;
          height: 20px;
          transition: 0.2s;
          + .theme-item {
            margin-top: 10px;
          }
        }
        .theme-item:hover {
          box-shadow: 0 3px 6px 0 #888;
        }
      }
    }
  }
}
</style>