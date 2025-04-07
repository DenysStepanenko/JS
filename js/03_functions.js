// ===== ФУНКЦИИ В JAVASCRIPT =====
console.log("===== ФУНКЦИИ =====");

// === Объявление функций ===
console.log("\n--- Объявление функций ---");

// Объявление функции (Function Declaration)
// Можно вызывать до объявления (hoisting)
console.log("Вызов greetDeclaration до объявления:", greetDeclaration("Мир"));

function greetDeclaration(name) {
  return `Привет (Declaration), ${name}!`;
}
console.log("Вызов greetDeclaration после объявления:", greetDeclaration("Вселенная"));

// Функциональное выражение (Function Expression)
// Нельзя вызывать до присваивания переменной
// console.log(greetExpression("Мир")); // Ошибка! greetExpression is not defined or not a function

const greetExpression = function (name) {
  return `Привет (Expression), ${name}!`;
};
console.log("Вызов greetExpression после присваивания:", greetExpression("Галактика"));

// Стрелочная функция (Arrow Function) - краткий синтаксис
// Также нельзя вызывать до присваивания
const greetArrow = (name) => `Привет (Arrow), ${name}!`;
console.log("Вызов greetArrow:", greetArrow("Планета"));

// Стрелочная функция с телом
const addArrow = (a, b) => {
  const result = a + b;
  return `Сумма ${a} и ${b} равна ${result}`;
};
console.log(addArrow(5, 7));

// === Параметры функций ===
console.log("\n--- Параметры функций ---");

// Параметры по умолчанию
function createUser(name = "Гость", age = 18, city = "Неизвестно") {
  return `Имя: ${name}, Возраст: ${age}, Город: ${city}`;
}

console.log("Параметры по умолчанию:");
console.log(createUser("Иван", 25, "Москва")); // Все аргументы переданы
console.log(createUser("Анна", 30));          // city будет по умолчанию
console.log(createUser("Петр"));              // age и city по умолчанию
console.log(createUser());                   // Все по умолчанию

// Объект arguments (устаревший, псевдомассив)
function showArgsLegacy() {
  console.log("Arguments (legacy):", arguments);
  console.log("Длина arguments:", arguments.length);
  // arguments не является настоящим массивом, нет методов вроде forEach
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'number') {
      sum += arguments[i];
    }
  }
  console.log("Сумма числовых аргументов (legacy):", sum);
}
showArgsLegacy(1, "hello", true, 5, 10);

// Rest-параметр (...) - современный способ собрать аргументы в массив
function sumRest(...numbers) {
  console.log("Rest параметр (numbers):", numbers); // Настоящий массив
  return numbers.reduce((total, current) => total + current, 0);
}
console.log("Сумма через Rest:", sumRest(1, 2, 3, 4)); // 10
console.log("Сумма через Rest (другой набор):", sumRest(10, 20)); // 30

// Комбинация обычных и Rest параметров
function multiplyFirstAndSumRest(multiplier, ...numbers) {
  const sumOfRest = numbers.reduce((sum, num) => sum + num, 0);
  return multiplier * sumOfRest;
}
console.log("multiplyFirstAndSumRest(2, 1, 2, 3):", multiplyFirstAndSumRest(2, 1, 2, 3)); // 2 * (1+2+3) = 12

// Деструктуризация параметров (объекты)
function displayPerson({ name, age, city = "Неизвестно", skills = [] }) {
  console.log(`--- Информация о человеке ---`);
  console.log(`  Имя: ${name}`);
  console.log(`  Возраст: ${age}`);
  console.log(`  Город: ${city}`);
  console.log(`  Навыки: ${skills.join(', ') || 'Нет данных'}`);
}

const personInfo = { name: "Иван", age: 30, city: "Москва", skills: ["JS", "HTML"] };
displayPerson(personInfo);
displayPerson({ name: "Анна", age: 25 }); // city и skills по умолчанию

// Деструктуризация параметров (массивы)
function displayCoordinates([x, y, z = 0]) {
  console.log(`Координаты: X=${x}, Y=${y}, Z=${z}`);
}
displayCoordinates([10, 20, 5]);
displayCoordinates([5, -3]); // z будет 0

// === Область видимости и замыкания ===
console.log("\n--- Область видимости и Замыкания ---");

// Глобальная, локальная (функциональная) и блочная область видимости
let globalVar = "Я глобальная"; // Глобальная

function scopeTest() {
  let functionVar = "Я функциональная"; // Локальная (функциональная)
  console.log("Внутри функции:", globalVar);
  console.log("Внутри функции:", functionVar);

  if (true) {
    let blockVar = "Я блочная (let)"; // Блочная
    const blockConst = "Я блочная (const)"; // Блочная
    var blockVarLegacy = "Я функциональная (var в блоке)"; // var не имеет блочной видимости!
    console.log("Внутри блока:", blockVar);
    console.log("Внутри блока:", blockConst);
  }
  console.log("Снаружи блока (var):", blockVarLegacy); // Доступно!
  // console.log(blockVar); // Ошибка! blockVar is not defined
  // console.log(blockConst); // Ошибка! blockConst is not defined
}
scopeTest();
// console.log(functionVar); // Ошибка! functionVar is not defined

// Замыкания (closures)
// Функция запоминает лексическое окружение, в котором она была создана
function createCounter() {
  let count = 0; // Эта переменная "замыкается"
  console.log("Счетчик создан!");

  return function increment() { // Внутренняя функция
    count++;
    console.log("Счетчик:", count);
    return count;
  };
}

const counter1 = createCounter(); // count = 0 для counter1
const counter2 = createCounter(); // count = 0 для counter2 (независимый)

counter1(); // Счетчик: 1
counter1(); // Счетчик: 2
counter2(); // Счетчик: 1 (независимый)
counter1(); // Счетчик: 3

// Пример практического использования замыканий: генератор приветствий
function createGreeting(greetingWord) {
  return function (name) {
    return `${greetingWord}, ${name}! Как дела?`;
  };
}

const sayHi = createGreeting("Привет");
const sayHello = createGreeting("Hello");

console.log(sayHi("Маша"));
console.log(sayHello("John"));

// === Рекурсия ===
console.log("\n--- Рекурсия ---");
// Функция вызывает саму себя

// Факториал числа (n! = n * (n-1) * ... * 1)
function factorial(n) {
  if (n < 0) return "Не определен для отрицательных чисел";
  if (n === 0 || n === 1) {
    return 1; // Базовый случай (условие выхода)
  }
  return n * factorial(n - 1); // Рекурсивный вызов
}
console.log("Факториал 5:", factorial(5)); // 120
console.log("Факториал 0:", factorial(0)); // 1

// Числа Фибоначчи (0, 1, 1, 2, 3, 5, 8, ...)
// F(n) = F(n-1) + F(n-2)
function fibonacci(n) {
  if (n < 0) return "Не определен";
  if (n <= 1) {
    return n; // Базовые случаи: F(0)=0, F(1)=1
  }
  return fibonacci(n - 1) + fibonacci(n - 2); // Два рекурсивных вызова
}
console.log("Фибоначчи(7):", fibonacci(7)); // 13
// Внимание: рекурсивный Фибоначчи очень неэффективен для больших n!

// === Функции высшего порядка ===
console.log("\n--- Функции высшего порядка ---");
// Функции, которые принимают другие функции как аргументы или возвращают их

// 1. Принятие функции как аргумента (callback)
function operateOnArray(arr, operation) {
  const result = [];
  for (const item of arr) {
    result.push(operation(item));
  }
  return result;
}
const numbersForHOF = [1, 2, 3, 4];
const doubleIt = (x) => x * 2;
const squareIt = (x) => x * x;

const doubledArray = operateOnArray(numbersForHOF, doubleIt);
const squaredArray = operateOnArray(numbersForHOF, squareIt);
console.log("Удвоенный массив:", doubledArray);
console.log("Квадраты чисел:", squaredArray);

// 2. Возврат функции из функции
function createPowerCalculator(exponent) {
  return function (base) {
    return Math.pow(base, exponent);
  };
}
const square = createPowerCalculator(2); // Функция возведения в квадрат
const cube = createPowerCalculator(3);   // Функция возведения в куб

console.log("square(5):", square(5)); // 25
console.log("cube(3):", cube(3));   // 27

// === Методы функций (call, apply, bind) ===
console.log("\n--- Методы функций (call, apply, bind) ---");

const person1 = { name: "Иван", city: "Москва" };
const person2 = { name: "Мария", city: "СПб" };

function introduce(greeting, punctuation) {
  console.log(`${greeting}, меня зовут ${this.name} из города ${this.city}${punctuation}`);
}

// call - вызывает функцию с указанным 'this' и аргументами через запятую
introduce.call(person1, "Привет", ".");
introduce.call(person2, "Здравствуйте", "!");

// apply - вызывает функцию с указанным 'this' и аргументами в виде массива
introduce.apply(person1, ["Добрый день", "..."]);
introduce.apply(person2, ["Bon jour", "!!!"]);

// bind - создает новую функцию с привязанным 'this' и, возможно, начальными аргументами
// Функция не вызывается сразу, а создается новая
const introduceIvan = introduce.bind(person1); // Привязываем this к person1
const introduceMariaWithHi = introduce.bind(person2, "Hi"); // Привязываем this и первый аргумент

introduceIvan("Всем привет", "."); // Вызываем новую функцию, передавая оставшиеся аргументы
introduceMariaWithHi("?"); // Вызываем другую новую функцию

// Пример с bind для методов объектов и потери контекста
const calculator = {
  value: 0,
  add(x) {
    this.value += x;
    console.log(`Значение: ${this.value}`);
  }
};

calculator.add(5); // Значение: 5

// const standaloneAdd = calculator.add;
// standaloneAdd(10); // Ошибка! Cannot read properties of undefined (reading 'value') - this потерян

const boundAdd = calculator.add.bind(calculator); // Привязываем this к calculator
boundAdd(10); // Значение: 15 (this теперь правильный)

// setTimeout(calculator.add, 1000, 20); // Ошибка this внутри setTimeout
setTimeout(calculator.add.bind(calculator), 100, 20); // Работает! Значение: 35


// ===== КОД ИЗ РАЗДЕЛА КОЛБЭК-ФУНКЦИИ =====
console.log("\n\n===== КОЛБЭК-ФУНКЦИИ =====");

// === Функция как значение (повтор для раздела) ===
console.log("\n--- Функция как значение (Callbacks) ---");
function greetCallbackExample(name) {
  return `Добро пожаловать, ${name}!`;
}
console.log("Вызов greetCallbackExample:", greetCallbackExample("Манго"));
console.log("Ссылка на greetCallbackExample:", greetCallbackExample);

function makePizzaTask1() {
  return "Ваша пицца готовится, пожалуйста, подождите.";
}
const resultPizza = makePizzaTask1();
const pointerPizza = makePizzaTask1;
console.log("Результат вызова makePizzaTask1:", resultPizza);
console.log("Ссылка на функцию makePizzaTask1:", pointerPizza);

// === Колбэки и ФВП (Callbacks) ===
console.log("\n--- Колбэки и ФВП (Callbacks) ---");
function greetClb(name) {
  console.log(`Добро пожаловать, ${name}!`);
}
function notifyClb(name) {
  console.log(`Уважаемый(ая) ${name}, ваша комната будет готова через 30 минут`);
}
function registerGuestClb(name, callback) {
  console.log(`Регистрируем гостя ${name}!`);
  callback(name);
}
registerGuestClb("Манго", greetClb);
registerGuestClb("Поли", notifyClb);

function deliverPizzaClb(pizzaName) { return `Доставляем пиццу ${pizzaName}.`; }
function makePizzaClb(pizzaName) { return `Пицца ${pizzaName} готовится, подождите...`; }
function makeMessageClb(pizzaName, callback) {
  return callback(pizzaName);
}
console.log("Сообщение 1:", makeMessageClb("Роял Гранд", makePizzaClb));
console.log("Сообщение 2:", makeMessageClb("Ультрасыр", deliverPizzaClb));

// === Инлайн-колбеки (Callbacks) ===
console.log("\n--- Инлайн-колбеки (Callbacks) ---");
function registerGuestInline(name, callback) {
  console.log(`Регистрируем гостя ${name}! (inline)`);
  callback(name);
}
registerGuestInline("Манго", function (guestName) {
  console.log(`Добро пожаловать инлайн, ${guestName}!`);
});
registerGuestInline("Поли", function notifyInline(guestName) {
  console.log(`Комната готова инлайн через 30 мин, ${guestName}`);
});

function makePizzaInlineTask(pizzaName, callback) {
  console.log(`Готовим пиццу инлайн: ${pizzaName}`);
  callback(pizzaName);
}
makePizzaInlineTask("Ультрасыр", function eatPizza(nameOfPizza) {
  console.log(`Едим пиццу инлайн: ${nameOfPizza}`);
});

// === Метод forEach() (Callbacks) ===
console.log("\n--- Метод forEach() (Callbacks) ---");
const numbersForEach = [5, 10, 15, 20, 25];
console.log("Массив для forEach:", numbersForEach);
console.log("Цикл for (сравнение):");
for (let i = 0; i < numbersForEach.length; i++) { console.log(`  Индекс ${i}, значение ${numbersForEach[i]}`); }
console.log("Метод forEach:");
numbersForEach.forEach(function (number, index) { console.log(`  Индекс ${index}, значение ${number}`); });

function calculateTotalPriceForEach(orderedItems) {
  let totalPrice = 0;
  orderedItems.forEach(function (item) { totalPrice += item; });
  return totalPrice;
}
console.log("Сумма [12, 85, 37, 4]:", calculateTotalPriceForEach([12, 85, 37, 4]));
console.log("Сумма [164, 48, 291]:", calculateTotalPriceForEach([164, 48, 291]));

function filterArrayForEach(numbers, value) {
  const filteredNumbers = [];
  numbers.forEach(function (number) {
    if (number > value) { filteredNumbers.push(number); }
  });
  return filteredNumbers;
}
console.log("Фильтр > 3 из [1, 2, 3, 4, 5]:", filterArrayForEach([1, 2, 3, 4, 5], 3));
console.log("Фильтр > 38 из [12, 24, 8, 41, 76]:", filterArrayForEach([12, 24, 8, 41, 76], 38));

console.log("\n===== КОНЕЦ РАЗДЕЛА ФУНКЦИИ (ПОКА ЧТО) =====");