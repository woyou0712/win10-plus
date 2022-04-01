import addApp from "./add.vue";
import { openSelfApp } from "@/views/methods/openApp.js"
import { userAppAdd, userAppEdit } from "@/apis/system/app.js";
import { initAPP } from "@/views/methods/setApp.js";


export const appIcon = `<svg t="1648604315869" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                              p-id="2229" width="64" height="64">
                              <path
                                d="M878.159424 565.40635l-327.396585 0c-11.307533 0-20.466124 9.168824-20.466124 20.466124l0 327.396585c0 11.307533 9.15859 20.466124 20.466124 20.466124l327.396585 0c11.2973 0 20.466124-9.15859 20.466124-20.466124l0-327.396585C898.625548 574.575174 889.456724 565.40635 878.159424 565.40635zM857.6933 892.802936l-286.464337 0 0-286.464337 286.464337 0L857.6933 892.802936z"
                                p-id="2230"></path>
                              <path
                                d="M430.606225 565.40635l-327.396585 0c-11.2973 0-20.466124 9.168824-20.466124 20.466124l0 327.396585c0 11.307533 9.168824 20.466124 20.466124 20.466124l327.396585 0c11.307533 0 20.466124-9.15859 20.466124-20.466124l0-327.396585C451.072349 574.575174 441.913758 565.40635 430.606225 565.40635zM410.140101 892.802936l-286.464337 0 0-286.464337 286.464337 0L410.140101 892.802936z"
                                p-id="2231"></path>
                              <path
                                d="M430.606225 115.601878l-327.396585 0c-11.2973 0-20.466124 9.15859-20.466124 20.466124l0 327.386352c0 11.307533 9.168824 20.466124 20.466124 20.466124l327.396585 0c11.307533 0 20.466124-9.15859 20.466124-20.466124l0-327.386352C451.072349 124.760468 441.913758 115.601878 430.606225 115.601878zM410.140101 442.98823l-286.464337 0 0-286.454104 286.464337 0L410.140101 442.98823z"
                                p-id="2232"></path>
                              <path
                                d="M965.529307 277.744745l-214.433814-214.433814c-3.837398-3.837398-9.046027-5.996574-14.46955-5.996574-5.433756 0-10.632151 2.159176-14.479783 5.996574l-214.433814 214.433814c-7.992021 7.992021-7.992021 20.957311 0 28.949332l214.433814 214.433814c4.001127 3.990894 9.240455 5.996574 14.479783 5.996574 5.229095 0 10.468422-2.00568 14.46955-5.996574l214.433814-214.433814c3.837398-3.837398 5.996574-9.046027 5.996574-14.46955C971.525881 286.790772 969.366705 281.582143 965.529307 277.744745zM736.625944 477.709009l-185.494715-185.484482 185.494715-185.494715 185.484482 185.494715L736.625944 477.709009z"
                                p-id="2233"></path>
                            </svg>`


export function openAddUserApp({ parentId, form, getList }) {
  let props = {
    submit,
  };
  if (form) {
    props.form = form
  }
  let option = {
    id: addApp.id,
    parentId,
    icon: appIcon,
    title: addApp.name,
    width: addApp.width,
    height: addApp.height,
    miniBtn: addApp.miniBtn,
    maxBtn: addApp.maxBtn,
    showHome: addApp.showHome,
    resize: addApp.resize,
    component: addApp,
    props
  }
  let addSystemAppWin = openSelfApp(option)

  function submit(form) {
    let apis = form && form.id ? userAppEdit : userAppAdd;
    apis(form).then(() => {
      // 关闭添加系统应用窗口
      addSystemAppWin.close();
      // 释放内存
      addSystemAppWin = null;
      if (typeof getList == "function") {
        getList();
      }
      initAPP();
    })
  }
  
  return addSystemAppWin
}


