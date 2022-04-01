import { reactive } from "vue";
import { uploadImage } from "@/utils/uploadFile.js";
import { userEditInfo, userEditPassword } from "@/apis/system/user.js"
import { Message } from "@/new-dream-plus/index.js";
export const userInfo = reactive({
  id: null,
  picture: null,
  account: null,
  name: null,
  email: null,
  phone: null,
  role_id: null,
  role_name: null
});
/**
 * 上传头像
 */
export function uploadPicture(e) {
  let el = e.target;
  let file = el.files[0];
  if (!file) {
    return;
  }
  uploadImage(file, `user/${userInfo.account}/picture`)
    .then((data) => {
      el.value = null;
      userInfo.picture = `${window.WINDOWS_CONFIG.cosUrl}/${data.Key}`
    })
    .catch(() => {
      el.value = null;
    });
}
/**
 * 提交修改信息
 */
export function submitEditInfo() {
  userEditInfo(userInfo).then(() => {
    new Message("保存成功！")
  })
}
/**
 * 提交修改密码
 */
export function submitEditPassword(form) {
  if (!form.oldPassword) {
    return Message.error("请填写旧密码！")
  }
  if (!form.newPassword || form.newPassword.length < 6) {
    return Message.error("新密码长度至少6位！")
  }
  if (form.newPassword != form.rPassword) {
    return Message.error("两次输入的密码不一致！")
  }
  userEditPassword(form).then(() => {
    new Message("修改成功！")
  })
}


export function setRole(params) {

}