import style from "./style.vue"
import { openSelfApp } from "@/views/methods/openApp.js"

export const styleIcon = `<svg  t="1646989430788"  class="icon"  viewBox="0 0 1024 1024"  version="1.1"  xmlns="http://www.w3.org/2000/svg"  p-id="1794"  width="100%"  height="100%">  <path    d="M475.2 903.2c-16.8 0-34.4-1.6-53.6-4l-4.8-0.8c-136-20.8-228.8-152.8-232.8-158.4-131.2-200-65.6-402.4 58.4-514.4 123.2-112 328.8-160 508.8-15.2C867.2 304 902.4 433.6 904 439.2v1.6c16.8 91.2 3.2 158.4-40.8 201.6-67.2 64.8-178.4 44-193.6 40.8-20.8-2.4-36 4-47.2 17.6-12 15.2-14.4 35.2-10.4 47.2 11.2 33.6 12.8 59.2 4.8 78.4-23.2 50.4-70.4 76.8-141.6 76.8z m-51.2-52.8l4.8 0.8c77.6 12 124.8-3.2 144-46.4 0-0.8 4-11.2-6.4-43.2-10.4-28.8-2.4-66.4 18.4-92 21.6-27.2 53.6-39.2 91.2-35.2l2.4 0.8c0.8 0 100 21.6 151.2-28 31.2-30.4 40.8-83.2 27.2-156.8-3.2-10.4-37.6-123.2-136.8-202.4-156.8-128-336.8-85.6-445.6 12.8C174.4 352 100.8 525.6 224 713.6c0.8 0 84.8 120 200 136.8z"  fill="currentColor"    p-id="3986"  />  <path d="M284 526.4m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" fill="currentColor" p-id="3987" />  <path d="M340 382.4m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" fill="currentColor" p-id="3988" />  <path d="M484 302.4m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" fill="currentColor" p-id="3989" />  <path d="M644 342.4m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" fill="currentColor" p-id="3990" />  <path d="M724 470.4m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z" fill="currentColor" p-id="3991" /></svg>`

export function openStyleSetting() {
  let option = {
    id: style.id,
    icon: styleIcon,
    title: style.name,
    width: style.width,
    height: style.height,
    miniBtn: style.miniBtn,
    maxBtn: style.maxBtn,
    resize: style.resize,
    component: style
  }
  return openSelfApp(option)
}

