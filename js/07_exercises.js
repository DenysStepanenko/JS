console.log("===== Упражнения по основам =====");

// 1. Имя
let myName = "ВашеИмя";
console.log(myName);

// 2. Сложение
let num1 = 15;
let num2 = 7;
console.log(num1 + num2);

// 3. Чет/Нечет
let checkNum = 10;
if (checkNum % 2 === 0) {
    console.log(checkNum + " - четное");
} else {
    console.log(checkNum + " - нечетное");
}

// 4. Строка
let myString = "JavaScript";
console.log("Длина:", myString.length);
console.log("Первый символ:", myString[0]);

console.log("\n===== Упражнения по массивам =====");

// 1. Фрукты
let favFruits = ["Яблоко", "Банан"];
favFruits.push("Манго");
console.log(favFruits);

// 2. Map
const numbersMap = [1, 2, 3, 4];
const doubled = numbersMap.map(n => n * 2);
console.log(doubled);

// 3. Filter
const words = ["Привет", "Мир", "JavaScript", "Кот", "Программирование"];
const longWords = words.filter(word => word.length > 5);
console.log(longWords);

// 4. Reduce
const numbersReduce = [5, 10, 15, 20];
const sum = numbersReduce.reduce((acc, current) => acc + current, 0);
console.log(sum);

console.log("\n===== Упражнения по функциям =====");

// 1. Сумма
function sumNumbers(a, b) {
    return a + b;
}
console.log(sumNumbers(5, 3));

// 2. Максимум в массиве
function findMax(arr) {
    if (arr.length === 0) return undefined;
    return Math.max(...arr); // Используем spread оператор
}
console.log(findMax([1, 5, 2, 9, 3]));

// 3. Верхний регистр (стрелочная)
const toUpper = str => str.toUpperCase();
console.log(toUpper("hello"));

// 4. Замыкание
function createGreeter(greeting) {
    return function (name) {
        console.log(`${greeting}, ${name}!`);
    }
}
const greetHello = createGreeter("Здравствуйте");
greetHello("Ирина");

console.log("\n===== Упражнения по циклам =====");

// 1. Цикл for 1-10
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// 2. Факториал (while)
let numFact = 5;
let resultFact = 1;
let iFact = numFact;
while (iFact > 1) {
    resultFact *= iFact;
    iFact--;
}
console.log(`Факториал ${numFact}:`, resultFact);

// 3. for...of
const loopWords = ["Один", "Два", "Три"];
for (const word of loopWords) {
    console.log(word);
}

// 4. for...in
const loopPerson = { name: "Олег", age: 40 };
for (const key in loopPerson) {
    console.log(`${key}: ${loopPerson[key]}`);
}

console.log("\n===== Упражнения по объектам =====");

// 1, 2. Объект Книга
const book = {
    title: "Мастер и Маргарита",
    author: "М. Булгаков",
    year: 1967,
    getInfo: function () {
        console.log(`${this.title} - ${this.author} (${this.year})`);
    }
};
book.getInfo();

// 3. Массив книг
const library = [
    book,
    { title: "1984", author: "Дж. Оруэлл", year: 1949 },
    { title: "Гарри Поттер и философский камень", author: "Дж. Роулинг", year: 1997 },
    { title: "Код да Винчи", author: "Д. Браун", year: 2003 }
];

// 4. Фильтр по году
function getModernBooks(books) {
    return books
        .filter(b => b.year > 2000)
        .map(b => b.title);
}
console.log("Книги после 2000:", getModernBooks(library));

// --- Логика для выполнения примеров на странице exercises.html ---
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

// --- Конец файла 07_exercises.js ---