// console.table(Array.from({length:12},(_,i)=>i).reduce((s,x,i)=>(s[k=~~(i/3)]=[...(k in s?s[k]:[]),x],s),[]))
// console.log((l=(f,...a)=>a.length?l(...a):f)(...Array.from({length:51},(_,i)=>i)));

// var arr = Array.from({length:3}, x=>({}));
// arr[0][1] = 1;
// console.log(arr); // [ { '1': 1 }, {}, {} ]

// console.log((g=(x, y)=>y?g(y,x%y):x)(24,16)) // 8

// var a = 5, b = 10
// a=b+((b=a)&&0)
// console.log(a, b)


// const c=(f,s)=>f>s?f:s;
// const r=f=>a=>a.reduce(f);
// const g=r(c);
// console.log(g(['a', 'b', 'f', 'd']))


// console.log(last)

// console.table(arr2)

// while (arr1.length) {
//   console.log(arr1)
//   arr2.push(arr1.splice(0,3));
// }
// console.table(arr2)

let [{b}] = [{a:3, b:4} , {c: 5, d: 6}];
console.log(val1, b, c) // 2, 4, 5, 6
