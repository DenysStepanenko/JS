// ===== МАССИВЫ В JAVASCRIPT =====
console.log("===== МАССИВЫ =====");

// === Создание массивов ===
console.log("\n--- Создание массивов ---");

// Литерал массива
const fruits = ["яблоко", "банан", "апельсин"];
console.log("Литерал:", fruits);

// Конструктор Array
const numbers = new Array(1, 2, 3, 4, 5);
console.log("Конструктор:", numbers);

// Создание пустого массива
const emptyArray1 = [];
const emptyArray2 = new Array();
console.log("Пустые массивы:", emptyArray1, emptyArray2);

// Создание массива с предопределенной длиной (создает "дыры")
const arrayWithLength = new Array(5); // [empty × 5]
console.log("Массив с длиной:", arrayWithLength);

// Создание массива из строки или другого итерируемого объекта
const letters = Array.from("hello"); // ["h", "e", "l", "l", "o"]
console.log("Массив из строки:", letters);

// Создание массива с помощью Array.of() (надежнее конструктора для одного числового аргумента)
const digits = Array.of(1, 2, 3); // [1, 2, 3]
const singleDigit = Array.of(7); // [7] (в отличие от new Array(7))
console.log("Array.of(1, 2, 3):", digits);
console.log("Array.of(7):", singleDigit);

// === Доступ к элементам массива ===
console.log("\n--- Доступ к элементам ---");

// Доступ по индексу (индексы начинаются с 0)
console.log("Первый фрукт:", fruits[0]); // "яблоко"
console.log("Второй фрукт:", fruits[1]); // "банан"
console.log("Третий фрукт:", fruits[2]); // "апельсин"

// Доступ к несуществующему элементу
console.log("Четвертый фрукт:", fruits[3]); // undefined

// Изменение элемента по индексу
fruits[1] = "груша";
console.log("Измененный массив:", fruits); // ["яблоко", "груша", "апельсин"]

// Длина массива
console.log("Длина массива fruits:", fruits.length); // 3

// Доступ к последнему элементу
console.log("Последний фрукт:", fruits[fruits.length - 1]); // "апельсин"

// === Основные методы массивов ===
console.log("\n--- Основные методы ---");
let planets = ["Земля", "Марс"];
console.log("Исходные планеты:", planets);

// Добавление элементов
let pushResult = planets.push("Венера", "Юпитер"); // Добавляет в конец, возвращает новую длину
console.log("После push:", planets, "(новая длина:", pushResult, ")");

let unshiftResult = planets.unshift("Меркурий");  // Добавляет в начало, возвращает новую длину
console.log("После unshift:", planets, "(новая длина:", unshiftResult, ")");

// Удаление элементов
let poppedPlanet = planets.pop();  // Удаляет с конца, возвращает удаленный элемент
console.log("Удален pop:", poppedPlanet, "Осталось:", planets);

let shiftedPlanet = planets.shift(); // Удаляет с начала, возвращает удаленный элемент
console.log("Удален shift:", shiftedPlanet, "Осталось:", planets);

// Поиск элементов
const colors = ["красный", "зеленый", "синий", "зеленый"];
console.log("Массив цветов:", colors);
// indexOf - возвращает индекс первого найденного элемента или -1
console.log('indexOf("зеленый"):', colors.indexOf("зеленый"));     // 1
console.log('indexOf("желтый"):', colors.indexOf("желтый"));      // -1
console.log('indexOf("зеленый", 2):', colors.indexOf("зеленый", 2));  // 3 (начинает поиск с индекса 2)

// lastIndexOf - возвращает индекс последнего найденного элемента или -1
console.log('lastIndexOf("зеленый"):', colors.lastIndexOf("зеленый")); // 3

// includes - проверяет наличие элемента, возвращает true или false
console.log('includes("синий"):', colors.includes("синий"));      // true
console.log('includes("желтый"):', colors.includes("желтый"));     // false

// find - возвращает первый элемент, удовлетворяющий условию, или undefined
const numbers2 = [5, 12, 8, 130, 44];
console.log("Массив чисел:", numbers2);
const found = numbers2.find(element => element > 10);
console.log("find(> 10):", found); // 12

// findIndex - возвращает индекс первого элемента, удовлетворяющего условию, или -1
const foundIndex = numbers2.findIndex(element => element > 10);
console.log("findIndex(> 10):", foundIndex); // 1

// Объединение и разделение массивов
const arr1 = [1, 2];
const arr2 = [3, 4];
// concat - объединяет массивы (не изменяет исходные)
const combined = arr1.concat(arr2, [5, 6]);
console.log("concat:", combined); // [1, 2, 3, 4, 5, 6]
console.log("arr1 после concat:", arr1); // [1, 2] (не изменился)

// slice - возвращает часть массива (не изменяет исходный)
const numbers3 = [1, 2, 3, 4, 5];
console.log("Массив numbers3:", numbers3);
console.log("slice(2):", numbers3.slice(2));     // [3, 4, 5] (с индекса 2 до конца)
console.log("slice(1, 4):", numbers3.slice(1, 4));  // [2, 3, 4] (с индекса 1 до 4, не включая 4)
console.log("slice(-2):", numbers3.slice(-2));    // [4, 5] (последние 2 элемента)
console.log("slice():", numbers3.slice());      // [1, 2, 3, 4, 5] (полная копия)
console.log("numbers3 после slice:", numbers3); // [1, 2, 3, 4, 5] (не изменился)

// splice - изменяет содержимое массива, удаляя/заменяя/добавляя элементы
const months = ["Янв", "Март", "Апр", "Июнь"];
console.log("Исходные месяцы:", months);
// Вставка: splice(индекс_начала, 0_удалить, элемент1, ...)
months.splice(1, 0, "Фев");
console.log("После вставки splice(1, 0, 'Фев'):", months); // ["Янв", "Фев", "Март", "Апр", "Июнь"]
// Замена: splice(индекс_начала, сколько_удалить, элемент1, ...)
months.splice(4, 1, "Май");
console.log("После замены splice(4, 1, 'Май'):", months); // ["Янв", "Фев", "Март", "Апр", "Май"]
// Удаление: splice(индекс_начала, сколько_удалить)
let removed = months.splice(1, 2); // Удаляем "Фев" и "Март"
console.log("После удаления splice(1, 2):", months, "Удалено:", removed); // ["Янв", "Апр", "Май"]

// join - объединяет элементы массива в строку
console.log('Месяцы join(", "):', months.join(", ")); // "Янв, Апр, Май"
console.log('Месяцы join(" - "):', months.join(" - ")); // "Янв - Апр - Май"

// reverse - обращает порядок элементов в массиве (изменяет исходный)
console.log("Месяцы до reverse:", months);
months.reverse();
console.log("Месяцы после reverse:", months); // ["Май", "Апр", "Янв"]

// === Перебор элементов массива ===
console.log("\n--- Перебор элементов ---");
const items = ["item1", "item2", "item3"];
console.log("Массив items:", items);

// for
console.log("Цикл for:");
for (let i = 0; i < items.length; i++) {
  console.log(`  ${i}: ${items[i]}`);
}

// for...of
console.log("Цикл for...of:");
for (const item of items) {
  console.log(`  ${item}`);
}

// forEach
console.log("Метод forEach:");
items.forEach((item, index, array) => {
  console.log(`  ${index}: ${item} (массив: ${array})`);
});

// === Преобразование массивов (map, filter, reduce) ===
console.log("\n--- Преобразование массивов ---");
const numbers4 = [1, 2, 3, 4, 5];
console.log("Массив numbers4:", numbers4);

// map - создает новый массив с результатами вызова функции для каждого элемента
const doubled = numbers4.map(num => num * 2);
console.log("map (x * 2):", doubled); // [2, 4, 6, 8, 10]

// filter - создает новый массив с элементами, прошедшими проверку
const oddNumbers = numbers4.filter(num => num % 2 !== 0);
console.log("filter (нечетные):", oddNumbers); // [1, 3, 5]

// reduce - сводит массив к одному значению
// Сумма элементов
const sumReduce = numbers4.reduce((total, num) => total + num, 0); // 0 - начальное значение total
console.log("reduce (сумма):", sumReduce); // 15
// Произведение элементов
const productReduce = numbers4.reduce((product, num) => product * num, 1); // 1 - начальное значение product
console.log("reduce (произведение):", productReduce); // 120

// === Сортировка массивов ===
console.log("\n--- Сортировка ---");
// sort - сортирует элементы массива (изменяет исходный массив!)
const fruits2 = ["банан", "яблоко", "груша", "апельсин"];
console.log("Фрукты до sort:", fruits2);
fruits2.sort(); // Сортирует как строки (лексикографически)
console.log("Фрукты после sort:", fruits2); // ["апельсин", "банан", "груша", "яблоко"]

// Сортировка чисел (по умолчанию сортирует как строки)
const nums = [40, 1, 5, 200, 15];
console.log("Числа до sort:", nums);
nums.sort(); // Неправильная сортировка чисел!
console.log("Числа после sort (неправильно):", nums); // [1, 15, 200, 40, 5]

// Правильная сортировка чисел с функцией сравнения
// Для сортировки по возрастанию: a - b
nums.sort((a, b) => a - b);
console.log("Числа после sort (a - b):", nums); // [1, 5, 15, 40, 200]
// Для сортировки по убыванию: b - a
nums.sort((a, b) => b - a);
console.log("Числа после sort (b - a):", nums); // [200, 40, 15, 5, 1]

// === Многомерные массивы ===
console.log("\n--- Многомерные массивы ---");
// Двумерный массив (матрица)
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log("Матрица:", matrix);

// Доступ к элементам
console.log("Элемент matrix[1][2]:", matrix[1][2]); // 6 (вторая строка, третий столбец)

// Перебор элементов двумерного массива
console.log("Перебор матрицы:");
for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    console.log(`  matrix[${i}][${j}] = ${matrix[i][j]}`);
  }
}

// === Проверка массива ===
console.log("\n--- Проверка массива ---");
// Array.isArray() - надежный способ проверить, является ли переменная массивом
console.log("Array.isArray([]):", Array.isArray([]));        // true
console.log("Array.isArray([1, 2, 3]):", Array.isArray([1, 2, 3])); // true
console.log("Array.isArray({}):", Array.isArray({}));        // false
console.log("Array.isArray('array'):", Array.isArray("array"));   // false
console.log("Array.isArray(null):", Array.isArray(null));     // false
