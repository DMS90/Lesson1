const user = {
    name: 'John',
    surname: 'Smith'
};
user.name = 'Pete';
console.log(user);
delete user.name;
console.log(user);

function isEmpty(obj) {
    return Object.keys(obj ?? {}).length === 0;
}

console.log(isEmpty({}));