for (let index = 2; index <= 10; index++) {
    if (index % 2 === 0) {
        console.log(index);
    }
}
console.log('---');
let index = 2;
while (index < 11) {
    if (index % 2 === 0) {
        console.log(index);
    }
    index++;
}
console.log('---');
const browser = 'Edge';
if (browser === 'Edge') {
    alert(`You've got the Edge!`);
} else if (
    browser === ' Chrome'
    || browser === 'FireFox'
    || browser === 'Safari'
    || browser === ' Opera'
) {
    alert('Okay we support these browsers too.');
} else {
    alert('We hope that this page looks ok!');
}

function browsers(browser) {
    if (browser === 'Edge') {
        alert(`You've got the Edge!`);
    }
    if (
        browser === ' Chrome'
        || browser === 'FireFox'
        || browser === 'Safari'
        || browser === ' Opera'
    ) {
        return alert('Okay we support these browsers too.');
    }

    return alert('We hope that this page looks ok!');
}
browsers('Edge');

console.log('---');

const number = prompt('Введите число от 0 до 3', '');

switch (number) {
    case '0':
        alert('Вы ввели число 0');
        break;
    case '1':
        alert('Вы ввели число 1');
        break;
    case '2':
    case '3':
        alert('Вы ввели 2 или 3');
        break;
    default:
        break;
}
