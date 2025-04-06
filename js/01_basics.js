// ===== ОСНОВЫ JAVASCRIPT =====

// === Переменные и типы данных ===

// Объявление переменных
let message = "Привет"; // переменная, значение может меняться
const PI = 3.14;        // константа, значение не может быть изменено
var oldWay = "Устаревший способ"; // устаревший способ объявления переменных

// Основные типы данных
let string = "Это строка";              // Строка (String)
let number = 42;                        // Число (Number)
let bigInt = 9007199254740991n;         // BigInt для очень больших чисел
let boolean = true;                     // Логический тип (Boolean): true или false
let nullValue = null;                   // Null - специальное значение "ничего"
let undefinedValue;                     // Undefined - значение не присвоено
let object = { name: "John", age: 30 }; // Объект (Object)
let array = [1, 2, 3];                  // Массив (Array) - особый тип объекта
let func = function () { return "Hi"; }; // Функция - тоже объект

// Проверка типа (вывод в консоль)
console.log("--- Типы данных ---");
console.log(typeof string);      // "string"
console.log(typeof number);      // "number"
console.log(typeof boolean);     // "boolean"
console.log(typeof nullValue);   // "object" (историческая ошибка в JavaScript)
console.log(typeof undefinedValue); // "undefined"
console.log(typeof object);      // "object"
console.log(typeof array);       // "object" (массивы - это объекты)
console.log(typeof func);        // "function"

// === Операторы ===
console.log("\n--- Операторы ---");

// Арифметические операторы
let sum = 5 + 3;        // 8 (сложение)
let difference = 5 - 3;  // 2 (вычитание)
let product = 5 * 3;     // 15 (умножение)
let quotient = 10 / 2;   // 5 (деление)
let remainder = 10 % 3;  // 1 (остаток от деления)
let power = 2 ** 3;      // 8 (возведение в степень)
console.log("Арифметика:", sum, difference, product, quotient, remainder, power);

// Операторы сравнения
console.log("Сравнение:");
console.log("5 > 3:", 5 > 3);      // true (больше)
console.log("5 < 3:", 5 < 3);      // false (меньше)
console.log("5 >= 5:", 5 >= 5);     // true (больше или равно)
console.log("5 <= 3:", 5 <= 3);     // false (меньше или равно)
console.log('5 == "5":', 5 == "5");   // true (равно с приведением типов)
console.log('5 === "5":', 5 === "5");  // false (строго равно, без приведения типов)
console.log('5 != "5":', 5 != "5");   // false (не равно с приведением типов)
console.log('5 !== "5":', 5 !== "5");  // true (строго не равно)

// Логические операторы
console.log("Логика:");
console.log("true && false:", true && false); // false (логическое И)
console.log("true || false:", true || false); // true (логическое ИЛИ)
console.log("!true:", !true);         // false (логическое НЕ)

// Инкремент и декремент
console.log("Инкремент/Декремент:");
let i = 5;
console.log("i++:", i++);  // 5 (постфиксный инкремент: возвращает, потом увеличивает)
console.log("i после i++:", i);    // 6
let j = 5;
console.log("++j:", ++j);  // 6 (префиксный инкремент: увеличивает, потом возвращает)
console.log("j после ++j:", j);    // 6
// Аналогично для декремента (i--, --i)

// === Строки и шаблонные строки ===
console.log("\n--- Строки ---");

// Конкатенация строк
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName; // "John Doe"
console.log("Полное имя:", fullName);

// Шаблонные строки (template literals)
let greeting = `Привет, ${firstName} ${lastName}!`; // "Привет, John Doe!"
let calculation = `2 + 2 = ${2 + 2}`; // "2 + 2 = 4"
console.log("Шаблонная строка:", greeting);
console.log("Вычисление в строке:", calculation);

// Многострочные шаблонные строки
let multiline = `Это первая строка.
Это вторая строка.
А это третья строка.`;
console.log("Многострочная строка:\n", multiline);

// Методы строк
let text = "Привет, мир!";
console.log("Длина строки:", text.length);            // 12
console.log("Верхний регистр:", text.toUpperCase());     // "ПРИВЕТ, МИР!"
console.log("Нижний регистр:", text.toLowerCase());     // "привет, мир!"
console.log('Поиск "мир":', text.indexOf("мир"));    // 8 (позиция подстроки)
console.log('Содержит "мир":', text.includes("мир"));   // true
console.log('Начинается с "Привет":', text.startsWith("Привет")); // true
console.log('Заканчивается на "!":', text.endsWith("!"));     // true
console.log('Извлечение "мир":', text.slice(8, 11));      // "мир"
console.log('Замена "мир":', text.replace("мир", "JavaScript")); // "Привет, JavaScript!"
console.log('Разбиение по ", ":', text.split(", "));       // ["Привет", "мир!"]
console.log('Удаление пробелов:', "   текст   ".trim()); // "текст"

// === Условные конструкции ===
console.log("\n--- Условия ---");

// if-else
let age = 20;
if (age >= 18) {
  console.log("Вы совершеннолетний");
} else {
  console.log("Вы несовершеннолетний");
}

// if-else if-else
let score = 85;
if (score >= 90) {
  console.log("Оценка: Отлично");
} else if (score >= 70) {
  console.log("Оценка: Хорошо");
} else if (score >= 50) {
  console.log("Оценка: Удовлетворительно");
} else {
  console.log("Оценка: Неудовлетворительно");
}

// Тернарный оператор
let status = age >= 18 ? "Взрослый" : "Ребенок";
console.log("Статус:", status); // "Взрослый"

// switch
let day = 3;
let dayName;
switch (day) {
  case 1: dayName = "Понедельник"; break;
  case 2: dayName = "Вторник"; break;
  case 3: dayName = "Среда"; break;
  case 4: dayName = "Четверг"; break;
  case 5: dayName = "Пятница"; break;
  case 6: dayName = "Суббота"; break;
  case 7: dayName = "Воскресенье"; break;
  default: dayName = "Неизвестный день";
}
console.log("День недели:", dayName); // Среда

// === Преобразование типов ===
console.log("\n--- Преобразование типов ---");

// Строковое преобразование
let num = 42;
let strFromNum = String(num); // "42"
let strFromBool = String(true); // "true"
console.log("Число в строку:", strFromNum, typeof strFromNum);
console.log("Булево в строку:", strFromBool, typeof strFromBool);

// Числовое преобразование
let str = "42";
let strFloat = "42.5";
let strInvalid = "Привет";
let numFromStr = Number(str);   // 42
let numFromFloat = Number(strFloat); // 42.5
let numFromInvalid = Number(strInvalid); // NaN (Not a Number)
let numFromBoolTrue = Number(true); // 1
let numFromBoolFalse = Number(false); // 0
console.log('Строка "42" в число:', numFromStr, typeof numFromStr);
console.log('Строка "42.5" в число:', numFromFloat, typeof numFromFloat);
console.log('Строка "Привет" в число:', numFromInvalid, typeof numFromInvalid);
console.log("true в число:", numFromBoolTrue);
console.log("false в число:", numFromBoolFalse);
console.log("parseInt('42px'):", parseInt("42px")); // 42
console.log("parseFloat('42.5em'):", parseFloat("42.5em")); // 42.5

// Логическое преобразование
console.log("Логическое преобразование:");
console.log("Boolean(1):", Boolean(1));     // true
console.log("Boolean(0):", Boolean(0));     // false
console.log('Boolean(""):', Boolean(""));    // false (пустая строка)
console.log('Boolean("text"):', Boolean("text")); // true (непустая строка)
console.log("Boolean(null):", Boolean(null));  // false
console.log("Boolean(undefined):", Boolean(undefined)); // false
console.log("Boolean(NaN):", Boolean(NaN)); // false
console.log("Boolean({}):", Boolean({})); // true (любой объект)
console.log("Boolean([]):", Boolean([])); // true (любой массив)
