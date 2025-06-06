export function linesUtil(index) {
        const rows = [];
for (let i = 0; i < 9; i++) {
  const row = [];
  for (let j = 0; j < 9; j++) {
    row.push(i * 9 + j);
  }
  rows.push(row);
}
const columns = [];
for (let i = 0; i < 9; i++) {
  const col = [];
  for (let j = 0; j < 9; j++) {
    col.push(i + j * 9);
  }
  columns.push(col);
}
 
let row = rows.find(arr=>arr.includes(index))
let column = columns.find(arr=>arr.includes(index))
const combined = [...row, ...column].filter(val => val !== index);
  const unique = [...new Set(combined)];

  return unique;
}