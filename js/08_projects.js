console.log("===== Проект: Список дел (To-Do List) =====");

// Массив для хранения задач
let tasks = [];

// Функция добавления задачи
function addTask(taskText) {
    const task = {
        id: Date.now(), // Уникальный ID
        text: taskText,
        completed: false
    };
    tasks.push(task);
    console.log(`Добавлена задача: ${task.text}`);
    console.log("Текущий список задач:", tasks);
}

// Функция отметки задачи как выполненной
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        console.log(`Задача "${task.text}" теперь ${task.completed ? 'выполнена' : 'не выполнена'}.`);
        console.log("Текущий список задач:", tasks);
    } else {
        console.log("Задача не найдена.");
    }
}

// Функция удаления задачи
function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        const deletedTask = tasks.splice(index, 1)[0];
        console.log(`Удалена задача: ${deletedTask.text}`);
        console.log("Текущий список задач:", tasks);
    } else {
        console.log("Задача не найдена.");
    }
}

// Демонстрация работы
addTask("Купить продукты");
addTask("Позвонить другу");
toggleTask(tasks[0].id);
deleteTask(tasks[1].id);

console.log("\n===== Проект: Викторина (Quiz) =====");

// Массив вопросов
const quiz = [
    {
        question: "Какой оператор используется для строгого сравнения в JavaScript?",
        options: ["==", "===", "!=", "!=="],
        correctAnswer: 1
    },
    {
        question: "Какой метод добавляет элемент в конец массива?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0
    }
];

// Переменные для отслеживания прогресса
let currentQuestionIndex = 0;
let score = 0;

// Функция проверки ответа
function checkAnswer(selectedIndex) {
    const currentQuestion = quiz[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score++;
        console.log("Правильно!");
    } else {
        console.log(`Неправильно. Правильный ответ: ${currentQuestion.options[currentQuestion.correctAnswer]}`);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        console.log(`Следующий вопрос: ${quiz[currentQuestionIndex].question}`);
        console.log("Варианты ответа:", quiz[currentQuestionIndex].options);
    } else {
        console.log(`Викторина завершена! Ваш счет: ${score} из ${quiz.length}`);
    }
}

// Демонстрация работы
console.log(`Вопрос 1: ${quiz[0].question}`);
console.log("Варианты ответа:", quiz[0].options);
checkAnswer(1); // Выбираем правильный ответ
console.log(`Вопрос 2: ${quiz[1].question}`);
console.log("Варианты ответа:", quiz[1].options);
checkAnswer(0); // Выбираем правильный ответ

console.log("\n===== Проект: Калькулятор =====");

// Переменные для хранения состояния калькулятора
let currentInput = "0";
let previousInput = "";
let operation = null;

// Функция добавления числа
function inputNumber(num) {
    if (currentInput === "0") {
        currentInput = num;
    } else {
        currentInput += num;
    }
    console.log("Текущее значение:", currentInput);
}

// Функция выбора операции
function inputOperation(op) {
    if (operation !== null) {
        calculate();
    }
    previousInput = currentInput;
    currentInput = "0";
    operation = op;
    console.log("Выбрана операция:", operation);
}

// Функция вычисления
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                console.error("Деление на ноль!");
                return;
            }
            result = prev / curr;
            break;
        default:
            return;
    }
    console.log(`Результат: ${prev} ${operation} ${curr} = ${result}`);
    currentInput = result.toString();
    previousInput = "";
    operation = null;
}

// Функция сброса
function clear() {
    currentInput = "0";
    previousInput = "";
    operation = null;
    console.log("Калькулятор сброшен:", currentInput);
}

// Демонстрация работы
inputNumber("5");
inputOperation("+");
inputNumber("3");
calculate();
clear();
inputNumber("10");
inputOperation("*");
inputNumber("2");
calculate();

console.log("\n===== Проект: Приложение для управления финансами =====");

// Массив для хранения транзакций
let transactions = [];

// Функция добавления транзакции
function addTransaction(description, amount, category, type) {
    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        category: category,
        type: type // "income" или "expense"
    };
    transactions.push(transaction);
    console.log(`Добавлена транзакция: ${type === 'income' ? 'Доход' : 'Расход'} - ${description}, ${amount} (Категория: ${category})`);
    console.log("Все транзакции:", transactions);
}

// Функция удаления транзакции
function deleteTransaction(id) {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        const deleted = transactions.splice(index, 1)[0];
        console.log(`Удалена транзакция: ${deleted.description}`);
        console.log("Все транзакции:", transactions);
    } else {
        console.log("Транзакция не найдена.");
    }
}

// Функция фильтрации по категории
function filterByCategory(category) {
    const filtered = transactions.filter(t => t.category === category);
    console.log(`Транзакции в категории "${category}":`, filtered);
    return filtered;
}

// Функция подсчета баланса
function calculateBalance() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    console.log(`Доходы: ${income}, Расходы: ${expense}, Баланс: ${balance}`);
    return balance;
}

// Демонстрация работы
addTransaction("Зарплата", 50000, "Работа", "income");
addTransaction("Продукты", 5000, "Еда", "expense");
addTransaction("Премия", 10000, "Работа", "income");
filterByCategory("Работа");
calculateBalance();
deleteTransaction(transactions[1].id);
calculateBalance();

// --- Логика для выполнения примеров на странице projects.html ---
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

// --- Конец файла 08_projects.js ---