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