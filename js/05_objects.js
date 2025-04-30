// ===== ОБЪЕКТЫ В JAVASCRIPT =====
// Выводим заголовок секции в консоль для наглядности.
console.log("===== ОБЪЕКТЫ =====");

// === Создание объектов ===
// Выводим подзаголовок в консоль.
console.log("\n--- Создание объектов ---");

// --- 1. Литерал объекта ---
// Самый простой и часто используемый способ. Объект создается с помощью фигурных скобок {}.
console.log("1. Литерал объекта:");
const personLiteral = { // Объявляем константу и присваиваем ей новый объект.
  // Внутри скобок перечисляем свойства в формате "ключ: значение", через запятую.
  name: "Иван",       // Ключ 'name', значение - строка "Иван".
  age: 30,            // Ключ 'age', значение - число 30.
  city: "Москва",     // Ключ 'city', значение - строка "Москва".
  isAdmin: false,     // Ключ 'isAdmin', значение - булево false.

  // Если ключ содержит пробелы, дефисы или другие спецсимволы, его нужно взять в кавычки.
  "любимый цвет": "синий",

  // Метод: свойство, значением которого является функция.
  // Старый синтаксис (до ES6): ключ: function() {...}
  greet: function () {
    // Ключевое слово 'this' внутри метода объекта обычно указывает на сам объект.
    // Здесь this.name будет равно personLiteral.name ("Иван").
    console.log(`Привет, меня зовут ${this.name}!`);
  },

  // Сокращенный синтаксис для объявления методов (рекомендуется, ES6+):
  // Просто пишем имя метода и круглые скобки для параметров.
  sayBye() {
    // 'this' здесь также указывает на объект personLiteral.
    console.log(`Пока от ${this.name}!`);
  }
}; // Конец литерала объекта.
// Выводим созданный объект в консоль.
console.log("   Литерал объекта:", personLiteral);

// --- 2. Конструктор Object ---
// Менее популярный способ. Создает пустой объект, свойства добавляются позже.
console.log("\n2. Через new Object():");
const carConstructor = new Object(); // Создаем пустой объект с помощью встроенного конструктора Object.
// Добавляем свойства по одному, используя точечную нотацию.
carConstructor.brand = "Toyota";
carConstructor.model = "Camry";
carConstructor.year = 2022;
// Добавляем метод.
carConstructor.startEngine = function () {
  console.log(`${this.brand} ${this.model}: Двигатель запущен!`); // 'this' будет указывать на carConstructor.
};
// Выводим результат.
console.log("   Объект через new Object():", carConstructor);

// --- 3. Функция-конструктор ---
// Способ создания множества однотипных объектов по шаблону (как чертеж).
// Имя функции-конструктора принято писать с большой буквы (User, Car).
console.log("\n3. Через функцию-конструктор:");
function User(name, age) { // Функция принимает параметры для будущих свойств.
  // Внутри функции-конструктора, вызванной с 'new', 'this' указывает на НОВЫЙ, пустой объект, который будет создан.
  // Мы добавляем свойства этому новому объекту 'this'.
  this.name = name; // Присваиваем переданное имя свойству 'name'.
  this.age = age;   // Присваиваем переданный возраст свойству 'age'.
  this.isOnline = false; // Добавляем свойство со значением по умолчанию.
  // Добавляем метод.
  this.login = function () {
    this.isOnline = true; // Метод изменяет свойство объекта.
    console.log(`${this.name} вошел в систему.`);
  };
  // Функция-конструктор неявно возвращает созданный и настроенный объект 'this'.
  // (Явный 'return' используется редко и имеет особенности).
}
// Ключевое слово 'new' перед вызовом функции-конструктора делает три вещи:
// 1. Создает новый пустой объект.
// 2. Устанавливает 'this' внутри функции User равным этому новому объекту.
// 3. Возвращает этот новый объект (если функция явно не вернула другой объект).
const user1 = new User("Алиса", 28); // Создаем первый экземпляр пользователя.
const user2 = new User("Борис", 35); // Создаем второй экземпляр пользователя.
console.log("   Объект 'user1':", user1);
user1.login(); // Вызываем метод у объекта user1.
console.log("   user1 после login:", user1); // Свойство isOnline изменилось на true.
console.log("   Объект 'user2':", user2); // user2 не изменился, у него свои свойства.

// --- 4. Object.create() ---
// Создает новый объект с УКАЗАННЫМ объектом-прототипом.
// Это основа прототипного наследования в JavaScript.
console.log("\n4. Через Object.create():");
// 'animalProto' - объект, который будет прототипом для нового объекта.
const animalProto = {
  eats: true, // Свойство прототипа.
  walk() {    // Метод прототипа.
    console.log(`${this.name || 'Животное'} гуляет.`); // Использует 'this.name', если оно есть у объекта, или 'Животное'.
  }
};
// Создаем объект 'rabbit', прототипом которого ЯВЛЯЕТСЯ 'animalProto'.
const rabbit = Object.create(animalProto);
// Добавляем собственные свойства объекту 'rabbit'.
rabbit.name = "Кролик";
rabbit.jumps = true;
console.log("   Объект 'rabbit':", rabbit);
// Свойства и методы ищутся сначала в самом объекте, потом в его прототипе.
console.log("   rabbit.eats (унаследовано от прототипа):", rabbit.eats); // true (найдено в animalProto).
rabbit.walk(); // Вызываем метод. 'this' внутри walk будет указывать на 'rabbit', поэтому используется rabbit.name. Вывод: "Кролик гуляет."


// === Доступ к свойствам объекта ===
// Выводим подзаголовок.
console.log("\n--- Доступ к свойствам ---");
// Используем объект personLiteral, созданный ранее.

// --- 1. Через точку (.) ---
// Используется, когда имя свойства - валидный идентификатор.
console.log("1. Доступ через точку:");
console.log("   Имя:", personLiteral.name); // Получаем значение свойства 'name'. Вывод: Иван
console.log("   Возраст:", personLiteral.age); // Получаем значение свойства 'age'. Вывод: 30
// Вызов метода объекта также осуществляется через точку.
personLiteral.greet(); // Вызываем метод 'greet'. Вывод: Привет, меня зовут Иван!

// --- 2. Через квадратные скобки [] ---
// Используется, когда имя свойства - строка (особенно со спецсимволами) или хранится в переменной.
console.log("\n2. Доступ через квадратные скобки:");
// Имя свойства передается как строка внутри скобок.
console.log('   Имя:', personLiteral["name"]); // Эквивалентно personLiteral.name. Вывод: Иван
// Обязательно для ключей с пробелами/спецсимволами.
console.log('   Любимый цвет:', personLiteral["любимый цвет"]); // Вывод: синий

// Когда имя свойства хранится в переменной:
let propertyKey = "city"; // Имя свойства в переменной.
// Используем переменную внутри скобок для доступа к свойству.
console.log(`   Свойство "${propertyKey}":`, personLiteral[propertyKey]); // Вывод: Москва

// --- Доступ к несуществующему свойству ---
// Если свойства нет в объекте (и в его прототипах), возвращается undefined.
console.log("\n3. Доступ к несуществующему свойству:");
// Мы удалили 'job' в секции "Изменение объектов", поэтому здесь будет undefined
// Если запустить только этот блок кода изолированно, 'job' не будет определен.
console.log("   Свойство 'job':", personLiteral.job);
console.log("   Свойство ['статус']:", personLiteral['статус']); // Такого свойства не добавляли.


// === Изменение объектов ===
// Выводим подзаголовок.
console.log("\n--- Изменение объектов ---");
// Используем объект personLiteral, созданный ранее.
// Чтобы примеры были воспроизводимы, создадим копию для этой секции
const personToModify = JSON.parse(JSON.stringify(personLiteral));
// Удалим методы, так как JSON.stringify их не копирует
delete personToModify.greet;
delete personToModify.sayBye;
console.log("   Исходный объект для модификации:", personToModify);

// --- 1. Добавление нового свойства ---
// Если свойства с таким ключом нет, оно будет создано.
console.log("\n1. Добавление свойств:");
personToModify.job = "Разработчик"; // Добавляем свойство 'job' через точку.
personToModify["страна"] = "Россия"; // Добавляем свойство 'страна' через скобки.
console.log("   Объект после добавления:", personToModify);

// --- 2. Изменение существующего свойства ---
// Если свойство с таким ключом уже есть, его значение будет перезаписано.
console.log("\n2. Изменение свойств:");
personToModify.age = 31; // Изменяем значение 'age'.
personToModify["любимый цвет"] = "зеленый"; // Изменяем значение 'любимый цвет'.
console.log("   Объект после изменения:", personToModify);

// --- 3. Удаление свойства ---
// Оператор 'delete' удаляет свойство из объекта. Возвращает true, если удаление успешно (или свойства не было), false - если свойство удалить нельзя (редко).
console.log("\n3. Удаление свойств:");
delete personToModify.isAdmin; // Удаляем свойство 'isAdmin'.
delete personToModify["страна"]; // Удаляем свойство 'страна'.
console.log("   Объект после удаления:", personToModify);

// --- Неизменяемость ссылки const ---
console.log("\n4. Ограничение const:");
// Переменная, объявленная через const и содержащая объект, не может быть переприсвоена.
const constObj = { value: 10 };
// constObj = {}; // Ошибка! Assignment to constant variable. (Нельзя присвоить новый объект).

// Но сам объект, на который ссылается const-переменная, изменять МОЖНО.
constObj.value = 20; // Изменяем существующее свойство - это разрешено.
console.log("   Значение изменено даже у const объекта:", constObj.value);


// === Методы объектов и this ===
console.log("\n--- Методы объектов и this ---");

// Создаем объект 'calculator' с разными способами объявления методов.
const calculator = {
  a: 0, // Свойство для первого операнда.
  b: 0, // Свойство для второго операнда.

  // --- Метод, объявленный через Function Expression ---
  // Классический способ до ES6.
  add: function () {
    // При вызове calculator.add(), 'this' будет равен 'calculator'.
    console.log("   Вызван add: this.a =", this.a, ", this.b =", this.b);
    return this.a + this.b; // Корректно работает с this.a и this.b.
  },

  // --- Сокращенный синтаксис методов (ES6+) ---
  // Рекомендуемый способ для методов.
  multiply() { // Эквивалентно multiply: function() { ... }
    // При вызове calculator.multiply(), 'this' будет равен 'calculator'.
    console.log("   Вызван multiply: this.a =", this.a, ", this.b =", this.b);
    return this.a * this.b; // Корректно работает с this.a и this.b.
  },

  // --- Стрелочная функция в качестве свойства ---
  // НЕ РЕКОМЕНДУЕТСЯ для методов, которым нужен доступ к объекту через 'this'.
  subtract: () => {
    // Стрелочные функции НЕ имеют собственного 'this'.
    // 'this' внутри стрелочной функции берется из ВНЕШНЕГО лексического окружения,
    // где был СОЗДАН объект calculator (в данном случае это может быть window или undefined в 'use strict').
    console.warn("   Вызван subtract (стрелочная функция): 'this' здесь НЕ calculator!");
    console.warn("   Значение 'this' внутри стрелочной функции:", this);
    // Попытка доступа к this.a или this.b приведет к ошибке или даст неверный результат,
    // так как 'this' не указывает на 'calculator'.
    // return this.a - this.b; // Ошибка или NaN
    return undefined; // Возвращаем undefined, чтобы показать проблему.
  }
};

// Присваиваем значения свойствам объекта.
calculator.a = 5;
calculator.b = 3;
console.log("Установлены calculator.a = 5, calculator.b = 3");

// Вызываем методы:
console.log("Результат calculator.add():", calculator.add());       // Вывод: 8 (this указывает на calculator)
console.log("Результат calculator.multiply():", calculator.multiply()); // Вывод: 15 (this указывает на calculator)
console.log("Результат calculator.subtract():", calculator.subtract()); // Вывод: undefined (и предупреждение в консоли, т.к. this не calculator)


// === Перебор свойств объекта ===
// Выводим подзаголовок.
console.log("\n--- Перебор свойств ---");
// Используем объект personLiteral из первого примера
const personForIteration = { ...personLiteral }; // Создадим копию для итерации
console.log("   Объект для перебора:", personForIteration);

// --- 1. Цикл for...in ---
// Перебирает КЛЮЧИ объекта, включая унаследованные.
console.log("\n1. Цикл for...in:");
// Снова добавим унаследованное свойство для демонстрации.
Object.prototype.inheritedIter = "унаследовано для итерации";
for (const key in personForIteration) { // 'key' будет принимать имена свойств ('name', 'age', ..., 'inheritedIter').
  // ВАЖНО: Проверять, является ли свойство собственным, чтобы не захватить унаследованные.
  if (Object.hasOwnProperty.call(personForIteration, key)) {
    console.log(`   Собств. ключ: ${key}, Значение: ${personForIteration[key]}`);
  } else {
    console.log(`   (Унаслед. ключ: ${key}, Значение: ${personForIteration[key]})`); // Показываем унаследованное.
  }
}
delete Object.prototype.inheritedIter; // Убираем унаследованное свойство.

// --- 2. Object.keys() ---
// Возвращает МАССИВ СТРОК - имен СОБСТВЕННЫХ перечисляемых свойств объекта.
console.log("\n2. Object.keys():");
const keys = Object.keys(personForIteration); // Получаем массив ключей.
console.log("   Массив ключей:", keys);
// Теперь можно использовать методы массива, например, forEach, для работы с ключами.
keys.forEach(key => console.log(`   Ключ из Object.keys: ${key}`));

// --- 3. Object.values() ---
// Возвращает МАССИВ ЗНАЧЕНИЙ СОБСТВЕННЫХ перечисляемых свойств объекта.
console.log("\n3. Object.values():");
const values = Object.values(personForIteration); // Получаем массив значений.
console.log("   Массив значений:", values);
// Перебор значений
values.forEach(value => console.log(`   Значение из Object.values: ${typeof value === 'function' ? '[функция]' : value}`));


// --- 4. Object.entries() ---
// Возвращает МАССИВ МАССИВОВ, где каждый вложенный массив - это пара [ключ, значение] СОБСТВЕННЫХ перечисляемых свойств.
console.log("\n4. Object.entries():");
const entries = Object.entries(personForIteration); // Получаем массив пар.
console.log("   Массив пар [ключ, значение]:", entries);
// Удобно использовать деструктуризацию при переборе массива entries.
entries.forEach(([key, value]) => { // Сразу получаем ключ и значение в переменные.
  // Выводим пару, для функций показываем только тип.
  console.log(`   Пара из Object.entries: ${key} -> ${typeof value === 'function' ? '[функция]' : value}`);
});


// === Копирование объектов ===
console.log("\n--- Копирование объектов ---");

// --- Присваивание копирует ССЫЛКУ ---
console.log("1. Присваивание (копирование ссылки):");
const objA = { id: 1 }; // Исходный объект.
const objB = objA; // Переменная objB теперь указывает на ТОТ ЖЕ ОБЪЕКТ в памяти, что и objA.
console.log("   objA === objB:", objA === objB); // true - это один и тот же объект.
// Изменяем объект через objB.
objB.id = 2;
// Изменение видно и через objA, так как объект один.
console.log("   objA.id после изменения objB:", objA.id); // Вывод: 2!

// --- Поверхностное копирование (Shallow Copy) ---
// Копируются только свойства первого уровня. Вложенные объекты копируются по ссылке.
console.log("\n2. Поверхностное копирование:");
const original = { a: 1, b: { c: 2 } }; // Объект с вложенным объектом.

// Способ 1: Object.assign(target, ...sources)
// Копирует свойства из 'original' в новый пустой объект '{}'.
const shallowCopy1 = Object.assign({}, original);
console.log("   Object.assign():");
console.log("   original === shallowCopy1:", original === shallowCopy1); // false - это разные объекты.
console.log("   original.b === shallowCopy1.b:", original.b === shallowCopy1.b); // true - вложенный объект 'b' скопирован по ссылке!
// Изменяем свойство первого уровня в копии.
shallowCopy1.a = 10; // Это не повлияет на original.a.
// Изменяем свойство вложенного объекта в копии.
shallowCopy1.b.c = 20; // Это ИЗМЕНИТ original.b.c, так как shallowCopy1.b ссылается на тот же объект, что и original.b!
console.log("   original после изменения shallowCopy1:", original); // { a: 1, b: { c: 20 } }
console.log("   shallowCopy1:", shallowCopy1); // { a: 10, b: { c: 20 } }

// Способ 2: Spread оператор (...) (ES6+)
// Создает новый объект и "распыляет" в него свойства из 'original'.
const shallowCopy2 = { ...original };
console.log("\n   Spread (...):");
console.log("   original === shallowCopy2:", original === shallowCopy2); // false - разные объекты.
console.log("   original.b === shallowCopy2.b:", original.b === shallowCopy2.b); // true - вложенный объект 'b' также скопирован по ссылке!
// Изменяем свойства копии.
shallowCopy2.a = 100; // Не влияет на original.a.
shallowCopy2.b.c = 200; // Опять влияет на original.b.c!
console.log("   original после изменения shallowCopy2:", original); // { a: 1, b: { c: 200 } }
console.log("   shallowCopy2:", shallowCopy2); // { a: 100, b: { c: 200 } }

// --- Глубокое копирование (Deep Copy) ---
// Создает полную, независимую копию, включая вложенные объекты.
console.log("\n3. Глубокое копирование:");

// Способ 1: JSON.parse(JSON.stringify(obj))
// Простой, но ограниченный: теряет функции, undefined, Date и т.д.
console.log("   JSON.parse(JSON.stringify()):");
// Сначала объект преобразуется в JSON-строку (функции и undefined пропадут).
// Затем эта строка парсится обратно в новый объект.
const deepCopyJson = JSON.parse(JSON.stringify(original));
console.log("   original === deepCopyJson:", original === deepCopyJson); // false - разные объекты.
console.log("   original.b === deepCopyJson.b:", original.b === deepCopyJson.b); // false - вложенный объект тоже скопирован!
// Изменяем свойства глубокой копии.
deepCopyJson.a = 1000; // Не влияет на original.
deepCopyJson.b.c = 2000; // Тоже НЕ влияет на original!
console.log("   original после изменения deepCopyJson:", original); // { a: 1, b: { c: 200 } } (осталось от shallowCopy2)
console.log("   deepCopyJson:", deepCopyJson); // { a: 1000, b: { c: 2000 } }

// Способ 2: structuredClone(obj) (Современный, более мощный)
// Поддерживает больше типов данных, чем JSON-метод. Не копирует функции.
console.log("\n   structuredClone():");
const originalWithDate = { d: new Date(), nested: { x: 1 } };
const deepCopyStructured = structuredClone(originalWithDate);
console.log("   originalWithDate.nested === deepCopyStructured.nested:", originalWithDate.nested === deepCopyStructured.nested); // false - вложенный объект скопирован.
console.log("   Тип даты в копии:", deepCopyStructured.d instanceof Date); // true - дата осталась датой.
deepCopyStructured.nested.x = 5;
console.log("   originalWithDate после изменения deepCopyStructured:", originalWithDate); // nested.x остался 1.
console.log("   deepCopyStructured:", deepCopyStructured); // nested.x стал 5.

// --- Объединение объектов ---
// Object.assign() и Spread (...) можно использовать для слияния свойств нескольких объектов.
console.log("\n4. Объединение объектов:");
const defaults = { type: 'user', active: true, theme: 'light' };
const settings = { active: false, theme: 'dark', notifications: true };

// Способ 1: Object.assign()
// Свойства из 'settings' перезапишут одноименные свойства из 'defaults'.
const mergedAssign = Object.assign({}, defaults, settings);
console.log("   Объединение Object.assign():", mergedAssign);
// { type: 'user', active: false, theme: 'dark', notifications: true }

// Способ 2: Spread (...)
// Свойства из 'settings' также перезапишут одноименные из 'defaults', т.к. идут позже.
const mergedSpread = { ...defaults, ...settings };
console.log("   Объединение Spread (...):", mergedSpread);
// { type: 'user', active: false, theme: 'dark', notifications: true }


// === Деструктуризация объектов ===
console.log("\n--- Деструктуризация объектов ---");
// Удобный синтаксис для извлечения свойств объекта в переменные.

// Исходный объект для примеров.
const userProfile = {
  login: "alice",
  email: "alice@example.com",
  details: { // Вложенный объект.
    firstName: "Алиса",
    lastName: "Смит"
  },
  status: "active"
};
console.log("Исходный userProfile:", userProfile);

// --- 1. Базовая деструктуризация ---
// Мы объявляем переменные 'login' и 'email' и присваиваем им значения
// соответствующих свойств из объекта 'userProfile'.
// Имена переменных должны совпадать с именами ключей в объекте.
console.log("\n1. Базовая:");
const { login, email } = userProfile; // Фигурные скобки слева от '=' означают деструктуризацию объекта.
console.log("   login:", login); // Вывод: alice
console.log("   email:", email); // Вывод: alice@example.com

// --- 2. Переименование переменных ---
// Если мы хотим назвать переменные иначе, чем ключи в объекте, используем синтаксис "ключ: новоеИмя".
console.log("\n2. Переименование:");
const { login: userLogin, status: userStatus } = userProfile; // Свойство 'login' пойдет в переменную 'userLogin', 'status' -> 'userStatus'.
console.log("   userLogin (из login):", userLogin); // Вывод: alice
console.log("   userStatus (из status):", userStatus); // Вывод: active

// --- 3. Значения по умолчанию ---
// Если свойства в объекте может не быть, можно задать значение по умолчанию с помощью '='.
console.log("\n3. Значения по умолчанию:");
// Пытаемся извлечь 'city' (которого нет) и 'status' (который есть).
const { city = "Не указан", status = "inactive" } = userProfile;
console.log("   city (значение по умолчанию):", city); // Вывод: Не указан (т.к. city нет в userProfile).
console.log("   status (значение из объекта):", status); // Вывод: active (т.к. status есть в userProfile, значение по умолчанию 'inactive' игнорируется).

// --- 4. Вложенная деструктуризация ---
// Можно "проваливаться" во вложенные объекты.
console.log("\n4. Вложенная:");
// Сначала извлекаем 'details', а затем из него извлекаем 'firstName' и 'lastName'.
const { details: { firstName, lastName } } = userProfile;
// Обратите внимание: переменная 'details' здесь НЕ создается. Создаются только 'firstName' и 'lastName'.
console.log("   firstName (из details):", firstName); // Вывод: Алиса
console.log("   lastName (из details):", lastName); // Вывод: Смит
// Если нужно и 'details', и вложенные свойства:
// const { details, details: { firstName, lastName } } = userProfile;

// --- 5. Rest оператор (...) для сбора оставшихся свойств ---
// Можно извлечь нужные свойства, а все остальные собрать в новый объект с помощью '...имя'.
console.log("\n5. Rest оператор:");
// Извлекаем 'login' (переименовывая в 'l') и 'email' (переименовывая в 'e').
// Все ОСТАЛЬНЫЕ свойства ('details', 'status') собираются в новый объект 'restDetails'.
const { login: l, email: e, ...restDetails } = userProfile;
console.log("   Извлеченные l (login):", l);
console.log("   Извлеченные e (email):", e);
console.log("   Оставшиеся свойства (restDetails):", restDetails); // Вывод: { details: { firstName: 'Алиса', lastName: 'Смит' }, status: 'active' }


// === Геттеры и сеттеры ===
console.log("\n--- Геттеры и сеттеры ---");
// Специальные методы, которые выглядят как свойства, но выполняют код при чтении/записи.

// Объект с контролем температуры.
const smartObject = {
  // "Приватное" свойство для хранения реального значения температуры в Цельсиях.
  // Нижнее подчеркивание '_' - это СОГЛАШЕНИЕ (не защита!), что к этому свойству не следует обращаться напрямую извне.
  _temperature: 0,
  // Массив для логирования изменений.
  log: [],

  // --- Геттер для temperatureC ---
  // Определяется с помощью ключевого слова 'get'.
  // Вызывается автоматически при чтении свойства 'smartObject.temperatureC'.
  get temperatureC() {
    console.log("   [ВЫЗВАН ГЕТТЕР temperatureC]");
    return this._temperature; // Просто возвращает внутреннее значение.
  },

  // --- Сеттер для temperatureC ---
  // Определяется с помощью ключевого слова 'set'.
  // Вызывается автоматически при присваивании значения свойству 'smartObject.temperatureC = значение'.
  set temperatureC(value) { // 'value' - это присваиваемое значение (например, 25).
    console.log(`   [ВЫЗВАН СЕТТЕР temperatureC со значением ${value}]`);
    // Можно добавить логику валидации.
    if (typeof value !== 'number') {
      throw new Error("Температура должна быть числом."); // Выбрасываем ошибку, если значение некорректно.
    }
    if (value < -273.15) {
      console.warn("   Предупреждение: Температура ниже абсолютного нуля!");
      // Можно не сохранять или скорректировать значение
    }
    // Сохраняем проверенное значение во внутреннее свойство.
    this._temperature = value;
    // Дополнительная логика: логирование.
    this.log.push(`Установлена температура: ${value}°C`);
  },

  // --- Геттер для temperatureF (вычисляемое свойство) ---
  // Геттер может вычислять значение на лету.
  get temperatureF() {
    console.log("   [ВЫЗВАН ГЕТТЕР temperatureF]");
    // Вычисляет и возвращает температуру в Фаренгейтах на основе _temperature (в Цельсиях).
    return this._temperature * 9 / 5 + 32;
  },

  // --- Сеттер для temperatureF ---
  // Сеттер тоже может выполнять вычисления перед сохранением.
  set temperatureF(value) {
    console.log(`   [ВЫЗВАН СЕТТЕР temperatureF со значением ${value}]`);
    if (typeof value !== 'number') {
      throw new Error("Температура должна быть числом.");
    }
    // Вычисляем температуру в Цельсиях из Фаренгейтов и сохраняем в _temperature.
    const celsiusValue = (value - 32) * 5 / 9;
    this._temperature = celsiusValue;
    // Логируем.
    this.log.push(`Установлена температура: ${value}°F (${celsiusValue.toFixed(1)}°C)`);
  }
};

// --- Использование геттеров и сеттеров ---
// Обращаемся к ним как к обычным свойствам.
console.log("\nИспользование:");
console.log("Чтение t°C:", smartObject.temperatureC); // Вызывает геттер temperatureC.
smartObject.temperatureC = 25; // Вызывает сеттер temperatureC со значением 25.
console.log("Чтение t°F:", smartObject.temperatureF); // Вызывает геттер temperatureF (вычисляет 77).
smartObject.temperatureF = 77; // Вызывает сеттер temperatureF со значением 77 (вычисляет и сохраняет 25 в _temperature).
console.log("Чтение t°C после установки F:", smartObject.temperatureC); // Вызывает геттер temperatureC (возвращает 25).
console.log("Лог изменений:", smartObject.log); // Показываем записи, сделанные сеттерами.

// Попытка установить некорректное значение.
try {
  smartObject.temperatureC = "жарко"; // Вызовет сеттер, который выбросит ошибку.
} catch (e) {
  // Ловим ошибку из сеттера.
  console.error("Ошибка установки температуры:", e.message);
}


// === Прототипное наследование (кратко) ===
console.log("\n--- Прототипное наследование (кратко) ---");
// Основа наследования в JavaScript до появления классов.

// Создаем объект-родитель (прототип).
const parent = {
  prop: "Свойство родителя", // Свойство, которое будет унаследовано.
  method() { console.log("   Вызван метод родителя"); } // Метод, который будет унаследован.
};
console.log("Объект-родитель (parent):", parent);

// Создаем дочерний объект, указывая 'parent' как его прототип.
const child = Object.create(parent);
// Добавляем собственное свойство дочернему объекту.
child.ownProp = "Собственное свойство";
console.log("Дочерний объект (child):", child); // В консоли может не показывать унаследованные свойства сразу.

// --- Доступ к свойствам ---
console.log("\nДоступ к свойствам child:");
// 1. Ищем 'ownProp' в 'child'. Найдено.
console.log("   child.ownProp:", child.ownProp); // Вывод: Собственное свойство

// 2. Ищем 'prop' в 'child'. Не найдено.
// 3. Ищем 'prop' в прототипе 'child' (т.е. в 'parent'). Найдено.
console.log("   child.prop (унаследовано):", child.prop); // Вывод: Свойство родителя

// 4. Ищем 'method' в 'child'. Не найдено.
// 5. Ищем 'method' в прототипе 'child' (т.е. в 'parent'). Найдено.
// 6. Вызываем найденный метод. 'this' внутри метода будет указывать на 'child' (объект, у которого вызвали метод).
child.method(); // Вывод: Вызван метод родителя

// --- Проверка прототипа ---
// Можно получить прототип объекта с помощью Object.getPrototypeOf().
console.log("\nПроверка прототипа:");
console.log("   Прототип child это parent?", Object.getPrototypeOf(child) === parent); // true

// Наследование работает по цепочке. Если бы у parent был свой прототип, поиск продолжился бы там.


// --- Логика для выполнения примеров на странице objects.html ---
// Оборачиваем в DOMContentLoaded, чтобы гарантировать, что HTML загружен перед поиском кнопок
document.addEventListener('DOMContentLoaded', () => {
  // Находим ВСЕ HTML-элементы с классом 'run-code' (это наши кнопки "Запустить пример").
  document.querySelectorAll('.run-code').forEach(button => {
    // Для КАЖДОЙ кнопки 'button' добавляем обработчик события 'click'.
    button.addEventListener('click', () => {
      // Ищем ближайший родительский элемент <div class="code-block">
      const codeBlock = button.closest('.code-block');
      if (!codeBlock) {
        console.warn("Не найден родительский '.code-block' для кнопки.");
        return;
      }

      // Ищем элемент <pre><code> внутри этого блока
      const codeElement = codeBlock.querySelector('pre code');
      // Ищем элемент <div class="output"> внутри этого блока
      const outputDiv = codeBlock.querySelector('.output');

      // Проверка: если не нашли элемент с кодом или элемент для вывода.
      if (!codeElement) {
        console.warn("Не найден элемент 'pre code' внутри '.code-block'.");
        return;
      }
      if (!outputDiv) {
        console.warn("Не найден элемент '.output' внутри '.code-block'.");
        return;
      }

      // Очищаем содержимое div'а для вывода от предыдущих результатов.
      outputDiv.innerHTML = '';
      outputDiv.classList.remove('error'); // Убираем класс ошибки, если он был

      // --- Перехват console.log, console.error, console.warn ---
      const originalConsoleLog = console.log;
      const originalConsoleError = console.error;
      const originalConsoleWarn = console.warn;
      const logs = []; // Массив для сбора логов

      // Функция для форматирования и добавления логов
      const logHandler = (type) => (...args) => {
        const formattedArgs = args.map(arg => {
          if (arg instanceof Error) { // Специальная обработка ошибок
            return `Error: ${arg.message}\n${arg.stack ? arg.stack.split('\n').slice(1, 3).join('\n') : ''}`; // Показываем сообщение и пару строк стека
          }
          if (typeof arg === 'object' && arg !== null) {
            try {
              // Используем null, 2 для красивого форматирования JSON
              return JSON.stringify(arg, null, 2);
            } catch (e) {
              return '[Circular Object]'; // Обработка циклических ссылок
            }
          }
          return String(arg); // Преобразование остальных типов в строку
        });
        // Добавляем объект лога с типом и сообщением
        logs.push({ type: type, message: formattedArgs.join(' ') });
        // Вызываем оригинальный метод консоли
        if (type === 'error') originalConsoleError.apply(console, args);
        else if (type === 'warn') originalConsoleWarn.apply(console, args);
        else originalConsoleLog.apply(console, args);
      };

      // Переопределяем методы console
      console.log = logHandler('log');
      console.error = logHandler('error');
      console.warn = logHandler('warn');
      // --- Конец перехвата console ---

      // --- Выполнение кода примера ---
      try {
        // Получаем текстовое содержимое элемента <code> (это и есть код примера).
        const codeText = codeElement.textContent;

        // Создаем и выполняем функцию из текста кода.
        // Важно: код выполняется в глобальной области видимости,
        // но так как примеры самодостаточны (определяют свои const/let), это должно работать.
        const userCode = new Function(codeText);
        userCode();

        // --- Вывод результата в <div class="output"> ---
        if (logs.length > 0) {
          logs.forEach(log => {
            const p = document.createElement('p');
            p.textContent = log.message;
            // Добавляем классы для стилизации разных типов логов
            if (log.type === 'error') {
              p.classList.add('log-error');
              outputDiv.classList.add('error'); // Добавляем класс ошибки к родительскому div
            } else if (log.type === 'warn') {
              p.classList.add('log-warn');
            } else {
              p.classList.add('log-info');
            }
            outputDiv.appendChild(p);
          });
        } else {
          // Если логов не было, выводим сообщение об этом.
          const p = document.createElement('p');
          p.textContent = "Код выполнен без вывода в console.";
          p.classList.add('log-info', 'italic'); // Добавляем классы для стиля
          outputDiv.appendChild(p);
        }
      } catch (error) {
        // --- Обработка ошибок выполнения самого кода примера ---
        console.error("Ошибка выполнения кода примера:", error); // Выводим ошибку в реальную консоль и в наш логгер
        // Дополнительно выводим ошибку в outputDiv, если она не попала через перехват console.error
        if (!logs.some(log => log.type === 'error' && log.message.includes(error.message))) {
          const p = document.createElement('p');
          p.textContent = `Ошибка выполнения: ${error.name}: ${error.message}`;
          p.classList.add('log-error');
          outputDiv.appendChild(p);
          outputDiv.classList.add('error');
        }
      } finally {
        // --- Восстановление оригинальных методов console ---
        // Блок 'finally' выполняется ВСЕГДА после try или catch.
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
        console.warn = originalConsoleWarn;
      }
      // --- Конец выполнения кода примера ---
    }); // Конец обработчика addEventListener 'click'
  }); // Конец forEach для кнопок
}); // Конец обработчика DOMContentLoaded

// --- Конец файла 05_objects.js ---
