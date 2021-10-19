const bcrypt = require('bcrypt');
const saltRounds = 10;

const myPlaintextPassword = 'anova';
var codedPassword ;

const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

codedPassword = hash;
// alright

console.log(codedPassword);

