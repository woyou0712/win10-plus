import { reactive, ref } from "vue";

export const colorList = reactive([]);
export const sizeNumber = ref(2);
export const grade = ref(0);

// 差异色下标
let diffIndex = {
  row: 0,
  col: 0
};


export function setList(num) {
  colorList.splice(0)
  if ([2, 4, 8, 16].indexOf(num) == -1) {
    num = 2
  }
  let r = parseInt(Math.random() * 256), g = parseInt(Math.random() * 256), b = parseInt(Math.random() * 256);
  let color = `rgb(${r},${g},${b})`, diffColor = `rgb(${Math.abs(r - __difference())},${Math.abs(g - __difference())},${Math.abs(b - __difference())})`;
  // 随机下标位置产生差异色
  diffIndex['row'] = parseInt(Math.random() * num);
  diffIndex['col'] = parseInt(Math.random() * num);
  for (let i = 0; i < num; i++) {
    let row = [];
    for (let l = 0; l < num; l++) {
      if (diffIndex['row'] === i && diffIndex['col'] == l) {
        row.push(diffColor)
      } else {
        row.push(color)
      }
    }
    colorList.push(row)
  }
  if (sizeNumber.value < 16) {
    sizeNumber.value *= 2
  }
}


export function submit(row, col) {
  if (row != diffIndex.row || col != diffIndex.col) {
    return
  }
  grade.value += 1
  setList(sizeNumber.value);
}

function __difference() {
  return parseInt(Math.random() * 30 + 5);
}