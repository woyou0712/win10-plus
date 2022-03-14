<template>
  <div class="windows-login" :style="style">
    <div class="account-form" @keydown.enter="toLogin" v-show="!isAjax">
      <div class="item">
        <input type="text" placeholder="账号" v-model="form.account" />
      </div>
      <div class="item">
        <input type="password" placeholder="密码" v-model="form.password" />
      </div>
      <div class="item">
        <input type="text" placeholder="验证码" style="width: 100px" v-model="form.code" />
        <div class="code-img" v-html="svg" @click="pullCode"></div>
        <button style="width: 40px" @click="toLogin(form)">
          <svg
            t="1646906590433"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2754"
            width="36"
            height="36"
          >
            <path
              fill="currentColor"
              d="M783.69 882.537H289.438c-54.588 0-98.848-44.243-98.848-98.811v-98.808h49.424v98.808c0 27.286 22.132 49.406 49.424 49.406H783.69c27.294 0 49.423-22.124 49.423-49.406V240.274c0-27.287-22.133-49.407-49.423-49.407H289.438c-27.297 0-49.424 22.12-49.424 49.407v98.807H190.59v-98.807c0-54.568 44.26-98.812 98.848-98.812H783.69c54.587 0 98.847 44.243 98.847 98.812v543.451c0 54.568-44.26 98.812-98.847 98.812zM529.746 357.802c-9.63-9.649-9.63-25.304 0-34.93 9.65-9.65 25.313-9.65 34.967 0l170.501 170.432c5.139 5.14 7.335 11.966 6.999 18.695 0.336 6.731-1.86 13.557-6.999 18.723l-170.501 170.43c-9.655 9.648-25.318 9.648-34.967 0-9.63-9.65-9.63-25.306 0-34.932l129.57-129.52h-493.14c-13.637 0-24.713-11.047-24.713-24.702 0-13.627 11.076-24.703 24.711-24.703h493.143L529.746 357.8z m-40.774 0"
              p-id="6121"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="account-form" style="text-align: center" v-show="isAjax">
      <svg
        t="1646960830012"
        class="loading icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2921"
        width="64"
        height="64"
        style="color: #fff; animation: loading 2s linear infinite"
      >
        <path
          fill="currentColor"
          d="M256 513.422c0 14.222-12.8 27.022-27.022 27.022H27.022C11.378 540.444 0 527.644 0 513.422V512c0-15.644 12.8-27.022 27.022-27.022h201.956C243.2 483.556 256 496.356 256 510.578v2.844zM1024 513.422c0 15.645-12.8 27.022-27.022 27.022H795.022c-15.644 0-27.022-12.8-27.022-27.022V512c0-15.644 12.8-27.022 27.022-27.022h200.534c15.644 0 27.022 12.8 27.022 27.022l1.422 1.422zM540.444 228.978c0 14.222-12.8 27.022-27.022 27.022H512c-15.644 0-28.444-12.8-28.444-27.022V27.022c0-15.644 12.8-27.022 27.022-27.022H512c15.644 0 27.022 12.8 27.022 27.022v201.956h1.422zM540.444 996.978c0 15.644-12.8 27.022-27.022 27.022H512c-15.644 0-27.022-12.8-27.022-27.022V795.022c0-15.644 12.8-27.022 27.022-27.022h1.422c15.645 0 27.022 12.8 27.022 27.022v201.956zM329.956 331.378c-11.378 11.378-28.445 11.378-38.4 0L149.333 189.156c-11.377-11.378-11.377-28.445 0-38.4l1.423-1.423c11.377-11.377 28.444-11.377 38.4 0l142.222 142.223c11.378 9.955 11.378 28.444-1.422 39.822zM873.244 874.667c-11.377 11.377-28.444 11.377-38.4 0L692.622 732.444c-11.378-11.377-11.378-28.444 0-38.4l1.422-1.422c11.378-11.378 28.445-11.378 38.4 0l142.223 142.222c11.377 9.956 11.377 28.445-1.423 39.823zM732.444 331.378c-11.377 11.378-28.444 11.378-38.4 0l-1.422-1.422c-11.378-11.378-11.378-28.445 0-38.4l142.222-142.223c11.378-11.377 28.445-11.377 38.4 0l1.423 1.423c11.377 11.377 11.377 28.444 0 38.4L732.444 331.378zM189.156 874.667c-11.378 11.377-28.445 11.377-38.4 0l-1.423-1.423c-11.377-11.377-11.377-28.444 0-38.4l142.223-142.222c11.377-11.378 28.444-11.378 38.4 0l1.422 1.422c11.378 11.378 11.378 28.445 0 38.4L189.156 874.667z"
          p-id="3386"
        />
      </svg>
    </div>
  </div>
</template>

<script>
// 默认登录页面
import bg1 from "../assets/images/login_1.jpeg";
import bg2 from "../assets/images/login_2.jpeg";
import { onMounted } from "vue";
export default {
  computed: {
    style() {
      return {
        backgroundImage: `url(${Math.random() > 0.5 ? bg1 : bg2})`
      };
    }
  },
  setup() {
    const {
      initForm,
      form, // 表单
      isAjax, // 是否有请求自在进行
      svg, // 验证码图片
      pullCode, // 获取验证码
      toLogin // 登录
    } = require("./methods/login.js");
    onMounted(() => {
      initForm();
      pullCode();
    });
    return {
      isAjax,
      svg,
      form,
      toLogin,
      pullCode
    };
  }
};
</script>

<style lang="scss" scoped>
.windows-login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: 100% 100%;
  position: relative;
  .account-form {
    width: 240px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    .item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      + .item {
        margin-top: 15px;
      }
      button,
      input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        background-color: rgba($color: #010d1a, $alpha: 0.6);
        border-color: #fff;
        color: #fff;
        padding: 3px 10px;
        font-size: 14px;
        border-width: 1px;
      }
      input:focus-visible {
        outline: none;
      }
      button {
        padding: 0;
        background-color: rgba($color: #000d35, $alpha: 0.8);
      }
      .code-img {
        width: 90px;
        border-radius: 5px;
        height: 40px;
        background-color: rgba($color: #fff, $alpha: 0.8);
        cursor: pointer;
      }
    }
  }
}
</style>
<style>
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>