

function set_cookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
}

function get_cookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function write_timer(elements, time) {
  var seconds = (time % 60).toString().padStart(2, "0");
  var minutes = Math.floor(time / 60 % 60).toString().padStart(2, "0");
  var hours = Math.floor(time / 60 / 60).toString().padStart(2, "0");
  for (let element of elements) {
      if (element.getElementsByClassName('seconds').length && element.getElementsByClassName('minutes').length) {
          element.getElementsByClassName('seconds')[0].innerHTML = seconds;
          element.getElementsByClassName('minutes')[0].innerHTML = minutes;
          if (element.getElementsByClassName('hours').length)
              element.getElementsByClassName('hours')[0].innerHTML = hours;
      }
      else element.innerHTML = (hours == '00' ? '' : (hours + ':')) + minutes + ':' + seconds;
  }
}

function start_timer(className, minutes = 0) {
  let time;
  if (minutes) {
      time = minutes * 60;
      if (get_cookie("time")) {
          time = parseInt(get_cookie("time"), 10);
      } else {
          set_cookie("time", time, 1);
      }
  } else
      time = Math.floor(
          (new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1) - new Date()) / 1000
      );
  let elements = document.getElementsByClassName(className);
  write_timer(elements, time);
  const timerInterval = setInterval(() => {
      write_timer(elements, time);
      set_cookie("time", --time, 1);
      if (time < 0) {
          clearInterval(timerInterval);
          set_cookie("time", "", -1);
      }
  }, 1000);
}

start_timer("simple_timer", 25*60); 