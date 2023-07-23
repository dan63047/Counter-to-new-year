let relative_to_local = new Intl.RelativeTimeFormat("ru", {numeric: 'auto', style: 'long'});
let language_user = window.navigator ? (window.navigator.language ||window.navigator.systemLanguage || window.navigator.userLanguage) : "ru";
language_user = language_user.substr(0, 2).toLowerCase();
let language_site = (language_user == "ru" || language_user == "by" || language_user == "ua") ? "ru" : "en";
let timeinterval;
let d_for_setting = new Date();
let future_year = (d_for_setting.getMonth() == 0 && d_for_setting.getDate() < 7) ? d_for_setting.getFullYear() : d_for_setting.getFullYear() + 1
let event_code = "ny"
let site_h1 = document.getElementById("countdown-title")
let titles = {
    "ny-ru": "До нового " + future_year + " года осталось:",
    "ny-en": "Until New Year " + future_year + " left:",
    "ch-ru": "До рождества " + (future_year-1) + " осталось:",
    "ch-en": "Until Christmas " + (future_year-1) + " left:"
};
let titles_timer_gone = {
    "ny-ru": "C новым годом!!!\nСчасливого " + future_year + " года!",
    "ny-en": "Happy New Year!\nHave a great year " + future_year + "!",
    "ch-ru": "C рождеством!!!",
    "ch-en": "Merry Christmas!!!"
};
let short_titles = {
    "ny-ru": "НГ ",
    "ny-en": "NY ",
    "ch-ru": "Рождество ",
    "ch-en": "Christmas "
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

function eventSwitcher(event_c){
    event_code = event_c;
    switch(event_c){
        case "ny":
            clearInterval(timeinterval);
            interval = initializeClock("Jan 01 " + future_year + " 00:00:00");
            break;
        case "ch":
            clearInterval(timeinterval);
            interval = initializeClock('Dec 25 ' + new Date().getFullYear() + ' 00:00:00');
            break;
    }
}

function languageSwitcher(lang_code){
    switch (lang_code) {
        case "ru":
            $("#countdown-title-en").css("display", "none");
            $("#countdown-title-ru").css("display", "block");
            $("#about-modal-en").css("display", "none");
            $("#about-modal-ru").css("display", "block");
            $("#incard-en").css("display", "none");
            $("#incard-ru").css("display", "block");
            $("#about-en").css("display", "none");
            $("#about-ru").css("display", "block");
            $("#timer-mode-text-en").css("display", "none");
            $("#timer-mode-text-ru").css("display", "initial");
            $("#footer-en").css("display", "none");
            $("#footer-ru").css("display", "block");
            $(".event-names-ru").css("display", "block");
            $(".event-names-en").css("display", "none");
            $("#event-title-ru").css("display", "unset");
            $("#event-title-en").css("display", "none");
            language_site = "ru";
            break;
        case "en":
            $("#countdown-title-ru").css("display", "none");
            $("#countdown-title-en").css("display", "block");
            $("#about-modal-ru").css("display", "none");
            $("#about-modal-en").css("display", "block");
            $("#incard-ru").css("display", "none");
            $("#incard-en").css("display", "block");
            $("#about-ru").css("display", "none");
            $("#about-en").css("display", "block");
            $("#timer-mode-text-ru").css("display", "none");
            $("#timer-mode-text-en").css("display", "initial");
            $("#footer-ru").css("display", "none");
            $("#footer-en").css("display", "block");
            $(".event-names-ru").css("display", "none");
            $(".event-names-en").css("display", "block");
            $("#event-title-ru").css("display", "none");
            $("#event-title-en").css("display", "unset");
            language_site = "en";
            break;
    }
    relative_to_local = new Intl.RelativeTimeFormat(lang_code, {numeric: 'auto', style: 'long'});
    site_h1.innerHTML = titles[event_code+"-"+language_site]
}
languageSwitcher(language_site);

function hide_footer(){
    if ($("footer").css("display") == "none"){
        $("footer").css("display", "block")
    }else{
        $("footer").css("display", "none")
    }
}

let phases = {ru: ["Переходная (с ночи на день)", "Дневная", "Переходная (со дня на ночь)", "Ночная"], en: ["Transitional (from night to day)", "Day", "Transitional (from day to night)", "Night"]}
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
    var num_f = 2;
    document.getElementById("color").innerHTML = "R:" + currect[0].toFixed(num_f) + "; G:" + currect[1].toFixed(num_f) + "; B:" + currect[2].toFixed(num_f);
    document.getElementById("phase").innerHTML =  phases[language_site][Math.trunc(color_phase)]  + ", " + ((color_phase % 1)*100).toFixed(num_f)+"%"
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
    var debug4 =document.getElementById('curtime');
    var time_to = new Date(endtime)
    var updateTime = 1000 / 60;

    site_h1.innerHTML = titles[event_code+"-"+language_site]
    function updateClock() {
        var t = getTimeRemaining(endtime);
        if (t.days > 0) {
            num1.innerHTML = t.days;
            dots1.innerHTML = (language_site == "ru" ? "д. &#8201&#8201" : "d. &#8201&#8201");
            dots1.style.fontSize = "3vw";
            dots1.style.width = dots2.style.width;
            num2.innerHTML = ('0' + t.hours).slice(-2);
            num3.innerHTML = ('0' + t.minutes).slice(-2);
            document.title = short_titles[event_code+"-"+language_site] + relative_to_local.format(t.days, "day");
        }
        else if (t.hours > 0) {
            num1.innerHTML = ('0' + t.hours).slice(-2);
            dots1.innerHTML = ":";
            dots1.style.fontSize = "12vw";
            num2.innerHTML = ('0' + t.minutes).slice(-2);
            num3.innerHTML = ('0' + t.seconds).slice(-2);
            document.title = short_titles[event_code+"-"+language_site] + relative_to_local.format(t.hours, "hour");
        }
        else if (t.total > 0) {
            num1.innerHTML = ('0' + t.minutes).slice(-2);
            num2.innerHTML = ('0' + t.seconds).slice(-2);
            num3.innerHTML = ('0' + t.seconds1_100).slice(-2);
            dots2.innerHTML = ".";
            document.title = short_titles[event_code+"-"+language_site] + ((t.total <= 60000) ? relative_to_local.format(t.seconds, "second") : relative_to_local.format(t.minutes, "minute"));
        }
        else {
            num1.innerHTML = "00";
            num2.innerHTML = "00";
            num3.innerHTML = "00";
            clearInterval(timeinterval);
            document.title = site_h1.innerHTML = titles_timer_gone[event_code+"-"+language_site]
            setTimeout(function() {
                $('body').fireworks();
            });
        };
        dots1.style.opacity = ((t.seconds % 2) || (t.total <= 3600000) || (t.days > 0)) ? 1:0;
        dots2.style.opacity = ((t.seconds % 2) || (t.total <= 3600000)) ? 1:0;
        debug2.innerHTML = t.total.toLocaleString(language_site);
        debug3.innerHTML = t.days + ':' + ('0' + t.hours).slice(-2) + ':' + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2) + '.' + ('00' + t.mseconds).slice(-3);
        debug4.innerHTML = new Date().toLocaleString(language_site);
    }
    debug1.innerHTML = time_to.toLocaleString();
    updateClock();
    timeinterval = setInterval(updateClock, updateTime);
}

initializeClock("Jan 01 " + future_year + " 00:00:00");
//initializeClock("Nov 08 2022 23:20:00");
setInterval(changeBackgroundColor, 1000/60);