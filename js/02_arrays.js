// ===== МАССИВЫ В JAVASCRIPT =====
console.log("===== МАССИВЫ =====");

// === Создание массивов ===
console.log("\n--- Создание массивов ---");
// ... (код создания)

// === Доступ к элементам массива ===
console.log("\n--- Доступ и изменение ---");
// ... (код доступа)

// === Основные методы массивов ===
console.log("\n--- Основные методы ---");
// ... (код основных методов: push, pop, ..., concat, slice, join)
// Убрали sort отсюда, т.к. он подробно в toSorted

// === Перебор элементов массива ===
console.log("\n--- Перебор элементов ---");
// ... (код for, for..of, forEach)

// === Деструктуризация массивов ===
console.log("\n--- Деструктуризация ---");
// ... (код деструктуризации)


// ===== КОД ИЗ РАЗДЕЛА ЧИСТЫЕ ФУНКЦИИ, MAP, FLATMAP =====
console.log("\n\n===== ЧИСТЫЕ ФУНКЦИИ, MAP, FLATMAP =====");
// ... (код map, flatMap, чистые функции)

// ===== КОД ИЗ РАЗДЕЛА FILTER И FIND =====
console.log("\n\n===== FILTER И FIND =====");
// ... (код filter, find)


// ===== КОД ИЗ РАЗДЕЛА EVERY, SOME, REDUCE =====
console.log("\n\n===== EVERY, SOME, REDUCE =====");
// ... (код every, some, reduce)


// ===== КОД ИЗ РАЗДЕЛА toSorted() и связанные темы =====
console.log("\n\n===== toSorted() =====");

// --- Сортировка по умолчанию ---
console.log("\n--- Сортировка по умолчанию (toSorted) ---");
const scoresDefaultSort = [61, 19, 74, 35, 92, 56];
const ascendingScoresDefaultSort = scoresDefaultSort.toSorted();
console.log("Числа (по умолч.):", ascendingScoresDefaultSort);
const trickyScoresDefaultSort = [27, 2, 41, 4, 7, 3, 75];
const trickySortedDefaultSort = trickyScoresDefaultSort.toSorted();
console.log("Числа 'tricky' (по умолч.):", trickySortedDefaultSort); // [2, 27, 3, 4, 41, 7, 75]
const studentsDefaultSort = ["Jacob", "Artemis", "Solomon"];
console.log("Строки (по умолч.):", studentsDefaultSort.toSorted());
const lettersDefaultSort = ["b", "B", "a", "A"];
console.log("Буквы (по умолч.):", lettersDefaultSort.toSorted());
// Task 1:
const releaseDatesDefaultSort = [2016, 1967, 2008, 1984, 1973, 2012, 1997];
const authorsDefaultSort = ["Lee", "Cornwell", "Sheckley", "Dostoevsky"];
const ascendingReleaseDatesDefSort = releaseDatesDefaultSort.toSorted(); // Переименовал
const alphabeticalAuthorsDefSort = authorsDefaultSort.toSorted(); // Переименовал
console.log("Даты по умолч.:", ascendingReleaseDatesDefSort);
console.log("Авторы по умолч.:", alphabeticalAuthorsDefSort);

// --- Пользовательская сортировка чисел ---
console.log("\n--- Пользовательская сортировка чисел (toSorted) ---");
const scoresCustomSort = [61, 19, 74, 35, 92, 56];
const ascendingScoresCustomSort = scoresCustomSort.toSorted((a, b) => a - b);
console.log("Числа (возр.):", ascendingScoresCustomSort);
const descendingScoresCustomSort = scoresCustomSort.toSorted((a, b) => b - a);
console.log("Числа (убыв.):", descendingScoresCustomSort);
// Task 2: Даты
const releaseDatesCustomSort = [2016, 1967, 2008, 1984, 1973, 2012, 1997];
const ascendingDatesCustomSort = releaseDatesCustomSort.toSorted((a, b) => a - b); // Переименовал
console.log("Даты (возр.):", ascendingDatesCustomSort);
const descendingDatesCustomSort = releaseDatesCustomSort.toSorted((a, b) => b - a); // Переименовал
console.log("Даты (убыв.):", descendingDatesCustomSort);

// --- Пользовательская сортировка строк (localeCompare) ---
console.log("\n--- Пользовательская сортировка строк (localeCompare) ---");
const studentsLocaleSort = ["Jacob", "Artemis", "Solomon", "Adrian", "Kai"];
const inAlphabetOrderLocaleSort = studentsLocaleSort.toSorted((a, b) => a.localeCompare(b)); // Переименовал
console.log("Студенты (алф):", inAlphabetOrderLocaleSort);
const inReversedOrderLocaleSort = studentsLocaleSort.toSorted((a, b) => b.localeCompare(a)); // Переименовал
console.log("Студенты (обр):", inReversedOrderLocaleSort);
// Task 3: Авторы
const authorsLocaleSort = ["Lee", "Cornwell", "Sheckley", "Dostoevsky", "Lovecraft"];
const authorsInAlphabetOrderSort = authorsLocaleSort.toSorted((a, b) => a.localeCompare(b)); // Переименовал
console.log("Авторы (алф):", authorsInAlphabetOrderSort);
const authorsInReversedOrderSort = authorsLocaleSort.toSorted((a, b) => b.localeCompare(a)); // Переименовал
console.log("Авторы (обр):", authorsInReversedOrderSort);

// --- Сортировка массива объектов ---
console.log("\n--- Сортировка объектов (toSorted) ---");
const studentsSortObj = [{ name: "Mango", score: 83 }, { name: "Poly", score: 59 }, { name: "Ajax", score: 37 }, { name: "Kiwi", score: 94 }];
const ascScoreObj = studentsSortObj.toSorted((a, b) => a.score - b.score); // Переименовал
console.log("Сорт по баллам (возр):", ascScoreObj);
const alphaNameObj = studentsSortObj.toSorted((a, b) => a.name.localeCompare(b.name)); // Переименовал
console.log("Сорт по имени (алф):", alphaNameObj);
// Task 4: Книги
const booksSort = [{ title: "TLK", author: "BC", rating: 8.38 }, { title: "EOG", author: "BC", rating: 8.67 }, { title: "B", author: "RS", rating: 8.51 }]; // Упрощенный
const sortedByAuthorNameSort = booksSort.toSorted((a, b) => a.author.localeCompare(b.author)); // Переименовал
const sortedByDescendingRatingSort = booksSort.toSorted((a, b) => b.rating - a.rating); // Переименовал
console.log("Книги по автору (алф):", sortedByAuthorNameSort.map(b => b.author));
console.log("Книги по рейтингу (убыв):", sortedByDescendingRatingSort.map(b => b.rating));

// --- Цепочки методов ---
console.log("\n--- Цепочки методов ---");
const studentsChain = [{ name: "Mango", score: 83 }, { name: "Poly", score: 59 }, { name: "Ajax", score: 37 }]; // Упрощенный
const namesChain = studentsChain.toSorted((a, b) => a.score - b.score).map(student => student.name);
console.log("Имена (сорт по баллам):", namesChain); // ["Ajax", "Poly", "Mango"]
const studentsCoursesChain = [{ name: "M", courses: ["math", "phys"] }, { name: "P", courses: ["sci", "math"] }, { name: "K", courses: ["phys", "bio"] }]; // Упрощенный
const uniqueSortedCourses = studentsCoursesChain
  .flatMap(student => student.courses)
  .filter((course, index, array) => array.indexOf(course) === index)
  .toSorted((a, b) => a.localeCompare(b));
console.log("Уникальные курсы (алф):", uniqueSortedCourses); // ["bio", "math", "phys", "sci"]
// Task 5: Имена авторов (цепочка)
const booksChain = [{ title: "A", author: "BC", rating: 8.38 }, { title: "B", author: "RS", rating: 8.51 }, { title: "C", author: "BC", rating: 8.67 }]; // Упрощенный
const MIN_RATING_CHAIN = 8;
const highRatedUniqueAuthors = booksChain // Переименовал
  .filter(book => book.rating > MIN_RATING_CHAIN)
  .map(book => book.author)
  .filter((author, index, array) => array.indexOf(author) === index)
  .toSorted((a, b) => a.localeCompare(b));
console.log(`Авторы (рейтинг > ${MIN_RATING_CHAIN}, сорт):`, highRatedUniqueAuthors); // ["BC", "RS"]

// --- sort() vs toSorted() ---
console.log("\n--- sort() vs toSorted() ---");
const originalArraySort = [3, 1, 4];
const sortedCopy = originalArraySort.toSorted((a, b) => a - b);
console.log("toSorted(): Оригинал:", originalArraySort, "Копия:", sortedCopy); // Оригинал [3, 1, 4], Копия [1, 3, 4]
const sortMutates = [3, 1, 4];
const referenceToOriginal = sortMutates.sort((a, b) => a - b);
console.log("sort(): Оригинал:", sortMutates, "Результат:", referenceToOriginal); // Оригинал [1, 3, 4], Результат [1, 3, 4]


console.log("\n===== КОНЕЦ РАЗДЕЛА МАССИВЫ =====");