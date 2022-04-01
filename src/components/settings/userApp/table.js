import { userAppList } from "@/apis/system/app.js";
import { reactive } from "vue"
export const appList = reactive([])

export function pullAppList() {
  return new Promise(async (next, error) => {
    try {
      let { data } = await userAppList();
      appList.splice(0, appList.length, ...data);
      next(data)
    } catch (err) {
      error(err)
    }
  })
}




