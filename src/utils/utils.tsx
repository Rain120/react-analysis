/*
 * @Author: Rain120 
 * @Date: 2018-09-07 10:20:50 
 * @Last Modified by: Rain120
 * @Last Modified time: 2018-09-07 11:25:35
 */
export function isEmptyObject(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

// export function formatRange (range) {
//   let value = getRangeValue(range);
//   let symbol = getSymbol(range);
//   return [
//     getRange(value[0], symbol[0]),
//     getRange(value[1], symbol[1]),
//   ]
// }

// function getRangeValue(str) {
//   let ret;
//   str.replace(/[^(\(|[)\)]+(?=\)|\])/g, ($1) => {
//     ret = $1.split(',')
//   });
//   return ret.map(item => +item)
// };

// function getSymbol(str) {
//   let s = str.replace(/\"(.*)\"/g);
//   return [s[0], s[s.length - 1]]
// }

// function getRange($val, $symbol) {
//   switch($symbol) {
//     case '(':
//       break;
//       case '(':
//         break;
//       case '(':
//         break;
//       case '(':
//         break;
//       default:
//         break;
//   }
// }