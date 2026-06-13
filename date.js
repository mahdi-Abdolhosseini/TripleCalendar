const d = new Date();

// const jlyear = new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-latn', {
//     year: 'numeric',
//     //   month: '2-digit',
//     //   day: '2-digit'
// }).format(d);

function jalaliToday() {
    const date = new Date();
    let gy = parseInt(date.getFullYear());
    const gm = parseInt(date.getMonth()) + 1;
    const gd = parseInt(date.getDate());

    let jy, days;
    const gdm = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    if (gy > 1600) {
        jy = 979;
        gy -= 1600;
    } else {
        jy = 0;
        gy -= 621;
    }
    const gy2 = (gm > 2) ? (gy + 1) : gy;
    days = (365 * gy) +
        parseInt((gy2 + 3) / 4) -
        parseInt((gy2 + 99) / 100) +
        parseInt((gy2 + 399) / 400) -
        80 +
        gd +
        gdm[gm - 1];
    jy += 33 * parseInt(days / 12053);
    days %= 12053;
    jy += 4 * parseInt(days / 1461);
    days %= 1461;
    if (days > 365) {
        jy += parseInt((days - 1) / 365);
        days = (days - 1) % 365;
    }
    const jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));

    return {
        year: jy,
        month: jm,
        day: jd
    };
}

function buildCalendar(fullyear) {

    let mapped2 = {};
    let temp_m = [];
    jyear = fullyear.year;
    const F_JtoG = jalali_to_gregorian(jyear, 1, 1);

    let F_GtoH = [];
    // نقطه شروع در date1
    let m1 = 1; // ماه جلالی
    let d1 = 1; // روز جلالی

    // نقطه شروع در date2
    let m2 = parseInt(F_JtoG[1]); // ماه میلادی
    let d2 = parseInt(F_JtoG[2]); // روز میلادی

    // حرکت در سال قمری
    let myear = 0;
     Current_Myear = F_JtoG[0]; // سال میلادی
    // نام ماه های میلادی 0
    const Month_Names =
        { '1': "", '2': "", '3': "", '4': "", '5': "", '6': "", '7': "", '8': "", '9': "", '10': "", '11': "", '12': "" };

    const jalalidays = isLeapYear(jyear)
        ? [1, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30]
        : [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    const miladidays = [];
    miladidays[0] = isMiladiLeap(F_JtoG[0])
        ? [1, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        : [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    miladidays[1] = isMiladiLeap(F_JtoG[0] + 1)
        ? [1, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        : [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let index = 0; // nth day of week


    while (true) {
        /////////////////////////start new codes////////////////////////
        let activeDay = "false";
        if ( d1 == 1) {

             wday = getWeekDay(jyear, m1, 1);
            // console.log(wday);
            if (wday > 0) {
                activeDay = "true";
                let mm1 = m1, dd1 = d1;
                let mm2 = m2, dd2 = d2;
                let mmyear = myear;

                for (let i = 0; i <= wday - 1; i++) {
                    dd1--; dd2--; //dd3--;
                    if (dd1 < 1) {
                        mm1--;
                        if (mm1 < 1) {
                            mm1 = 12;
                            (isLeapYear(jyear - 1) == 1) ? dd1 = 30 : dd1 = 29;
                        } else {
                            dd1 = jalalidays[mm1];
                        }
                    }
                    if (dd2 < 1) {
                        mm2--;
                        if (mm2 < 1) {
                            mm2 = 12;
                            mmyear = 0;
                        }
                        dd2 = miladidays[mmyear][mm2];
                    }
                    holiday = "false";
                    // if (index == 6) holiday = "true";
                    temp_m[i] = "[\"" + trNum(dd1, 'fa') + "\"," + "\"" + dd2 + "\"," + "\"" + "0" + "\"," + holiday + ",\"" + "events" + "\"," + activeDay + ",[]]";
                    index = (index + 1) % 7;
                }
            }
        }

        if (temp_m.length > 0) {
            for (let i = (wday - 1); i >= 0; i--) {
                if (!mapped2[m1]) mapped2[m1] = [];
                mapped2[m1].push(temp_m[i]);
            }
            temp_m = [];
        }
        /////////////////////////end new codes/////////////////////////

        // اگر از انتهای سال شمسی رد شدیم، تموم
        if (m1 > 12) {
            break;
        }
        if (d2 > miladidays[myear][m2]) {
            m2++;
            d2 = 1;
            if (m2 > 12) {
                m2 = 1;
                myear = 1;
                Current_Myear++;
            }
        }
        holiday = "false";
        if (index == 6) holiday = "true";

        if (!mapped2[m1]) mapped2[m1] = [];
        mapped2[m1].push("[\"" + trNum(d1, 'fa') + "\"," + "\"" + d2 + "\"," + "\"" + "0" + "\"," + holiday + ",\"" + "events" + "\",false,[]]");

        d1++;
        d2++;
        // d3++;
        if (d1 > jalalidays[m1]) {

            /******************** start new codes *******************/
            wday2 = getWeekDay(jyear, m1, jalalidays[m1]);
            index = wday2;
            // console.log(m1,wday2);
            if (wday2 < 6) {
                activeDay = "true";
                let mm1 = m1, dd1 = d1;
                let mm2 = m2, dd2 = d2;
                // let mm3 = m3, dd3 = d3;
                let mmyear = myear;//,hhyear = hyear;

                for (let i = wday2 + 1; i <= 6; i++) {
                    if (dd1 > jalalidays[mm1]) {
                        mm1++;
                        if (mm1 > 12) { mm1 = 1; }
                        dd1 = 1;
                    }
                    if (dd2 > miladidays[mmyear][mm2]) {
                        mm2++;
                        if (mm2 > 12) { mm2 = 1; mmyear = 1; }
                        dd2 = 1;
                    }
                    holiday = "false";
                    if (index + 1 == 6) holiday = "true";
                    temp_m[i] = '["' + trNum(dd1, "fa") + "\"," + "\"" + dd2 + "\"," + "\"" + "0" + "\"," + holiday + ",\"" + "events" + "\"," + activeDay + ",[]]";
                    dd1++; dd2++;// dd3++;
                    index = (index + 1) % 7;
                }
            }
            if (temp_m.length > 0) {
                if (!mapped2[m1]) mapped2[m1] = [];
                for (let i = wday2 + 1; i <= 6; i++) {
                    mapped2[m1].push(temp_m[i]);
                }
                temp_m = [];
            }
            /////////////////////////end new codes/////////////////////////

            m1++; // main
            d1 = 1;
        }
        index = (index + 1) % 7; // روز چندم هفته
    } // while


    let calendarObject = [];
    for (let j = 0; j <= 11; j++) {
        calendarObject[j] = [];
        if (mapped2[j + 1]) {
            for (let m1 of mapped2[j + 1]) {
                calendarObject[j].push(JSON.parse(m1));
            }
        }
    }

    return {
        calendarObject,
    };
}
function trNum(num, lang) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, x => farsiDigits[x]);
}
function isJalaliLeap(year) {
    kab = ((((year + 12) % 33) % 4) == 1) ? 1 : 0;
    return kab;
}
function isMiladiLeap(year) {
    return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 1 : 0;
}
function mod(a, b) {
    return window.Math.abs(a - (b * window.Math.floor(a / b)));
}
const div = (a, b) => Math.floor(a / b);
function isLeapYear(jy) {
    const breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
    const bl = breaks.length;
    let jump = 0,
        leapJ = -14,
        jp = breaks[0],
        leap;
    for (let i = 1; i < bl; i += 1) {
        const jm = breaks[i];
        jump = jm - jp;
        if (jy < jm)
            break;
        leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
        jp = jm;
    }
    let n = jy - jp;
    if (jump - n < 6)
        n = n - jump + div(jump + 4, 33) * 33;
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) leap = 4;
    return leap === 0;
}
function getWeekDay(year, month, day) {
    const getDays = (month, day) => {
        if (month < 8) return (month - 1) * 31 + day;
        return 6 * 31 + (month - 7) * 30 + day;
    };
    const getDiffDays = (year1, month1, day1, year2, month2, day2) => {
        let diffDays = getDays(month2, day2) - getDays(month1, day1);
        const y1 = (year1 < year2) ? year1 : year2;
        const y2 = (year1 < year2) ? year2 : year1;
        for (let y = y1; y < y2; y++) {
            if (isLeapYear(y)) diffDays += (year1 < year2) ? 366 : -366;
            else diffDays += (year1 < year2) ? 365 : -365;
        }
        return diffDays;
    };
    return mod(getDiffDays(1392, 3, 25, year, month, day), 7);
}

// console.log(m['calendarObject']);
