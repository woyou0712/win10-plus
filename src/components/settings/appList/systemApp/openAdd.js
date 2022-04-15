import addApp from "./add.vue";
import { openSelfApp } from "@/views/methods/openApp.js"
import { systemAppAdd, systemAppEdit } from "@/apis/system/app.js";
import { initAPP } from "@/views/methods/setApp.js";
import { appsIcon } from "../open.js";


export function openAddSystemApp({ parentId, form, getList }) {
  let props = { submit };
  if (form) {
    props.form = form
  }
  let option = {
    id: addApp.id,
    parentId,
    icon: appsIcon,
    title: addApp.name,
    width: addApp.width,
    height: addApp.height,
    miniBtn: addApp.miniBtn,
    maxBtn: addApp.maxBtn,
    resize: addApp.resize,
    component: addApp,
    props
  }
  let addSystemAppWin = openSelfApp(option)
  function submit(form) {
    let apis = form && form.id ? systemAppEdit : systemAppAdd;
    apis(form).then(() => {
      // 关闭添加系统应用窗口
      addSystemAppWin.close();
      // 释放内存
      addSystemAppWin = null;
      if (typeof getList === "function") { getList() }
      initAPP();
    });
  }

  return addSystemAppWin
}