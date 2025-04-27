/** Проверяет, что можно все настройки выбраны правильно и можно начанить тренировку */
function check() {
  var operations = oproper();
  if (operations == "") {
    alert("Вы не выбрали ни одного знака операции");
  } else {
    var startDiv = document.querySelector(".start");
    startDiv.style.display = "none";
    setTimeout(training, 100);
  }
}

/** Возвращает, какие знаки операций надо включать в тренировку */
function oproper() {
  var operations = [];
  if (document.getElementById("plus").checked) {
    operations.push("+");
  }
  if (document.getElementById("minus").checked) {
    operations.push("-");
  }
  if (document.getElementById("chastnoe").checked) {
    operations.push("/");
  }
  if (document.getElementById("umnozhemie").checked) {
    operations.push("*");
  }
  return operations;
}

/** Основная функция, которая запускается, когда пользователь нажимает на кнопку */
function training() {
  // Инициализация переменных
  var x, // Первое число
      y, // Второе число
      i = 0, // Вспомогательная переменная для циклов
      op, // Текущая операция (сложение деление и т. д.)
      res, // Текущий результат, который должен получиться
      answer, // Текущий ответ, который ввел пользователь
      answerStr, // Текущий ответ, который ввел пользователь, но в виде строки (так нужно)
      rights = [], // Массив с правильными ответами
      errors = [], // Массив с неверными ответами
      operations = oproper(), // Массив операций, которые выбрал пользователь
      amount = document.getElementById("amount-range-number").value, // Количество примеров
      f = +document.getElementById("first-range-number").value, // Нижняя граница диапазона
      s = +document.getElementById("second-range-number").value; // Верхняя граница диапазона

  //----- Вспомогательные функции

  // Округляет до 1 знака после запятой
  function restofix() {
    if (op == "/") {
      var restofix = res.toFixed(1);
    } else {
      restofix = res;
    }
    return restofix;
  }

  // Вычисляет текущий результат, который должен получиться
  function action(op) {
    if (op == "+") {
      res = x + y;
    } else if (op == "-") {
      res = x - y;
    } else if (op == "*") {
      res = x * y;
    } else {
      res = x / y;
    }
    return res;
  }

  // Вычисляет случайное число в заданном диапазоне
  function random(min, max) {
    var length = max - min + 1;
    var rand = Math.floor(Math.random() * length) + min;
    return rand;
  }

  // Гланвый цикл тренажера, по очереди показываем примеры и считываем ответы
  while (i != amount) {
    i++;
    x = random(f, s);
    y = random(f, s);
    op = operations[random(0, operations.length - 1)];
    res = action(op);

    // Проверка на правильность ввода ответа (пользователь может ввести абракадабру)
    do {
      answerStr = prompt("№" + i + ".   " + x + op + y + " = ?");
      answer = +answerStr;
    } while (answerStr == "" || isNaN(answer));

    // Проверка того, првильный ответ или нет
    if (answer.toFixed(1) == res.toFixed(1)) {
      rights.push(x + op + y + "=" + restofix());
    } else {
      errors.push(x + op + y + "=" + restofix() + ", а не " + answer);
    }

    // После ввода ответа, выдается новый пример.
  }
  // Цикл закончен, все ответы введены

  // Далее читаем и показываем процент правильных/неправильных ответов
  var progress_ok = document.querySelector(".progress-answered-ok");
  var progress_bad = document.querySelector(".progress-answered-bad");
  progress_ok.classList.remove("progress-answered-bad-0");
  progress_bad.classList.remove("progress-answered-ok-0");

  var right = rights.length;
  var error = errors.length;

  if (right != 0) {
    progress_ok.textContent =
      ((100 / (error + right)) * right).toFixed(1) + "%";
    progress_ok.style.width = (100 / (error + right)) * right + "%";
  } else {
    progress_ok.textContent = "";
    progress_ok.style.width = 0 + "%";
    progress_bad.classList.add("progress-answered-ok-0");
  }
  if (error != 0) {
    progress_bad.textContent =
      ((100 / (error + right)) * error).toFixed(1) + "%";
    progress_bad.style.width = (100 / (error + right)) * error + "%";
  } else {
    progress_bad.textContent = "";
    progress_bad.style.width = 0 + "%";
    progress_ok.classList.add("progress-answered-bad-0");
  }

  // Показываем правильные/неправильные ответы
  document.querySelector(".right-answers-count").innerHTML = right;
  document.querySelector(".error-answers-count").innerHTML = error;

  var divRights = document.querySelector(".right-variants-list");
  divRights.innerHTML = "";

  for (i = 0; i < rights.length; i++) {
    divRights.innerHTML +=
      '<li><span class="normal-text">' + rights[i] + "</span></li>";
  }

  var divErrors = document.querySelector(".error-variants-list");
  divErrors.innerHTML = "";

  for (i = 0; i < errors.length; i++) {
    divErrors.innerHTML +=
      '<li><span class="normal-text">' + errors[i] + "</span></li>";
  }

  // Показываем блок, с предложением пройти тренировку ещё раз
  var start = document.querySelector(".start");
  var start_button = document.querySelector(".start-button");
  start.style.animation = "none";
  start_button.value = "Пройти еще раз";
  start.innerHTML =
    '<p class="start-text">Чтобы пройти тренажер еще раз, нажмите на эту кнопку:<span style="margin-right: 6px;"></span><input class="start-button" type="button" value="Пройти еще раз" OnClick="check();"></p>';
  start.style.display = "block";
}
