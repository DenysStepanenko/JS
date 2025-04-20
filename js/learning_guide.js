console.log("===== Упражнения по основам JavaScript =====");

// Упражнение 1: Работа с переменными и типами данных
// Задание: Создайте переменные разных типов и выполните с ними операции

// 1. Создайте переменные разных типов
let name = "Ваше имя";
let age = 25;
let isStudent = true;
let hobbies = ["чтение", "программирование", "спорт"];
let person = { name: name, age: age };

// 2. Выполните операции с этими переменными
// - Сложите строку с числом
// - Сравните число с булевым значением
// - Добавьте элемент в массив
// - Добавьте свойство в объект

// 3. Выведите результаты в консоль
console.log("Результаты операций:");
console.log("Сложение строки и числа:", name + age);
console.log("Сравнение числа и булева:", age > isStudent);
hobbies.push("путешествия");
console.log("Массив после добавления:", hobbies);
person.city = "Москва";
console.log("Объект после добавления свойства:", person);

// Упражнение 2: Шаблонные строки
// Задание: Создайте шаблонную строку, включающую переменные и выражения

// 1. Используйте переменные из предыдущего упражнения
// 2. Создайте шаблонную строку, которая включает:
//    - Имя и возраст
//    - Результат математического выражения
//    - Условное выражение

const mathResult = 10 * 2;
const status = isStudent ? "студент" : "не студент";
console.log(`Меня зовут ${name}, мне ${age} лет.`);
console.log(`Результат вычисления: ${mathResult}`);
console.log(`Я ${status}.`);

console.log("\n===== Упражнения по массивам =====");

// Упражнение 1: Методы массивов
// Задание: Используйте различные методы для работы с массивом

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Создайте новый массив, содержащий только четные числа
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Четные числа:", evenNumbers);

// 2. Создайте новый массив, где каждое число умножено на 2
const doubledNumbers = numbers.map(num => num * 2);
console.log("Умноженные на 2:", doubledNumbers);

// 3. Найдите сумму всех чисел в массиве
const sumNumbers = numbers.reduce((sum, num) => sum + num, 0);
console.log("Сумма чисел:", sumNumbers);

// 4. Проверьте, есть ли в массиве число больше 8
const hasGreaterThan8 = numbers.some(num => num > 8);
console.log("Есть ли число > 8:", hasGreaterThan8);

// 5. Найдите индекс первого числа, которое больше 5
const indexGreaterThan5 = numbers.findIndex(num => num > 5);
console.log("Индекс первого числа > 5:", indexGreaterThan5);

// Упражнение 2: Сортировка и фильтрация
// Задание: Отсортируйте и отфильтруйте массив объектов

const students = [
    { name: "Анна", grade: 85, year: 2 },
    { name: "Иван", grade: 92, year: 1 },
    { name: "Мария", grade: 78, year: 3 },
    { name: "Петр", grade: 90, year: 2 },
    { name: "Елена", grade: 88, year: 1 }
];

// 1. Отсортируйте студентов по оценке (от высшей к низшей)
const sortedByGrade = [...students].sort((a, b) => b.grade - a.grade);
console.log("Отсортированные по оценке:", sortedByGrade);

// 2. Отфильтруйте студентов первого курса
const firstYearStudents = students.filter(student => student.year === 1);
console.log("Студенты 1-го курса:", firstYearStudents);

// 3. Найдите студента с самой высокой оценкой
const topStudent = students.reduce((top, student) => student.grade > top.grade ? student : top, students[0]);
console.log("Студент с лучшей оценкой:", topStudent);

// 4. Создайте массив, содержащий только имена студентов
const studentNames = students.map(student => student.name);
console.log("Имена студентов:", studentNames);

// 5. Вычислите среднюю оценку всех студентов
const averageGrade = students.reduce((sum, student) => sum + student.grade, 0) / students.length;
console.log("Средняя оценка:", averageGrade);

console.log("\n===== Упражнения по функциям =====");

// Упражнение 1: Типы функций
// Задание: Создайте функции разных типов и сравните их поведение

// 1. Создайте функцию-объявление (Function Declaration)
function add(a, b) {
    return a + b;
}
console.log("Function Declaration:", add(5, 3));

// 2. Создайте функциональное выражение (Function Expression)
const subtract = function (a, b) {
    return a - b;
};
console.log("Function Expression:", subtract(5, 3));

// 3. Создайте стрелочную функцию (Arrow Function)
const multiply = (a, b) => a * b;
console.log("Arrow Function:", multiply(5, 3));

// 4. Сравните их поведение при вызове до объявления
try {
    console.log("Попытка вызова subtract до объявления:", subtractBefore(5, 3));
} catch (e) {
    console.error("Ошибка при вызове subtract до объявления:", e.message);
}
const subtractBefore = function (a, b) {
    return a - b;
};
console.log("Вызов add до объявления (hoisting работает):", addBefore(5, 3));
function addBefore(a, b) {
    return a + b;
}

// 5. Сравните их поведение с this (создайте объект с методами)
const calculator = {
    value: 0,
    add: function (x) {
        this.value += x;
        return this.value;
    },
    subtract: (x) => {
        // Стрелочная функция не имеет собственного this
        // this.value += x; // Не сработает
        console.log("Стрелочная функция не может использовать this в этом контексте");
        return undefined;
    }
};
console.log("this с Function Declaration:", calculator.add(5));
console.log("this со стрелочной функцией:", calculator.subtract(3));

// Упражнение 2: Замыкания
// Задание: Создайте функцию, использующую замыкание

// 1. Создайте функцию createCounter, которая возвращает функцию-счетчик
// 2. Каждый вызов возвращенной функции должен увеличивать счетчик на 1
// 3. Создайте два разных счетчика и проверьте их независимость

function createCounter() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}

const counterA = createCounter();
const counterB = createCounter();

console.log("Counter A, вызов 1:", counterA());
console.log("Counter A, вызов 2:", counterA());
console.log("Counter B, вызов 1:", counterB());
console.log("Counter A, вызов 3:", counterA());

console.log("\n===== Упражнения по циклам и управлению потоком =====");

// Упражнение 1: Различные типы циклов
// Задача: Вывести числа от 1 до 10 в консоль

// 1. Используйте цикл for
console.log("Цикл for:");
for (let i = 1; i <= 10; i++) {
    console.log(i);
}

// 2. Используйте цикл while
console.log("Цикл while:");
let j = 1;
while (j <= 10) {
    console.log(j);
    j++;
}

// 3. Используйте цикл do...while
console.log("Цикл do...while:");
let k = 1;
do {
    console.log(k);
    k++;
} while (k <= 10);

// 4. Используйте метод forEach для массива [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log("Метод forEach:");
const numbersForEach = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbersForEach.forEach(num => console.log(num));

// Упражнение 2: Обработка ошибок
// Задание: Реализуйте функцию с обработкой ошибок

// 1. Создайте функцию divide(a, b), которая делит a на b
// 2. Функция должна выбрасывать ошибку, если b равно 0
// 3. Используйте try...catch для обработки этой ошибки

function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Деление на ноль невозможно");
        }
        return a / b;
    } catch (error) {
        console.error("Ошибка:", error.message);
        return null;
    }
}

console.log("Результат деления 10 / 2:", divide(10, 2));
console.log("Результат деления 10 / 0:", divide(10, 0));

console.log("\n===== Упражнения по объектам =====");

// Упражнение 1: Работа с объектами
// Задание: Создайте и модифицируйте объекты

// 1. Создайте объект, представляющий книгу (title, author, year, isRead)
// 2. Добавьте метод для изменения статуса чтения
// 3. Добавьте метод, возвращающий строку с информацией о книге
// 4. Создайте несколько книг и поместите их в массив библиотеки

const book1 = {
    title: "Война и мир",
    author: "Лев Толстой",
    year: 1865,
    isRead: false,
    toggleReadStatus: function () {
        this.isRead = !this.isRead;
        console.log(`${this.title} теперь ${this.isRead ? 'прочитана' : 'не прочитана'}.`);
    },
    getInfo: function () {
        return `${this.title} (${this.author}, ${this.year})`;
    }
};

book1.toggleReadStatus();
console.log(book1.getInfo());

const library = [
    book1,
    { title: "Преступление и наказание", author: "Федор Достоевский", year: 1866, isRead: true },
    { title: "Гарри Поттер и философский камень", author: "Дж. К. Роулинг", year: 1997, isRead: false }
];
console.log("Библиотека:", library);

// Упражнение 2: Прототипное наследование
// Задание: Реализуйте иерархию объектов

// 1. Создайте объект Person с методом introduce()
// 2. Создайте объект Student, наследующий от Person
// 3. Добавьте в Student дополнительные свойства и методы
// 4. Продемонстрируйте наследование методов

const Person = {
    name: "Неизвестный",
    introduce: function () {
        console.log(`Привет, я ${this.name}.`);
    }
};

const Student = Object.create(Person);
Student.name = "Иван";
Student.course = 2;
Student.study = function () {
    console.log(`${this.name} учится на ${this.course} курсе.`);
};

Student.introduce(); // Унаследованный метод
Student.study(); // Собственный метод

console.log("\n===== Интерактивное упражнение по массивам =====");

// Ваш код здесь
const numbersInteractive = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Фильтрация четных чисел
const evenNumbersInteractive = numbersInteractive.filter(num => num % 2 === 0);
console.log("Четные числа:", evenNumbersInteractive);

// 2. Умножение каждого числа на 2
const doubledNumbersInteractive = numbersInteractive.map(num => num * 2);
console.log("Числа, умноженные на 2:", doubledNumbersInteractive);

// 3. Сумма всех чисел
const sumInteractive = numbersInteractive.reduce((acc, num) => acc + num, 0);
console.log("Сумма всех чисел:", sumInteractive);

console.log("\n===== Работа с объектами в массиве =====");

// Ваш код здесь
const studentsInteractive = [
    { name: "Анна", grade: 85 },
    { name: "Иван", grade: 92 },
    { name: "Мария", grade: 78 },
    { name: "Петр", grade: 90 },
    { name: "Елена", grade: 88 }
];

// 1. Сортировка по оценке (от высшей к низшей)
const sortedStudentsInteractive = [...studentsInteractive].sort((a, b) => b.grade - a.grade);
console.log("Отсортированные студенты:", sortedStudentsInteractive);

// 2. Средний балл
const totalGradeInteractive = studentsInteractive.reduce((sum, student) => sum + student.grade, 0);
const averageGradeInteractive = studentsInteractive.length > 0 ? totalGradeInteractive / studentsInteractive.length : 0;
console.log("Средний балл:", averageGradeInteractive);

// 3. Массив имен
const namesInteractive = studentsInteractive.map(student => student.name);
console.log("Имена студентов:", namesInteractive);

// --- Логика для выполнения примеров на странице learning_guide.html ---
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

// --- Конец файла learning_guide.js ---