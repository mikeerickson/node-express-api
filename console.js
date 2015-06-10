var console = require('better-console');

var myObject = {fname: 'Mike', lname: 'Erickson', phone: '7144544236'};

console.log("This is a log information");
console.error('Error');
console.warn("Warning!");
console.info("Information");
// console.table([ [1,2], [3,4] ]);
console.time("Timer");
console.log(myObject);
console.timeEnd("Timer");
console.dir(myObject);