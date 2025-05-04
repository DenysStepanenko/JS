// console.log("===== Случайный выбор ресурса для изучения =====");

// // Список ресурсов
// const resources = [
//     { name: "MDN Web Docs", url: "https://developer.mozilla.org/ru/docs/Web/JavaScript" },
//     { name: "Современный учебник JavaScript", url: "https://learn.javascript.ru/" },
//     { name: "The Modern JavaScript Tutorial", url: "https://javascript.info/" },
//     { name: "W3Schools JavaScript Tutorial", url: "https://www.w3schools.com/js/" },
//     { name: "Coursera", url: "https://www.coursera.org/" },
//     { name: "Udemy", url: "https://www.udemy.com/" },
//     { name: "Codecademy", url: "https://www.codecademy.com/" },
//     { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
//     { name: "Codewars", url: "https://www.codewars.com/" },
//     { name: "LeetCode", url: "https://leetcode.com/" },
//     { name: "HackerRank", url: "https://www.hackerrank.com/" },
//     { name: "Stack Overflow", url: "https://stackoverflow.com/questions/tagged/javascript" }
// ];

// // Функция для выбора случайного ресурса
// function getRandomResource() {
//     const randomIndex = Math.floor(Math.random() * resources.length);
//     const resource = resources[randomIndex];
//     console.log(`Случайный ресурс: ${resource.name}`);
//     console.log(`Ссылка: ${resource.url}`);
// }

// // Демонстрация работы
// getRandomResource();

// // --- Логика для выполнения примеров на странице index.html ---
// document.querySelectorAll('.run-code').forEach(button => {
//     button.addEventListener('click', () => {
//         // Ищем элемент <code> внутри <pre> в родительском элементе кнопки
//         const codeElement = button.parentElement.querySelector('pre code');
//         const outputDiv = button.parentElement.querySelector('.output');

//         if (!codeElement || !outputDiv) {
//             console.warn("Не найдены элементы 'pre code' или 'div.output' для кнопки 'Запустить'.");
//             return;
//         }

//         const exampleId = button.getAttribute('data-example');
//         outputDiv.innerHTML = ''; // Очищаем предыдущий результат

//         // Сохраняем оригинальный console.log
//         const originalConsoleLog = console.log;
//         const logs = [];

//         // Перехватываем console.log
//         console.log = (...args) => {
//             const formattedArgs = args.map(arg => {
//                 if (typeof arg === 'object' && arg !== null) {
//                     try {
//                         return JSON.stringify(arg, null, 2);
//                     } catch (e) { return '[Circular Object]'; }
//                 }
//                 return String(arg);
//             });
//             logs.push(formattedArgs.join(' '));
//             originalConsoleLog.apply(console, args);
//         };

//         try {
//             // Выполняем код из блока <code>
//             const codeText = codeElement.textContent;
//             const userCode = new Function(codeText);
//             userCode();

//             // Выводим логи в outputDiv
//             if (logs.length > 0) {
//                 logs.forEach(log => {
//                     const p = document.createElement('p');
//                     p.textContent = log;
//                     outputDiv.appendChild(p);
//                 });
//             } else {
//                 const p = document.createElement('p');
//                 p.textContent = "Код выполнен без вывода в console.log.";
//                 p.style.fontStyle = "italic";
//                 outputDiv.appendChild(p);
//             }
//         } catch (error) {
//             const p = document.createElement('p');
//             p.textContent = `Ошибка выполнения: ${error.message}`;
//             p.style.color = '#ff5555';
//             outputDiv.appendChild(p);
//         } finally {
//             console.log = originalConsoleLog;
//         }
//     });
// });

// // --- Конец файла index.js ---