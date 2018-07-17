// const fizbaz = n => `${(n % 3 ? '' : 'fiz')}${(n % 5 ? '' : 'baz')}`
// for (let i=1; i<31 ; i++) console.log(i, fizbaz(i));

// const padEnd = (str, len, pad = ' ') => `${this.toString()}${pad.repeat(len - str.length)}`

// String.prototype.padEnd = function(len, pad = ' ') {
//   return `${this.toString()}${pad.repeat(len - this.length)}`
// }

// String.prototype.padEnd = function(l, p = ' ') {
//   return `${this.toString()}${p.repeat((s=l-this.length)/(k=p.length))}${p.slice(0, s % k)}`
// }
// console.log('0000'.padEnd(5, '123')) // результат 00001

// const c = Object.assign([], { a:'foo', b:'bar', length: 2 });
// for(const key of Object.values(c)) console.log(key);
// for(const key in c) console.log(c[key]);

// const uniq = a => a.reduce((p,i)=>~p.indexOf(i)?p:(p.push(i),p),[])
// const uniq = a => Object.keys(a.reduce((p,i)=>i in p?p:(p[i]=!0,p),{}))
// console.log(uniq([5,3,4,5,6]))

// const fibMy=n=>[...Array(n)].reduce(a=>({p:a.c,c:a.c+a.p||1}),{}).c
// for(let i=1; i<100; i++) console.log(fibMy(i))




// const multOf = (n, x) => x % n == 0;
// const multOf4 = x => multOf(4, x);
// const multOf100 = x => multOf(100, x);
// const multOf400 = x => multOf(400, x);
// // const isLeapYear = y => multOf4(y) && !multOf100(y) || multOf400(y);
// const isLeapYear = y => !(y&3||y&15&&!(y%25))
// // const isLeapYear2 = y => !(y&3)||!(y&15)
// // const isLeapYear2 = y => !(y&3 && !(y&15&3))
// const isLeapYearNew = y =>  !(y&3||y&15==(y%25))


// for(let i=1981; i<2250; i++) if( isLeapYear(i) && !isLeapYearNew(i) || !isLeapYear(i) && isLeapYearNew(i) ) console.log(i, isLeapYear(i), isLeapYearNew(i) )

// console.log(0&3)
// console.log(((2100&15)==(2100%1e2)))

const fib = (n, x=0, y=1) => (
  [...Array(n)].forEach(i => [ x, y ] = [ y, x+y ]), x
)


// var crypto = require('crypto');

// const secrets = new Uint32Array(2);
// secrets[1] = 3154502498
// secrets[2] = 1325200253
// // crypto.pseudoRandomBytes(secrets)
// const [key, value] = secrets;
// const vault = {
//   [key]: value
// };

// function json(x, y) {
//   Object.defineProperty(vault, x, { value: y });
//   const secure = JSON.stringify(Object.freeze(vault));
//   let copy;
//   try {
//     copy = eval(`(${secure})`);
//   } catch (e) {
//     // Try again...
//     copy = JSON.parse(secure);
//     return key in copy && copy[key] !== vault[key];
//   }
//   return void vault;
// }

// const traverseP = ( funcMap, arrayForPromises ) => Promice.all( arrayForPromises.map( funcMap ) );

const a = function() {
  console.log(a.caller);
}

const b = function() {
  a();
}

b(); // true
