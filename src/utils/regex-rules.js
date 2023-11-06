const mobileRegex = /^([4-9][0-9]{9,11})$/;
const dateFormatSlashYMD = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/;
const dateFormatHypenYMD = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
const pinCodeRegix = /^[1-9][0-9]{5}$/;
const rangeFormat = /^\d:\d$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
// const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const rangeDateFormatHypenYMD = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])):([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
const timeFormatHHMMSS = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/;

module.exports = {
    mobileRegex,
    dateFormatSlashYMD,
    dateFormatHypenYMD,
    pinCodeRegix,
    rangeFormat,
    emailRegex,
    rangeDateFormatHypenYMD,
    timeFormatHHMMSS
}
