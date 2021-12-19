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
    let local_t = t.getTime() - t.getTimezoneOffset()*60000 - 180*60000;
    let color_var = (local_t % 86400000 > 43200000) ? 1-(local_t % 21600000 / 21600000) : local_t % 21600000 / 21600000
    let color_phase = local_t % 86400000 / 21600000
    let colors = [[112,38,112], [13,117,248]];
    switch (Math.trunc(color_phase)) {
        case 0:
        case 2:
            currect = [colors[0][0]-Math.abs(colors[0][0], colors[1][0])*color_var, colors[0][1]+Math.abs(colors[0][1], colors[1][1])*color_var, colors[0][2]+Math.abs(colors[0][2], colors[1][2])*color_var];
            break;
        case 1:
            currect = colors[1]
            break;
        case 3:
            currect = colors[0]
    }
    document.getElementsByTagName("body")[0].style.backgroundColor = "#"+("0"+Math.round(currect[0]).toString(16)).slice(-2)+("0"+Math.round(currect[1]).toString(16)).slice(-2)+("0"+Math.round(currect[2]).toString(16)).slice(-2);
    var num_f = 3;
    document.getElementById("color").innerHTML = "R:" + currect[0].toFixed(num_f) + "; G:" + currect[1].toFixed(num_f) + "; B:" + currect[2].toFixed(num_f) + "; P:" + Math.trunc(color_phase) + "; V:" + (color_var*100).toFixed(num_f)+"%";
}

function initializeClock(endtime) {
    var num1 = document.getElementById('num1');
    var num2 = document.getElementById('num2');
    var num3 = document.getElementById('num3');
    var dots1 = document.getElementById('separator1');
    var dots2 = document.getElementById('separator2');
    var debug1 = document.getElementById('endtime');
    var debug2 = document.getElementById('left');
    var debug3 = document.getElementById('fulltimer');
    var time_to = new Date(endtime)
    var updateTime = 1000 / 60;

    function updateClock() {
        var t = getTimeRemaining(endtime);
        if (t.days > 0) {
            num1.innerHTML = t.days;
            dots1.innerHTML = "д. &#8201&#8201";
            dots1.style.fontSize = "3rem";
            dots1.style.width = dots2.style.width;
            num2.innerHTML = ('0' + t.hours).slice(-2);
            num3.innerHTML = ('0' + t.minutes).slice(-2);
            document.title = t.days + " дн. до НГ";
        }
        else if (t.hours > 0) {
            num1.innerHTML = ('0' + t.hours).slice(-2);
            dots1.innerHTML = ":";
            dots1.style.fontSize = "1em";
            num2.innerHTML = ('0' + t.minutes).slice(-2);
            num3.innerHTML = ('0' + t.seconds).slice(-2);
            document.title = t.hours + " ч. до НГ";
        }
        else if (t.total > 0) {
            num1.innerHTML = ('0' + t.minutes).slice(-2);
            num2.innerHTML = ('0' + t.seconds).slice(-2);
            num3.innerHTML = ('0' + t.seconds1_100).slice(-2);
            dots2.innerHTML = ".";
            document.title = (t.total <= 60000) ? t.seconds + " сек. до НГ" : t.minutes + " мин. до НГ";
        }
        else {
            num1.innerHTML = "00";
            num2.innerHTML = "00";
            num3.innerHTML = "00";
            clearInterval(timeinterval);
            document.title = "С новым годом!";
            document.getElementsByClassName("countdown-title")[0].innerHTML = "C новым годом!!!\nСчасливого " + future_year + " года!";
            setTimeout(function() {
                $('body').fireworks();
            });
        };
        dots1.style.color = ((t.seconds % 2) || (t.total <= 3600000) || (t.days > 0)) ? "#fff":"#fff0";
        dots2.style.color = ((t.seconds % 2) || (t.total <= 3600000)) ? "#fff":"#fff0";
        debug2.innerHTML = t.total.toLocaleString('ru');
        debug3.innerHTML = t.days + ':' + ('0' + t.hours).slice(-2) + ':' + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2) + '.' + ('00' + t.mseconds).slice(-3);
    }
    debug1.innerHTML = time_to.toLocaleString();
    updateClock();
    var timeinterval = setInterval(updateClock, updateTime);
}

let d_for_setting = new Date();
let future_year = (d_for_setting.getMonth() == 0 && d_for_setting.getDate() < 7) ? d_for_setting.getFullYear() : d_for_setting.getFullYear() + 1
document.getElementById("future_year").innerHTML = future_year;
initializeClock("Jan 01 " + future_year + " 00:00:00");
//initializeClock("Sep 23 2021 13:24:00");
setInterval(changeBackgroundColor, 1000/60);