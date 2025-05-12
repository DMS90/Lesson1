let upper = 'JAVASCRIPT';
upper = upper.toLowerCase();
let lower = 'javascript';
lower = lower[0].toUpperCase() + lower.slice(1, lower.length);
console.log(lower);
function truncate(str, maxlength) {
    if (str?.length > maxlength) {
        str = str.slice(0, maxlength) + '...';
    }
    return str;
}

console.log(truncate("Lorem ipsum", 3));