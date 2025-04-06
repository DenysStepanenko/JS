// ===== ОБЪЕКТЫ В JAVASCRIPT =====
console.log("===== ОБЪЕКТЫ =====");

// === Создание объектов ===
console.log("\n--- Создание объектов ---");

// 1. Литерал объекта - самый распространенный способ
const personLiteral = {
  name: "Иван", // Свойство: ключ (строка или Symbol) + значение (любой тип)
  age: 30,
  city: "Москва",
  isAdmin: false,
  // Ключи с пробелами или спецсимволами - в кавычках
  "любимый цвет": "синий",
  // Метод - свойство, значением которого является функция
  greet: function () {
    // 'this' внутри метода указывает на сам объект (personLiteral)
    console.log(`Привет, меня зовут ${this.name}!`);
  },
  // Сокращенный синтаксис метода (ES6+)
  sayBye() {
    console.log(`Пока от ${this.name}!`);
  }
};
console.log("Литерал объекта:", personLiteral);

// 2. Конструктор Object (менее популярен)
const carConstructor = new Object();
carConstructor.brand = "Toyota";
carConstructor.model = "Camry";
carConstructor.year = 2022;
carConstructor.startEngine = function () {
  console.log(`${this.brand} ${this.model}: Двигатель запущен!`);
};
console.log("Объект через new Object():", carConstructor);

// 3. Функция-конструктор (для создания однотипных объектов)
function User(name, age) {
  // this = {}; (неявно создается пустой объект)
  this.name = name;
  this.age = age;
  this.isOnline = false;
  this.login = function () {
    this.isOnline = true;
    console.log(`${this.name} вошел в систему.`);
  };
  // return this; (неявно возвращается созданный объект)
}
// Вызов через 'new' создает новый объект и устанавливает 'this' внутри функции
const user1 = new User("Алиса", 28);
const user2 = new User("Борис", 35);
console.log("Объект через функцию-конструктор User:", user1);
user1.login();
console.log("user1 после login:", user1);
console.log("Другой объект User:", user2);

// 4. Object.create() - создание объекта с указанным прототипом
const animalProto = {
  eats: true,
  walk() {
    console.log(`${this.name || 'Животное'} гуляет.`);
  }
};
// Создаем объект rabbit, прототипом которого будет animalProto
const rabbit = Object.create(animalProto);
rabbit.name = "Кролик";
rabbit.jumps = true;
console.log("Объект через Object.create():", rabbit);
console.log("rabbit.eats (унаследовано):", rabbit.eats); // true
rabbit.walk(); // Кролик гуляет.

// === Доступ к свойствам объекта ===
console.log("\n--- Доступ к свойствам ---");

// 1. Через точку (.) - если ключ валидный идентификатор
console.log("Доступ через точку:");
console.log("  Имя:", personLiteral.name); // Иван
console.log("  Возраст:", personLiteral.age); // 30
personLiteral.greet(); // Вызов метода

// 2. Через квадратные скобки [] - если ключ в переменной или содержит спецсимволы
console.log("Доступ через скобки:");
console.log('  Имя:', personLiteral["name"]); // Иван
console.log('  Любимый цвет:', personLiteral["любимый цвет"]); // синий

let propertyKey = "city";
console.log(`  Свойство "${propertyKey}":`, personLiteral[propertyKey]); // Москва

// Доступ к несуществующему свойству возвращает undefined
console.log("  Несуществующее свойство 'job':", personLiteral.job); // undefined

// === Изменение объектов ===
console.log("\n--- Изменение объектов ---");

// 1. Добавление нового свойства
personLiteral.job = "Разработчик";
personLiteral["страна"] = "Россия";
console.log("Объект после добавления свойств:", personLiteral);

// 2. Изменение существующего свойства
personLiteral.age = 31;
personLiteral["любимый цвет"] = "зеленый";
console.log("Объект после изменения свойств:", personLiteral);

// 3. Удаление свойства
delete personLiteral.isAdmin;
delete personLiteral["страна"];
console.log("Объект после удаления свойств:", personLiteral);

// Внимание: объекты, объявленные через const, нельзя переприсвоить,
// но их свойства изменять МОЖНО!
// personLiteral = {}; // Ошибка! Assignment to constant variable.
personLiteral.name = "Иван Петров"; // Это можно

// === Перебор свойств объекта ===
console.log("\n--- Перебор свойств ---");

// 1. Цикл for...in (перебирает ключи, включая унаследованные)
console.log("Цикл for...in:");
// Добавим унаследованное свойство для примера
Object.prototype.inherited = "унаследовано";
for (const key in personLiteral) {
  // Проверка на собственное свойство объекта
  if (Object.hasOwnProperty.call(personLiteral, key)) {
    console.log(`  Собств. ключ: ${key}, Значение: ${personLiteral[key]}`);
  } else {
    console.log(`  (Унаслед. ключ: ${key}, Значение: ${personLiteral[key]})`);
  }
}
delete Object.prototype.inherited; // Убираем для чистоты

// 2. Object.keys() - массив собственных ключей объекта
const keys = Object.keys(personLiteral);
console.log("Object.keys():", keys);
keys.forEach(key => console.log(`  Ключ: ${key}`));

// 3. Object.values() - массив собственных значений объекта
const values = Object.values(personLiteral);
console.log("Object.values():", values);

// 4. Object.entries() - массив пар [ключ, значение] собственных свойств
const entries = Object.entries(personLiteral);
console.log("Object.entries():", entries);
entries.forEach(([key, value]) => { // Деструктуризация пары
  console.log(`  Пара: ${key} -> ${typeof value === 'function' ? 'function' : value}`);
});

// === Копирование объектов ===
console.log("\n--- Копирование объектов ---");
// Присваивание копирует ссылку, а не сам объект!
const objA = { id: 1 };
const objB = objA; // objB теперь ссылается на тот же объект, что и objA
objB.id = 2;
console.log("objA.id после изменения objB:", objA.id); // 2! Изменился и оригинал

// Поверхностное копирование (копируются только свойства первого уровня)
const original = { a: 1, b: { c: 2 } };

// Способ 1: Object.assign()
const shallowCopy1 = Object.assign({}, original);
shallowCopy1.a = 10; // Не влияет на original
shallowCopy1.b.c = 20; // Влияет на original.b.c!
console.log("Object.assign():");
console.log("  original:", original); // { a: 1, b: { c: 20 } }
console.log("  shallowCopy1:", shallowCopy1); // { a: 10, b: { c: 20 } }

// Способ 2: Spread оператор (...)
const shallowCopy2 = { ...original };
shallowCopy2.a = 100; // Не влияет на original
shallowCopy2.b.c = 200; // Влияет на original.b.c!
console.log("Spread (...):");
console.log("  original:", original); // { a: 1, b: { c: 200 } }
console.log("  shallowCopy2:", shallowCopy2); // { a: 100, b: { c: 200 } }

// Глубокое копирование (копируются все уровни вложенности)
// Простой способ для JSON-совместимых данных (без функций, Symbol, undefined)
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.a = 1000; // Не влияет на original
deepCopy.b.c = 2000; // Не влияет на original!
console.log("Глубокое копирование (JSON):");
console.log("  original:", original); // { a: 1, b: { c: 200 } } (осталось от shallowCopy2)
console.log("  deepCopy:", deepCopy); // { a: 1000, b: { c: 2000 } }
// Для сложного глубокого копирования нужны библиотеки (lodash) или рекурсивные функции

// === Деструктуризация объектов ===
console.log("\n--- Деструктуризация объектов ---");
const userProfile = {
  login: "alice",
  email: "alice@example.com",
  details: {
    firstName: "Алиса",
    lastName: "Смит"
  },
  status: "active"
};

// Базовая деструктуризация
const { login, email } = userProfile;
console.log("login:", login); // alice
console.log("email:", email); // alice@example.com

// Переименование переменных
const { login: userLogin, status: userStatus } = userProfile;
console.log("userLogin:", userLogin); // alice
console.log("userStatus:", userStatus); // active

// Значения по умолчанию
const { city = "Не указан", status = "inactive" } = userProfile;
console.log("city (по умолчанию):", city); // Не указан
console.log("status (из объекта):", status); // active

// Вложенная деструктуризация
const { details: { firstName, lastName } } = userProfile;
console.log("firstName:", firstName); // Алиса
console.log("lastName:", lastName); // Смит

// Rest оператор (...) для сбора оставшихся свойств
const { login: l, email: e, ...restDetails } = userProfile;
console.log("Rest детали:", restDetails); // { details: {..}, status: 'active' }

// === Геттеры и сеттеры ===
console.log("\n--- Геттеры и сеттеры ---");
// Специальные методы для контроля доступа к свойствам

const smartObject = {
  _temperature: 0, // "Приватное" свойство (соглашение)
  log: [],

  // Геттер для получения температуры в Цельсиях
  get temperatureC() {
    console.log("GET temperatureC");
    return this._temperature;
  },

  // Сеттер для установки температуры в Цельсиях
  set temperatureC(value) {
    console.log(`SET temperatureC = ${value}`);
    if (typeof value !== 'number') {
      throw new Error("Температура должна быть числом.");
    }
    this._temperature = value;
    this.log.push(`Установлена температура: ${value}°C`);
  },

  // Геттер для получения температуры в Фаренгейтах
  get temperatureF() {
    console.log("GET temperatureF");
    return this._temperature * 9 / 5 + 32;
  },

  // Сеттер для установки температуры через Фаренгейты
  set temperatureF(value) {
    console.log(`SET temperatureF = ${value}`);
    if (typeof value !== 'number') {
      throw new Error("Температура должна быть числом.");
    }
    this._temperature = (value - 32) * 5 / 9;
    this.log.push(`Установлена температура: ${value}°F (${this._temperature.toFixed(1)}°C)`);
  }
};

console.log("Чтение t°C:", smartObject.temperatureC); // Вызов геттера temperatureC
smartObject.temperatureC = 25; // Вызов сеттера temperatureC
console.log("Чтение t°F:", smartObject.temperatureF); // Вызов геттера temperatureF
smartObject.temperatureF = 77; // Вызов сеттера temperatureF
console.log("Чтение t°C после установки F:", smartObject.temperatureC);
console.log("Лог изменений:", smartObject.log);

try {
  smartObject.temperatureC = "жарко"; // Вызовет ошибку в сеттере
} catch (e) {
  console.error("Ошибка установки температуры:", e.message);
}

// === Прототипное наследование ===
// Механизм, позволяющий объектам наследовать свойства и методы от других объектов
// (Более подробно рассмотрено в разделе Объекты)
console.log("\n--- Прототипное наследование (кратко) ---");
const parent = {
  prop: "Свойство родителя",
  method() { console.log("Метод родителя"); }
};
const child = Object.create(parent); // child наследует от parent
child.ownProp = "Собственное свойство";

console.log("child.ownProp:", child.ownProp); // Собственное свойство
console.log("child.prop:", child.prop); // Свойство родителя (унаследовано)
child.method(); // Метод родителя (унаследован)

// Проверка прототипа
console.log("Прототип child:", Object.getPrototypeOf(child) === parent); // true
