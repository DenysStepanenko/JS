// ===== МАССИВЫ В JAVASCRIPT =====
console.log("===== МАССИВЫ =====");

// === Создание массивов ===
console.log("\n--- Создание массивов ---");
const fruitsCreate = ["яблоко", "банан", "апельсин"]; console.log("Литерал:", fruitsCreate);
const numbersCreate = new Array(1, 2, 3); console.log("Конструктор:", numbersCreate);
const arrayWithLengthCreate = new Array(3); console.log("Массив с длиной:", arrayWithLengthCreate);
const lettersCreate = Array.from("hi"); console.log("Массив из строки:", lettersCreate);
const digitsCreate = Array.of(1, 2); console.log("Array.of:", digitsCreate);

// === Доступ к элементам массива ===
console.log("\n--- Доступ и изменение ---");
let fruitsAccess = ["яблоко", "банан", "киви"];
console.log("Исходный:", fruitsAccess);
fruitsAccess[1] = "груша"; console.log("Измененный:", fruitsAccess);
console.log("Длина:", fruitsAccess.length);
console.log("Последний:", fruitsAccess[fruitsAccess.length - 1]);

// === Основные методы массивов ===
console.log("\n--- Основные методы ---");
let planetsMethods = ["Земля", "Марс"];
// Мутирующие
planetsMethods.push("Венера"); console.log("push:", planetsMethods);
planetsMethods.pop(); console.log("pop:", planetsMethods);
planetsMethods.unshift("Меркурий"); console.log("unshift:", planetsMethods);
planetsMethods.shift(); console.log("shift:", planetsMethods);
planetsMethods.splice(1, 0, "Юпитер"); console.log("splice (вставка):", planetsMethods);
planetsMethods.reverse(); console.log("reverse:", planetsMethods);
// Не мутирующие
const colorsSearch = ["red", "green", "blue", "green"];
console.log('indexOf("green"):', colorsSearch.indexOf("green"));
console.log('includes("blue"):', colorsSearch.includes("blue"));
const arrConcat1 = [1]; const arrConcat2 = [2];
const combinedConcat = arrConcat1.concat(arrConcat2, [3]); console.log("concat:", combinedConcat);
const numsSlice = [1, 2, 3, 4];
const sliced = numsSlice.slice(1, 3); console.log("slice(1,3):", sliced);
const joinedStr = numsSlice.join('-'); console.log("join('-'):", joinedStr);

// === Перебор элементов массива ===
console.log("\n--- Перебор элементов ---");
const itemsIterate = ["a", "b"];
itemsIterate.forEach((item, index) => console.log(`  forEach: ${index}: ${item}`));


// ===== КОД ИЗ РАЗДЕЛА ЧИСТЫЕ ФУНКЦИИ, MAP, FLATMAP =====
console.log("\n\n===== ЧИСТЫЕ ФУНКЦИИ, MAP, FLATMAP =====");
// --- Чистые функции ---
const pureMultiply = (array, value) => { const newArray = []; array.forEach(e => newArray.push(e * value)); return newArray; };
const originalNumbersPure = [1, 2]; const doubledNumbersPure = pureMultiply(originalNumbersPure, 3);
console.log("pureMultiply:", originalNumbersPure, "->", doubledNumbersPure);
// Task: changeEven
const changeEvenArrow = (numbers, value) => { return numbers.map(num => num % 2 === 0 ? num + value : num); };
const testNumbersPure = [1, 2, 3]; const changedNumbersPure = changeEvenArrow(testNumbersPure, 10);
console.log("changeEven:", testNumbersPure, "->", changedNumbersPure);
// --- Метод map() ---
const planetsMap = ["Earth", "Mars"]; const planetsUpper = planetsMap.map(p => p.toUpperCase()); console.log("map upper:", planetsUpper);
const planetsLengths = planetsMap.map(p => p.length); console.log("map lengths:", planetsLengths);
const studentsMap = [{ name: "Mango" }, { name: "Poly" }]; const namesMap = studentsMap.map(s => s.name); console.log("map names:", namesMap);
// Task 2: Названия книг (упрощено)
const booksMap = [{ title: "Book A" }, { title: "Book B" }]; const titlesMap = booksMap.map(b => b.title); console.log("Названия книг:", titlesMap);
// --- Метод flatMap() ---
const studentsWithCourses = [{ name: "M", courses: ["math", "phys"] }, { name: "P", courses: ["sci", "math"] }];
const flattenedCourses = studentsWithCourses.flatMap(s => s.courses); console.log("flatMap courses:", flattenedCourses);
const booksWithGenres = [{ genres: ["adv", "hist"] }, { genres: ["fic"] }]; const genresFlatMap = booksWithGenres.flatMap(b => b.genres); console.log("flatMap genres:", genresFlatMap);

// ===== КОД ИЗ РАЗДЕЛА FILTER И FIND =====
console.log("\n\n===== FILTER И FIND =====");
// --- Метод filter() ---
const valuesFilter = [51, -3, 27, -68];
const positiveValuesFilter = valuesFilter.filter(value => value >= 0); console.log("filter (>0):", positiveValuesFilter);
// Task 1: Четные/нечетные
const numbersFilter = [17, 24, 82, 61];
const evenNumbersFilter = numbersFilter.filter(n => n % 2 === 0); console.log("filter (четные):", evenNumbersFilter);
// Объекты
const studentsFilter = [{ name: "Mango", score: 83 }, { name: "Kiwi", score: 94 }]; // Упрощенный
const HIGH_SCORE_F = 80; const bestStudentsFilter = studentsFilter.filter(s => s.score >= HIGH_SCORE_F); console.log("filter (лучшие):", bestStudentsFilter);
// Task 3: Цвет глаз (упрощено)
const usersEyeColorFilter = [{ name: "M", eyeColor: "blue" }, { name: "S", eyeColor: "blue" }];
const getUsersWithEyeColorFilter = (arr, color) => arr.filter(u => u.eyeColor === color);
console.log("filter (синеглазые):", getUsersWithEyeColorFilter(usersEyeColorFilter, "blue").map(u => u.name));
// --- Метод find() ---
const colorOptionsFind = [{ label: "red" }, { label: "blue" }];
const blueOptionFind = colorOptionsFind.find(o => o.label === "blue"); console.log("find(blue):", blueOptionFind);
const yellowOptionFind = colorOptionsFind.find(o => o.label === "yellow"); console.log("find(yellow):", yellowOptionFind);
// Task 2: Поиск email (упрощено)
const usersFind = [{ name: "M", email: "m@e.co" }, { name: "S", email: "s@e.co" }];
const getUserWithEmailFind = (arr, email) => arr.find(u => u.email === email);
const user1Find = getUserWithEmailFind(usersFind, "s@e.co"); console.log("find (user1):", user1Find);

// ===== КОД ИЗ РАЗДЕЛА EVERY, SOME, REDUCE =====
console.log("\n\n===== EVERY, SOME, REDUCE =====");
// --- Метод every() ---
const allPositive1Every = [1, 2].every(v => v >= 0); console.log("[1,2].every(>=0):", allPositive1Every);
const allPositive2Every = [1, -2].every(v => v >= 0); console.log("[1,-2].every(>=0):", allPositive2Every);
const productsEvery = [{ qty: 2 }, { qty: 0 }]; const hasEvery = productsEvery.every(p => p.qty > 0); console.log("Every(qty>0):", hasEvery);
// Task: Все активны?
const usersEvery = [{ isActive: true }, { isActive: false }]; const isEveryActive = (arr) => arr.every(u => u.isActive); console.log("Every(active):", isEveryActive(usersEvery));
// --- Метод some() ---
const hasPositive1Some = [-1, 3].some(v => v >= 0); console.log("[-1,3].some(>=0):", hasPositive1Some);
const hasNegative1Some = [1, 2].some(v => v < 0); console.log("[1,2].some(<0):", hasNegative1Some);
// Task: Есть активные?
const usersSome = [{ isActive: false }, { isActive: true }]; const isAnyActive = (arr) => arr.some(u => u.isActive); console.log("Some(active):", isAnyActive(usersSome));
// --- Метод reduce() ---
const numbersReduce = [2, 7, 3]; const totalSumReduce = numbersReduce.reduce((s, n) => s + n, 0); console.log("Reduce(сумма):", totalSumReduce);
// Task 1: Общее время
const playtimesReduce = [1270, 468]; const totalPlayTimeReduce = playtimesReduce.reduce((t, time) => t + time, 0); console.log("Reduce(время):", totalPlayTimeReduce);
// Объекты: сумма баллов
const studentsReduce = [{ score: 83 }, { score: 59 }]; const totalScoreReduce = studentsReduce.reduce((t, s) => t + s.score, 0); console.log("Reduce(баллы):", totalScoreReduce);
// Task 3: Общий баланс (упрощено)
const usersBalanceReduce = [{ balance: 2811 }, { balance: 3821 }]; const calcTotalBal = (arr) => arr.reduce((t, u) => t + u.balance, 0); console.log("Reduce(баланс):", calcTotalBal(usersBalanceReduce));

// ===== КОД ИЗ РАЗДЕЛА toSorted() и связанные темы =====
console.log("\n\n===== toSorted() =====");
// --- Сортировка по умолчанию ---
const scoresDefaultSort = [61, 19, 74]; const ascScoresDefSort = scoresDefaultSort.toSorted(); console.log("toSorted() числа (умолч.):", ascScoresDefSort); // Переименовал
const trickyScoresDefaultSort = [27, 2, 41]; const trickySortedDefSort = trickyScoresDefaultSort.toSorted(); console.log("toSorted() tricky (умолч.):", trickySortedDefSort); // Переименовал
// Task 1:
const releaseDatesDefSort = [2016, 1967]; const authorsDefSort = ["Lee", "Cornwell"]; // Переименовал
const ascRelDatesDefSort = releaseDatesDefSort.toSorted(); console.log("toSorted() даты (умолч.):", ascRelDatesDefSort);
const alphaAuthDefSort = authorsDefSort.toSorted(); console.log("toSorted() авторы (умолч.):", alphaAuthDefSort);
// --- Пользовательская сортировка чисел ---
const scoresCustomSort = [61, 19, 74];
const ascScoresCustom = scoresCustomSort.toSorted((a, b) => a - b); console.log("toSorted() числа (возр.):", ascScoresCustom);
const descScoresCustom = scoresCustomSort.toSorted((a, b) => b - a); console.log("toSorted() числа (убыв.):", descScoresCustom);
// Task 2: Даты
const releaseDatesCustomSort = [2016, 1967, 2008];
const ascDatesCustom = releaseDatesCustomSort.toSorted((a, b) => a - b); console.log("toSorted() даты (возр.):", ascDatesCustom);
const descDatesCustom = releaseDatesCustomSort.toSorted((a, b) => b - a); console.log("toSorted() даты (убыв.):", descDatesCustom);
// --- Пользовательская сортировка строк (localeCompare) ---
const studentsLocaleSort = ["Jacob", "Artemis"];
const alphaLocale = studentsLocaleSort.toSorted((a, b) => a.localeCompare(b)); console.log("toSorted() строки (алф):", alphaLocale);
const revAlphaLocale = studentsLocaleSort.toSorted((a, b) => b.localeCompare(a)); console.log("toSorted() строки (обр):", revAlphaLocale);
// Task 3: Авторы
const authorsLocaleSort = ["Lee", "Cornwell"];
const authorsAlpha = authorsLocaleSort.toSorted((a, b) => a.localeCompare(b)); console.log("toSorted() авторы (алф):", authorsAlpha);
const authorsRev = authorsLocaleSort.toSorted((a, b) => b.localeCompare(a)); console.log("toSorted() авторы (обр):", authorsRev);
// --- Сортировка массива объектов ---
const studentsSortObj = [{ name: "Mango", score: 83 }, { name: "Ajax", score: 37 }];
const ascScoreObj = studentsSortObj.toSorted((a, b) => a.score - b.score); console.log("toSorted() объекты (балл возр):", ascScoreObj);
const alphaNameObj = studentsSortObj.toSorted((a, b) => a.name.localeCompare(b.name)); console.log("toSorted() объекты (имя алф):", alphaNameObj);
// Task 4: Книги
const booksSort = [{ author: "BC", rating: 8.38 }, { author: "RS", rating: 8.51 }];
const sortedByAuthorSort = booksSort.toSorted((a, b) => a.author.localeCompare(b.author)); console.log("toSorted() книги (автор):", sortedByAuthorSort.map(b => b.author));
const sortedByRatingDescSort = booksSort.toSorted((a, b) => b.rating - a.rating); console.log("toSorted() книги (рейт убыв):", sortedByRatingDescSort.map(b => b.rating));
// --- sort() vs toSorted() ---
const originalArraySort = [3, 1, 4]; const sortedCopy = originalArraySort.toSorted((a, b) => a - b); console.log("toSorted():", originalArraySort, sortedCopy);
const sortMutates = [3, 1, 4]; const ref = sortMutates.sort((a, b) => a - b); console.log("sort():", sortMutates, ref);

// --- Цепочки методов ---
console.log("\n--- Цепочки методов ---");
const studentsChain = [{ name: "Poly", score: 59 }, { name: "Mango", score: 83 }];
const namesChain = studentsChain.toSorted((a, b) => a.score - b.score).map(s => s.name); console.log("Chain (имена по баллам):", namesChain);
const studentsCoursesChain = [{ courses: ["math", "phys"] }, { courses: ["sci", "math"] }];
const uniqueCoursesChain = studentsCoursesChain.flatMap(s => s.courses).filter((c, i, a) => a.indexOf(c) === i).toSorted((a, b) => a.localeCompare(b)); console.log("Chain (уник. курсы):", uniqueCoursesChain);
// Task 5: Имена авторов (цепочка)
const booksChain = [{ author: "BC", rating: 8.38 }, { author: "RS", rating: 8.51 }, { author: "BC", rating: 8.67 }];
const MIN_RATING_CHAIN = 8;
const highRatedUniqueAuthors = booksChain.filter(b => b.rating > MIN_RATING_CHAIN).map(b => b.author).filter((a, i, arr) => arr.indexOf(a) === i).toSorted((a, b) => a.localeCompare(b));
console.log(`Chain (Авторы >${MIN_RATING_CHAIN} рейт.):`, highRatedUniqueAuthors);

// === Деструктуризация массивов ===
console.log("\n--- Деструктуризация ---");
let colorsDestr = ["красный", "зеленый"];
let [red, green] = colorsDestr; console.log(red, green);
let [head, ...tail] = [1, 2, 3]; console.log("rest:", head, tail);

console.log("\n===== КОНЕЦ РАЗДЕЛА МАССИВЫ =====");

// --- Логика для выполнения примеров на странице arrays.html ---
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

// --- Конец файла 02_arrays.js ---