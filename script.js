function DateTime() {
    var dateNow = new Date(),
        year = dateNow.getFullYear(),
        jsmonth = dateNow.getMonth(),
        month = [],
        day = dateNow.getDate(),
        hour = dateNow.getHours(),
        minutes = dateNow.getMinutes(),
        second = dateNow.getSeconds(),
        d = document.getElementById('clocks');

    month[0] = "января";
    month[1] = "февраля";
    month[2] = "марта";
    month[3] = "апреля";
    month[4] = "мая";
    month[5] = "июня";
    month[6] = "июля";
    month[7] = "августа";
    month[8] = "сентября";
    month[9] = "октября";
    month[10] = "ноября";
    month[11] = "декабря";

    d.innerHTML = "Сейчас " + day + " " + month[jsmonth] + " " + year + " года, " + hour + ":" + ('0' + minutes).slice(-2) + ":" + ('0' + second).slice(-2);
}

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.now();
    var mseconds = t % 1000;
    var seconds1_100 = Math.floor((t / 10) % 1000);
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
        'seconds1_100': seconds1_100,
        'mseconds': mseconds
    };
}

function changeBackgroundColor() {
    let t = new Date();
    let local_t = t.getTime() - t.getTimezoneOffset()*60000;
    let color_var = (local_t % 86400000 > 43200000) ? 1-(local_t % 21600000 / 21600000) : local_t % 21600000 / 21600000
    let color_phase = local_t % 86400000 / 21600000
    let colors = [[38,41,52], [13,117,248]];
    switch (Math.trunc(color_phase)) {
        case 0:
        case 2:
            currect = [colors[0][0]+((Math.max(colors[0][0], colors[1][0])-Math.min(colors[0][0], colors[1][0]))*color_var), colors[0][1]+((Math.max(colors[0][1], colors[1][1])-Math.min(colors[0][1], colors[1][1]))*color_var), colors[0][2]+((Math.max(colors[0][2], colors[1][2])-Math.min(colors[0][2], colors[1][2]))*color_var)];
            break;
        case 1:
            currect = colors[1]
            break;
        case 3:
            currect = colors[0]
    }
    document.getElementsByTagName("body")[0].style.backgroundColor = "#"+("0"+Math.round(currect[0]).toString(16)).slice(-2)+("0"+Math.round(currect[1]).toString(16)).slice(-2)+("0"+Math.round(currect[2]).toString(16)).slice(-2);
    document.getElementById("color_r").innerHTML = currect[0].toFixed(6)
    document.getElementById("color_g").innerHTML = currect[1].toFixed(6)
    document.getElementById("color_b").innerHTML = currect[2].toFixed(6)
    document.getElementById("color_phase").innerHTML = color_phase.toFixed(6)
    document.getElementById("color_var").innerHTML = color_var.toFixed(6)
}

function initializeClock(endtime) {
    var num1 = document.getElementById('num1');
    var num2 = document.getElementById('num2');
    var textnum1 = document.getElementById('text-num1');
    var textnum2 = document.getElementById('text-num2');
    var dots = document.getElementById('separator');
    var debug1 = document.getElementById('endtime');
    var debug2 = document.getElementById('left');
    var debug3 = document.getElementById('fulltimer');
    var updateTime = 1000 / 60;

    function updateClock() {
        var t = getTimeRemaining(endtime);
        if (t.days > 99){
            num1.innerHTML = t.days;
            num2.innerHTML = ('0' + t.hours).slice(-2);
            textnum1.innerHTML = 'Дней';
            textnum2.innerHTML = 'Часов';
            document.title = t.days + " дн. до НГ";
        }
        else if (t.days > 0) {
            num1.innerHTML = ('0' + t.days).slice(-2);
            num2.innerHTML = ('0' + t.hours).slice(-2);
            textnum1.innerHTML = 'Дней';
            textnum2.innerHTML = 'Часов';
            document.title = t.days + " дн. до НГ";
        }
        else if (t.hours > 0) {
            num1.innerHTML = ('0' + t.hours).slice(-2);
            num2.innerHTML = ('0' + t.minutes).slice(-2);
            textnum1.innerHTML = 'Часов';
            textnum2.innerHTML = 'Минут';
            document.title = t.hours + " ч. до НГ";
        }
        else if (t.minutes > 0) {
            num1.innerHTML = ('0' + t.minutes).slice(-2);
            num2.innerHTML = ('0' + t.seconds).slice(-2);
            textnum1.innerHTML = 'Минут';
            textnum2.innerHTML = 'Секунд';
            document.title = t.minutes + " мин. до НГ";
        }
        else if (t.total > 0) {
            num1.innerHTML = ('0' + t.seconds).slice(-2);
            num2.innerHTML = ('0' + t.seconds1_100).slice(-2);
            dots.innerHTML = "&#8201 . &#8201"
            textnum1.innerHTML = '';
            textnum2.innerHTML = '';
            document.title = t.seconds + " сек. до НГ";
        }
        else {
            num1.innerHTML = "00";
            num2.innerHTML = "00";
            clearInterval(timeinterval);
            document.title = "С новым годом!";
            var congrats = document.getElementById("congrats");
            congrats.innerHTML = "C новым годом!!!\nСчасливого " + future_year + " года!";
        };
        dots.style.color = ((t.seconds % 2) || (t.total <= 60000)) ? "#fff":"#fff0";
        changeBackgroundColor();
        debug2.innerHTML = t.total.toLocaleString('ru');
        debug3.innerHTML = t.days + ':' + ('0' + t.hours).slice(-2) + ':' + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2) + '.' + ('00' + t.mseconds).slice(-3);
    }
    debug1.innerHTML = endtime;
    updateClock();
    var timeinterval = setInterval(updateClock, updateTime);
}

let d_for_setting = new Date();
let future_year = (d_for_setting.getMonth() == 0 && d_for_setting.getDate() < 7) ? d_for_setting.getFullYear() : d_for_setting.getFullYear() + 1
document.getElementById("future_year").innerHTML = future_year;
initializeClock("Jan 01 " + future_year + " 00:00:00");
// initializeClock("Feb 12 2021 22:03:00");
DateTime();
setInterval(DateTime, 1000 / 60);