// ===== Файл: js/module4_page.js =====
// Этот файл содержит логику для кнопок "Запустить пример"
// на странице с материалами по JSON, Хранилищу, Инструментам и Модулям.

// --- Объект с кодом для примеров, запускаемых кнопками ---
// Ключи объекта соответствуют значениям атрибута 'data-example' у кнопок.
const examples = {
    // --- Примеры для JSON ---
    "json-stringify-object": () => {
        console.log("===== Пример JSON.stringify() с объектом =====");
        const dog = { name: "Mango", age: 3, isGoodBoy: true };
        console.log("Исходный объект:", dog);
        const jsonString = JSON.stringify(dog);
        console.log("Результат JSON.stringify():", jsonString);
        console.log("Тип результата:", typeof jsonString);
    },
    "json-stringify-methods": () => {
        console.log("\n===== Пример JSON.stringify() с методами =====");
        const dogWithMethod = {
            name: "Mango", age: 3, isGoodBoy: true,
            bark() { console.log("Woof!"); }
        };
        console.log("Объект с методом:", dogWithMethod);
        const jsonStringWithMethod = JSON.stringify(dogWithMethod);
        console.log("Результат JSON.stringify():", jsonStringWithMethod); // Метод проигнорирован

        console.log("\n===== Попытка JSON.stringify() с функцией =====");
        const myFunc = () => console.log("Это не сработает");
        console.log("Исходная функция:", myFunc);
        const jsonFromFunction = JSON.stringify(myFunc);
        console.log("Результат JSON.stringify(функция):", jsonFromFunction); // undefined
    },
    "json-parse": () => {
        console.log("===== Пример JSON.parse() =====");
        const jsonString = '{"name":"Mango","age":3,"isGoodBoy":true,"features":["loyal", "friendly"]}';
        console.log("Исходная JSON-строка:", jsonString);
        console.log("Тип исходной строки:", typeof jsonString);

        const dogObject = JSON.parse(jsonString);
        console.log("\nРезультат JSON.parse():", dogObject);
        console.log("Тип результата:", typeof dogObject);
        console.log("Свойство name:", dogObject.name);
        console.log("Свойство age:", dogObject.age);
        console.log("Свойство features (массив):", dogObject.features);

        console.log("\nПарсинг других типов:");
        console.log("JSON.parse('5'):", JSON.parse("5"), `(тип: ${typeof JSON.parse("5")})`);
        console.log("JSON.parse('false'):", JSON.parse("false"), `(тип: ${typeof JSON.parse("false")})`);
        console.log("JSON.parse('null'):", JSON.parse("null"), `(тип: ${typeof JSON.parse("null")})`);
        console.log("JSON.parse('[1, \"два\", true]'):", JSON.parse('[1, "два", true]'), `(тип: ${typeof JSON.parse('[1, "два", true]')})`);
    },
    "json-try-catch": () => {
        console.log("===== Пример try...catch с JSON.parse() =====");
        const invalidJsonString = "Это точно не JSON";
        console.log(`\nПытаемся распарсить невалидный JSON: "${invalidJsonString}"`);
        try {
            const data = JSON.parse(invalidJsonString);
            console.log("Успешно распарсили:", data);
        } catch (error) {
            console.error("❌ Поймали ошибку при парсинге!");
            console.error("   Тип ошибки (error.name):", error.name);
            console.error("   Сообщение (error.message):", error.message);
        }
        console.log("✅ Скрипт продолжает работать после try...catch.");

        const validJsonString = '{"city": "Kyiv", "country": "Ukraine"}';
        console.log(`\nПытаемся распарсить валидный JSON: "${validJsonString}"`);
        try {
            const locationData = JSON.parse(validJsonString);
            console.log("✅ Успешно распарсили валидный JSON:", locationData);
        } catch (error) {
            console.error("❌ Эта ошибка не должна появиться:", error.message);
        }
        console.log("✅ Скрипт завершил работу.");
    },
    "runtime-error": () => {
        console.log("===== Пример ошибки времени выполнения =====");
        try {
            let user = { name: "Alice" };
            console.log("Пользователь:", user);
            console.log("Пытаемся получить user.profile.age...");
            console.log(user.profile.age); // ОШИБКА ЗДЕСЬ!
            console.log("Этот текст не будет выведен.");
        } catch (e) {
            console.error("❌ Поймали ошибку времени выполнения!");
            console.error("   Тип ошибки:", e.name);
            console.error("   Сообщение:", e.message);
        }
        console.log("✅ Скрипт продолжает работу после ошибки.");
    },

    // --- Примеры для Web Storage ---
    "localstorage-setitem": () => {
        console.log("===== Пример localStorage.setItem() =====");
        console.log("localStorage до:", localStorage);
        localStorage.setItem("ui-theme", "light");
        console.log("Добавили ключ 'ui-theme' со значением 'light'");
        localStorage.setItem("notification-preference", "muted");
        console.log("Добавили ключ 'notification-preference' со значением 'muted'");
        console.log("localStorage после добавления:", localStorage);
        localStorage.setItem("ui-theme", "dark");
        console.log("Обновили ключ 'ui-theme' на значение 'dark'");
        console.log("localStorage после обновления:", localStorage);
        localStorage.removeItem("ui-theme");
        localStorage.removeItem("notification-preference");
        console.log("Очистили добавленные ключи.");
    },
    "localstorage-setitem-complex": () => {
        console.log("===== Пример localStorage.setItem() с объектом =====");
        const settings = { theme: "dark", isAuthenticated: true, options: [1, 2, 3], userName: "Alex" };
        console.log("Исходный объект:", settings);
        const settingsString = JSON.stringify(settings);
        console.log("Объект как JSON-строка:", settingsString);
        localStorage.setItem("app-settings", settingsString);
        console.log("Строка сохранена в localStorage под ключом 'app-settings'.");
        console.log("localStorage после сохранения объекта:", localStorage);
        localStorage.removeItem("app-settings");
        console.log("Очистили ключ 'app-settings'.");
    },
    "localstorage-getitem": () => {
        console.log("===== Пример localStorage.getItem() =====");
        localStorage.setItem("user-name", "Bob");
        const userSettings = { level: 5, premium: false };
        localStorage.setItem("user-settings", JSON.stringify(userSettings));
        console.log("Сохранили 'user-name' и 'user-settings' в localStorage.");
        console.log("Текущий localStorage:", localStorage);

        const savedName = localStorage.getItem("user-name");
        console.log("\nПолучаем 'user-name':");
        console.log("   Значение:", savedName);
        console.log("   Тип:", typeof savedName);

        const nonExistent = localStorage.getItem("non-existent-key");
        console.log("\nПолучаем 'non-existent-key':");
        console.log("   Значение:", nonExistent);

        const savedSettingsString = localStorage.getItem("user-settings");
        console.log("\nПолучаем 'user-settings' (как строку):");
        console.log("   Значение:", savedSettingsString);
        console.log("   Тип:", typeof savedSettingsString);

        let parsedSettings = null;
        console.log("\nПарсим строку 'user-settings':");
        if (savedSettingsString) {
            try {
                parsedSettings = JSON.parse(savedSettingsString);
                console.log("   Результат парсинга:", parsedSettings);
                console.log("   Тип результата:", typeof parsedSettings);
                console.log("   Уровень пользователя:", parsedSettings.level);
            } catch (error) {
                console.error("❌ Ошибка парсинга 'user-settings':", error);
            }
        } else {
            console.log("Строка 'user-settings' не найдена в localStorage.");
        }
        localStorage.removeItem("user-name");
        localStorage.removeItem("user-settings");
        console.log("\nОчистили ключи 'user-name' и 'user-settings'.");
    },
    "localstorage-remove": () => {
        console.log("===== Пример localStorage.removeItem() и clear() =====");
        localStorage.setItem("theme", "dark");
        localStorage.setItem("lang", "ru");
        localStorage.setItem("temp", "123");
        console.log("localStorage перед удалением:", localStorage);
        localStorage.removeItem("temp");
        console.log("\nУдалили ключ 'temp'.");
        console.log("localStorage после removeItem:", localStorage);
        console.log("Значение удаленного ключа 'temp':", localStorage.getItem("temp"));
        console.log("\nВызываем clear()...");
        localStorage.clear();
        console.log("localStorage после clear:", localStorage);
        console.log("Длина localStorage:", localStorage.length);
    },
    "sessionstorage-examples": () => {
        console.log("===== Примеры работы с sessionStorage =====");
        console.log("Начальное состояние sessionStorage:", sessionStorage);
        sessionStorage.setItem("user-id", "12345");
        sessionStorage.setItem("current-tab-status", "active");
        const sessionData = { page: "/profile", timestamp: Date.now() };
        sessionStorage.setItem("session-info", JSON.stringify(sessionData));
        console.log("\nДобавили данные в sessionStorage.");
        console.log("sessionStorage после добавления:", sessionStorage);
        const userId = sessionStorage.getItem("user-id");
        console.log("\nПолучаем 'user-id':", userId);
        const sessionInfoString = sessionStorage.getItem("session-info");
        let parsedSessionInfo = null;
        try { parsedSessionInfo = JSON.parse(sessionInfoString); } catch (e) { console.error("Ошибка парсинга:", e); }
        console.log("Получаем и парсим 'session-info':", parsedSessionInfo);
        sessionStorage.removeItem("current-tab-status");
        console.log("\nУдалили 'current-tab-status'.");
        console.log("sessionStorage после removeItem:", sessionStorage);
        console.log("\n--- Важно ---");
        console.log("Данные sessionStorage удалятся при закрытии этой вкладки/окна.");
        sessionStorage.removeItem("user-id");
        sessionStorage.removeItem("session-info");
    },

    // --- Примеры для Модулей (симуляция) ---
    "default-import-simulated": () => {
        console.log("===== Пример импорта по умолчанию (Симуляция) =====");
        const myCalc_simulated = { add(a, b) { return a + b; }, subtract(a, b) { return a - b; } };
        console.log("Симулированный импорт (myCalc):", myCalc_simulated);
        const sum = myCalc_simulated.add(10, 5);
        const difference = myCalc_simulated.subtract(10, 5);
        console.log(`Результат сложения (10 + 5): ${sum}`);
        console.log(`Результат вычитания (10 - 5): ${difference}`);
        console.warn("Примечание: Настоящий 'import' требует модульной среды (Vite, Node.js).");
    },
    "named-import-simulated": () => {
        console.log("===== Пример именованного импорта (Симуляция) =====");
        const PI_simulated = 3.14159;
        function greet_simulated(name) { return `Привет, ${name}!`; }
        console.log("Симулированный импорт: PI =", PI_simulated, ", greet =", greet_simulated);
        console.log(`Значение PI: ${PI_simulated}`);
        const greeting = greet_simulated("Алиса");
        console.log(greeting);
        console.warn("Примечание: Настоящий 'import' требует модульной среды.");
    },
    "rename-import-simulated": () => {
        console.log("===== Пример импорта с переименованием (Симуляция) =====");
        function processData_simulated(data) { console.log("Обработка:", data); return true; }
        const options_simulated = { timeout: 5000 };
        console.log("Симулированный импорт: processData =", processData_simulated, ", options =", options_simulated);
        const result = processData_simulated("Тестовые данные");
        console.log(`Результат processData: ${result}`);
        console.log(`Таймаут из options: ${options_simulated.timeout}`);
        console.warn("Примечание: Настоящий 'import' требует модульной среды.");
    },
    "namespace-import-simulated": () => {
        console.log("===== Пример импорта пространства имен (Симуляция) =====");
        const h_simulated = {
            MAX_RETRIES: 3,
            validateInput(input) { return input.length > 0; },
            formatError(msg) { return `[ОШИБКА] ${msg}`; }
        };
        console.log("Симулированный импорт (объект h):", h_simulated);
        console.log(`Макс. попыток: ${h_simulated.MAX_RETRIES}`);
        const isValid = h_simulated.validateInput("текст");
        console.log(`Результат валидации: ${isValid}`);
        const errorMsg = h_simulated.formatError("Что-то пошло не так");
        console.log(errorMsg);
        console.warn("Примечание: Настоящий 'import' требует модульной среды.");
    }
};

// --- Логика инициализации страницы и обработчиков ---
// Используем DOMContentLoaded, чтобы скрипт выполнялся после полной загрузки HTML.
document.addEventListener('DOMContentLoaded', () => {
    // Сообщение о начале инициализации.
    console.log("DOM загружен. Инициализация страницы module4_page.js...");

    // --- Инициализация формы обратной связи (если она есть на странице) ---
    const feedbackForm = document.querySelector(".feedback-form-example");
    const feedbackTextarea = feedbackForm ? feedbackForm.elements.message : null;
    const feedbackStorageKey = "feedback-form-message-example";

    if (feedbackForm && feedbackTextarea) {
        console.log("   Инициализация формы обратной связи с localStorage...");
        try {
            const savedMessage = localStorage.getItem(feedbackStorageKey);
            if (savedMessage) { feedbackTextarea.value = savedMessage; }
        } catch (e) { console.error("   Ошибка чтения из localStorage:", e); }

        feedbackForm.addEventListener("input", (event) => {
            if (event.target === feedbackTextarea) {
                try { localStorage.setItem(feedbackStorageKey, feedbackTextarea.value); }
                catch (e) { console.error("   Ошибка записи в localStorage:", e); }
            }
        });

        feedbackForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const submittedMessage = feedbackTextarea.value;
            if (submittedMessage.trim() === "") { alert("Пожалуйста, введите сообщение."); return; }
            console.log("Отправляем отзыв (в консоль):", submittedMessage);
            try { localStorage.removeItem(feedbackStorageKey); }
            catch (e) { console.error("   Ошибка удаления из localStorage:", e); }
            feedbackForm.reset();
            alert("Отзыв 'отправлен' (см. консоль)!");
        });
        console.log("   Инициализация формы завершена.");
    } else {
        console.warn("   Форма '.feedback-form-example' не найдена.");
    }
    // --- Конец инициализации формы ---


    // --- Инициализация кнопок "Запустить пример" ---
    console.log("   Назначаем обработчики на кнопки 'run-code'...");
    const runButtons = document.querySelectorAll('.run-code');
    if (runButtons.length === 0) {
        console.warn("   Не найдено ни одной кнопки с классом '.run-code'.");
        return; // Выходим, если кнопок нет
    }

    runButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.closest('.code-block');
            if (!codeBlock) { console.warn("Не найден '.code-block' для кнопки"); return; }
            const outputDiv = codeBlock.querySelector('.output');
            if (!outputDiv) { console.warn("Не найден '.output' для кнопки"); return; }

            const exampleId = button.getAttribute('data-example');
            outputDiv.innerHTML = ''; // Очищаем предыдущий вывод
            outputDiv.classList.remove('error', 'warning'); // Снимаем классы ошибок/предупреждений

            // --- Перехват console ---
            const originalConsoleLog = console.log;
            const originalConsoleError = console.error;
            const originalConsoleWarn = console.warn;
            const logs = [];
            const logHandler = (type) => (...args) => {
                const formattedArgs = args.map(arg => {
                    if (arg instanceof Error) return `Error: ${arg.message}\n${arg.stack ? arg.stack.split('\n').slice(0, 2).join('\n') : ''}`;
                    if (typeof arg === 'object' && arg !== null) {
                        try { return JSON.stringify(arg, null, 2); } catch (e) { return '[Circular Object]'; }
                    }
                    return String(arg);
                });
                logs.push({ type: type, message: formattedArgs.join(' ') });
                if (type === 'error') originalConsoleError.apply(console, args);
                else if (type === 'warn') originalConsoleWarn.apply(console, args);
                else originalConsoleLog.apply(console, args);
            };
            console.log = logHandler('log');
            console.error = logHandler('error');
            console.warn = logHandler('warn');
            // --- Конец перехвата console ---

            try {
                if (examples[exampleId]) {
                    examples[exampleId](); // Выполняем код примера
                    if (logs.length > 0) {
                        logs.forEach(log => {
                            const p = document.createElement('p');
                            // Используем textContent для безопасности, заменяя переводы строк на <br>
                            p.textContent = log.message;
                            p.innerHTML = p.innerHTML.replace(/\n/g, '<br>'); // Теперь можно безопасно заменить
                            p.classList.add(`log-${log.type}`); // log-log, log-warn, log-error
                            if (log.type === 'error') outputDiv.classList.add('error');
                            if (log.type === 'warn') outputDiv.classList.add('warning');
                            outputDiv.appendChild(p);
                        });
                    } else {
                        const p = document.createElement('p');
                        p.textContent = "Код выполнен без вывода в console.";
                        p.classList.add('log-info', 'italic'); // Добавляем стили для информационных сообщений
                        outputDiv.appendChild(p);
                    }
                } else {
                    throw new Error(`Пример с id "${exampleId}" не найден в 'examples'.`);
                }
            } catch (error) {
                console.error("Ошибка выполнения кода примера:", error); // Выведет в консоль и в output через перехватчик
                if (!logs.some(log => log.type === 'error')) { // Дополнительно выводим, если не попало через перехват
                    const p = document.createElement('p');
                    p.textContent = `Ошибка выполнения: ${error.name}: ${error.message}`;
                    p.innerHTML = p.innerHTML.replace(/\n/g, '<br>');
                    p.classList.add('log-error');
                    outputDiv.appendChild(p);
                    outputDiv.classList.add('error');
                }
            } finally {
                // --- Восстановление console ---
                console.log = originalConsoleLog;
                console.error = originalConsoleError;
                console.warn = originalConsoleWarn;
            }
        }); // Конец обработчика 'click'
    }); // Конец forEach
    console.log("   Обработчики на кнопки 'run-code' назначены.");

    // --- Добавление стилей для логов в output (если их нет в основном CSS) ---
    const styleExists = document.getElementById('module-page-log-styles');
    if (!styleExists) {
        const logStyles = document.createElement('style');
        logStyles.id = 'module-page-log-styles';
        logStyles.textContent = `
            .output .log-log { color: var(--text-main); }
            .output .log-warn { color: orange; }
            .output.warning { border-left: 3px solid orange; }
            .output .log-error { color: #ff5555; font-weight: bold; }
            .output.error { border-left: 3px solid #ff5555; }
            .output .italic { font-style: italic; color: var(--text-secondary); }
        `;
        document.head.appendChild(logStyles);
        console.log("   Добавлены стили для логов в output.");
    }


}); // Конец обработчика 'DOMContentLoaded'

// --- Конец файла module4_page.js ---
