
const durationForm = document.querySelector('.durationForm');
const durationInput = document.querySelector('.durationInput');
const durationOutput = document.querySelector('.durationOutput');

const fotmatToArr = (filteredObj) => {
    let outArr = [];

    for (key in filteredObj) {
        if (filteredObj[key] > 1) {
            outArr.push(`${filteredObj[key]} ${key}s`);
        } else {
            outArr.push(`${filteredObj[key]} ${key}`);
        }
    }

    return outArr;
};

const filterObj = (timeFormatObj) => {
    Object.filter = (obj, predicate) =>
        Object.keys(obj)
            .filter(key => predicate(obj[key]))
            .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

    return Object.filter(timeFormatObj, time => time > 0);
};

const formatToObj = (inputSec) => {
    const outSec = Math.floor(inputSec % 60);
    const outMin = Math.floor((inputSec / 60) % 60);
    const outHour = Math.floor(inputSec / (60 * 60) % 24);
    const outDay = Math.floor(inputSec / (60 * 60 * 24) % 365);
    const outYear = Math.floor(inputSec / (60 * 60 * 24 * 365));

    return {
        year: outYear,
        day: outDay,
        hour: outHour,
        minute: outMin,
        second: outSec
    };
};

const formatDuration = (inputSec) => {
    const _inputSec = parseInt(inputSec);

    if (_inputSec < 0) {
        return 'Negative integer cannot be processed.';
    } else if (_inputSec === 0) {
        return 'now';
    }

    const timeFormatObj = formatToObj(_inputSec);
    const filteredObj = filterObj(timeFormatObj);
    const timeFormatArr = fotmatToArr(filteredObj);

    if (timeFormatArr.length === 1) {
        return timeFormatArr[0];
    } else if (timeFormatArr.length === 2) {
        return `${timeFormatArr[0]} and ${timeFormatArr[1]}`;
    } else {
        let returnStr = timeFormatArr[0];
        for (let i = 1; i < timeFormatArr.length - 1; i += 1) {
            returnStr = returnStr.concat(', ', timeFormatArr[i]);
        }
        return returnStr.concat(' and ', timeFormatArr[timeFormatArr.length - 1]);
    }
};

const formSubmit = (event) => {
    event.preventDefault();
    durationOutput.innerHTML = formatDuration(durationInput.value);
}

const init = () => {
    durationForm.addEventListener('submit', formSubmit);
}

init();