// ===== ЦИКЛЫ И УПРАВЛЕНИЕ ПОТОКОМ В JAVASCRIPT =====
console.log("===== ЦИКЛЫ И УПРАВЛЕНИЕ ПОТОКОМ =====");

// === Циклы for ===
console.log("\n--- Цикл for ---");

// Стандартный цикл for: инициализация; условие; шаг
console.log("Стандартный for:");
for (let i = 0; i < 5; i++) { // i от 0 до 4
  console.log(`  i = ${i}`);
}

// Цикл for с пропуском частей
let k = 0;
console.log("For с пропуском инициализации и шага:");
for (; k < 3;) { // Используем внешнюю переменную k
  console.log(`  k = ${k}`);
  k++;
}

// Цикл for для перебора массива (менее предпочтительно, чем for...of или forEach)
const fruitsFor = ["яблоко", "банан", "апельсин"];
console.log("For для массива:");
for (let i = 0; i < fruitsFor.length; i++) {
  console.log(`  Фрукт ${i}: ${fruitsFor[i]}`);
}

// === Цикл while ===
console.log("\n--- Цикл while ---");
// Выполняется, пока условие истинно (проверка перед итерацией)
let count = 0;
console.log("Стандартный while:");
while (count < 3) {
  console.log(`  count = ${count}`);
  count++;
}

// Пример: генерация случайного числа до > 0.5
let randomNum;
let attempts = 0;
console.log("While для случайного числа:");
while (true) { // Потенциально бесконечный цикл, нужен break
  attempts++;
  randomNum = Math.random();
  console.log(`  Попытка ${attempts}: ${randomNum.toFixed(2)}`);
  if (randomNum > 0.8) { // Условие выхода
    console.log(`  Найдено число > 0.8!`);
    break;
  }
  if (attempts > 10) { // Защита от бесконечного цикла
    console.log("  Превышено число попыток.");
    break;
  }
}

// === Цикл do...while ===
console.log("\n--- Цикл do...while ---");
// Выполняется хотя бы один раз, затем проверяется условие
let choice;
do {
  // choice = prompt("Введите 'выход', чтобы закончить:"); // Закомментировано для автоматического выполнения
  choice = Math.random() > 0.7 ? 'выход' : 'продолжить'; // Имитация ввода
  console.log(`  Ввод пользователя (имитация): ${choice}`);
} while (choice !== 'выход');
console.log("  Цикл do...while завершен.");

// === Цикл for...of ===
console.log("\n--- Цикл for...of ---");
// Для перебора значений итерируемых объектов (массивы, строки, Map, Set и др.)

// Перебор массива
const colors = ["красный", "зеленый", "синий"];
console.log("for...of для массива:");
for (const color of colors) {
  console.log(`  Цвет: ${color}`);
}

// Перебор строки
const message = "Привет";
console.log("for...of для строки:");
for (const char of message) {
  console.log(`  Символ: ${char}`);
}

// Перебор Map
const map = new Map([['a', 1], ['b', 2]]);
console.log("for...of для Map:");
for (const [key, value] of map) { // Деструктуризация пары [ключ, значение]
  console.log(`  ${key} -> ${value}`);
}

// Перебор Set
const set = new Set([1, 2, 2, 3, 1]); // Дубликаты игнорируются
console.log("for...of для Set:");
for (const num of set) {
  console.log(`  Значение: ${num}`);
}

// === Цикл for...in ===
console.log("\n--- Цикл for...in ---");
// Для перебора КЛЮЧЕЙ (свойств) объекта
// Внимание: порядок перебора не гарантирован! Перебирает и унаследованные свойства.
const person = {
  name: "Иван",
  age: 30,
  city: "Москва"
};
// Добавим метод в прототип для демонстрации
Object.prototype.inheritedProp = "Это унаследовано";

console.log("for...in для объекта:");
for (const key in person) {
  console.log(`  Ключ: ${key}, Значение: ${person[key]}`);
}

// Перебор только собственных свойств объекта
console.log("for...in только для собственных свойств:");
for (const key in person) {
  if (Object.hasOwnProperty.call(person, key)) { // Проверка на собственное свойство
    console.log(`  Свой ключ: ${key}, Значение: ${person[key]}`);
  } else {
    console.log(`  (Унаследованный ключ: ${key})`);
  }
}
// Удалим унаследованное свойство, чтобы не мешать дальше
delete Object.prototype.inheritedProp;

// Внимание: Не используйте for...in для перебора массивов! (может перебирать нечисловые ключи)

// === Управление циклами: break и continue ===
console.log("\n--- break и continue ---");

// break: досрочный выход из цикла
console.log("Пример с break:");
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    console.log("  Выход из цикла при i = 5");
    break;
  }
  console.log(`  i = ${i}`);
} // Выведет 0, 1, 2, 3, 4

// continue: переход к следующей итерации
console.log("Пример с continue:");
for (let i = 0; i < 5; i++) {
  if (i % 2 === 0) { // Пропускаем четные числа
    console.log(`  Пропуск четного числа ${i}`);
    continue;
  }
  console.log(`  Нечетное число i = ${i}`);
} // Выведет 1, 3

// Метки для break/continue во вложенных циклах
console.log("Пример с метками:");
outerLoop: for (let i = 1; i <= 3; i++) {
  console.log(`Внешний цикл: i = ${i}`);
  for (let j = 1; j <= 3; j++) {
    console.log(`  Внутренний цикл: j = ${j}`);
    if (i === 2 && j === 2) {
      console.log("    Прерываем внешний цикл (break outerLoop)");
      break outerLoop; // Выход из обоих циклов
    }
    if (i === 1 && j === 1) {
      console.log("    Переходим к след. итерации внешнего цикла (continue outerLoop)");
      continue outerLoop; // Переход к i = 2
    }
  }
}

// === Обработка ошибок: try...catch...finally ===
console.log("\n--- try...catch...finally ---");

try {
  console.log("Начало блока try");
  // Код, который может вызвать ошибку
  // let result = 10 / 0; // Ошибка деления на ноль (Infinity) - не вызывает исключение
  // console.log(nonExistentVariable); // Ошибка ReferenceError
  throw new Error("Искусственная ошибка!"); // Генерируем ошибку сами
  console.log("Этот код не выполнится"); // Не выполнится, если была ошибка
} catch (error) { // Блок выполняется, если в try произошла ошибка
  console.error("!!! Поймана ошибка !!!");
  console.error("  Тип ошибки:", error.name); // Имя ошибки (e.g., ReferenceError, Error)
  console.error("  Сообщение:", error.message); // Сообщение об ошибке
  // console.error("  Стек вызовов:", error.stack); // Полный стек вызовов
} finally { // Блок выполняется всегда, независимо от наличия ошибки
  console.log("Блок finally выполнен.");
}

console.log("Выполнение программы продолжается после try...catch");

// Пример функции с обработкой ошибок
function parseJsonSafe(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    console.log("JSON успешно разобран:", data);
    return data;
  } catch (error) {
    console.error(`Ошибка разбора JSON: ${error.message}`);
    return null; // Возвращаем null при ошибке
  }
}

parseJsonSafe('{"name": "Иван", "age": 30}'); // Успешно
parseJsonSafe('{"name": "Иван", age: 30}'); // Ошибка (age без кавычек)
parseJsonSafe('невалидный json'); // Ошибка

// --- Логика для выполнения примеров на странице loops.html ---
document.querySelectorAll('.run-code').forEach(button => {
  button.addEventListener('click', () => {
    // Ищем элемент <code> внутри <pre> в родительском элементе кнопки
    const codeElement = button.parentElement.querySelector('pre code');
    const outputDiv = button.parentElement.querySelector('.output');

    if (!codeElement || !outputDiv) {
      console.warn("Не найдены элементы 'pre code' или 'div.output' для кнопки 'Запустить'.");
      return;
    }

    const exampleId = button.getAttribute('data-example');
    outputDiv.innerHTML = ''; // Очищаем предыдущий результат

    // Сохраняем оригинальный console.log
    const originalConsoleLog = console.log;
    const logs = [];

    // Перехватываем console.log
    console.log = (...args) => {
      const formattedArgs = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) { return '[Circular Object]'; }
        }
        return String(arg);
      });
      logs.push(formattedArgs.join(' '));
      originalConsoleLog.apply(console, args);
    };

    try {
      // Выполняем код из блока <code>
      const codeText = codeElement.textContent;
      const userCode = new Function(codeText);
      userCode();

      // Выводим логи в outputDiv
      if (logs.length > 0) {
        logs.forEach(log => {
          const p = document.createElement('p');
          p.textContent = log;
          outputDiv.appendChild(p);
        });
      } else {
        const p = document.createElement('p');
        p.textContent = "Код выполнен без вывода в console.log.";
        p.style.fontStyle = "italic";
        outputDiv.appendChild(p);
      }
    } catch (error) {
      const p = document.createElement('p');
      p.textContent = `Ошибка выполнения: ${error.message}`;
      p.style.color = '#ff5555';
      outputDiv.appendChild(p);
    } finally {
      console.log = originalConsoleLog;
    }
  });
});

// --- Конец файла 04_loops_and_control_flow.js ---