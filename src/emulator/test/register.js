import Register from '../models/register.js';

const ax = new Register();
let al = ax.get('l');
al += 10;
ax.set(al, 'l');
console.log(`The value in ax is: ${ax.get()}`);
