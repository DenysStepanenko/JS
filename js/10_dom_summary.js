// ===== Файл: js/10_dom_summary.js =====
// Этот файл содержит логику для кнопок "Запустить пример" на странице dom_summary.html,
// а также инициализирует интерактивный TODO-список при загрузке страницы.

// --- Объект с кодом для примеров, запускаемых кнопками ---
// Ключи объекта ('search-elements', 'dom-navigation', и т.д.)
// соответствуют значениям атрибута 'data-example' у кнопок в HTML.
// Значения - это функции, которые будут выполнены при нажатии
// соответствующей кнопки "Запустить пример".
const examples = {
    // --- Код для примера "Поиск элементов" ---
    "search-elements": () => {
        // Этот код демонстрирует поиск элементов в DOM.
        console.log("===== 1. Поиск DOM-элементов =====");
        const heading = document.querySelector("h1");
        console.log("Первый заголовок (document.querySelector('h1')):", heading);
        const items = document.querySelectorAll(".item"); // Поиск всех .item (замените на реальный класс)
        console.log("Все элементы с классом '.item' (document.querySelectorAll('.item')):", items);
        items.forEach((item, index) => {
            console.log(`   Найденный элемент .item[${index}]:`, item);
        });
        const mainElement = document.querySelector("main");
        if (mainElement) {
            const firstParagraphInMain = mainElement.querySelector("p");
            console.log("\nПервый параграф внутри <main> (mainElement.querySelector('p')):", firstParagraphInMain);
        } else {
            console.log("\nЭлемент <main> не найден.");
        }
    },
    // --- Код для примера "Навигация по DOM" ---
    "dom-navigation": () => {
        // Этот код демонстрирует навигацию между DOM-элементами.
        console.log("===== 2. Навигация по DOM =====");
        // Создаем временные элементы в памяти для наглядности.
        const ul = document.createElement("ul");
        const li1 = document.createElement("li");
        li1.textContent = "Элемент 1";
        li1.id = "item-1";
        const li2 = document.createElement("li");
        li2.textContent = "Элемент 2";
        li2.id = "item-2";
        ul.append(li1, li2);
        console.log("Создана временная структура:", ul.outerHTML);
        // Используем навигационные свойства.
        console.log("\nРодитель li1 (li1.parentElement):", li1.parentElement);
        console.log("Дети ul (ul.children):", ul.children);
        console.log("Первый дочерний элемент ul (ul.firstElementChild):", ul.firstElementChild);
        console.log("Последний дочерний элемент ul (ul.lastElementChild):", ul.lastElementChild);
        console.log("Следующий соседний элемент для li1 (li1.nextElementSibling):", li1.nextElementSibling);
        console.log("Предыдущий соседний элемент для li2 (li2.previousElementSibling):", li2.previousElementSibling);
        console.log("Предыдущий соседний элемент для li1 (li1.previousElementSibling):", li1.previousElementSibling);
        console.log("Следующий соседний элемент для li2 (li2.nextElementSibling):", li2.nextElementSibling);
    },
    // --- Код для примера "Свойства элемента" ---
    "element-properties": () => {
        // Этот код демонстрирует работу со свойствами DOM-элементов.
        console.log("===== 3. Свойства DOM-элемента =====");
        const div = document.createElement("div");
        div.innerHTML = "<p>Это <strong>важный</strong> текст.</p>";
        console.log("Создан div:", div.outerHTML);
        // textContent
        console.log("\ntextContent:");
        console.log("   Чтение:", div.textContent);
        div.textContent = "Новый <span>простой</span> текст.";
        console.log("   После записи textContent (innerHTML):", div.innerHTML);
        // innerHTML
        div.innerHTML = "<p>Это <strong>важный</strong> текст.</p>";
        console.log("\ninnerHTML:");
        console.log("   Чтение:", div.innerHTML);
        div.innerHTML = "<ul><li>Новый</li><li>список</li></ul>";
        console.log("   После записи innerHTML:", div.innerHTML);
        // style
        console.log("\nstyle:");
        div.style.backgroundColor = "lightblue";
        div.style.padding = "15px";
        console.log("   style.backgroundColor:", div.style.backgroundColor);
        console.log("   style.padding:", div.style.padding);
        // Атрибуты
        console.log("\nАтрибуты:");
        div.setAttribute("id", "my-div");
        div.setAttribute("data-status", "active");
        console.log("   HTML после setAttribute:", div.outerHTML);
        console.log("   Есть ли атрибут 'id' (hasAttribute)?", div.hasAttribute("id"));
        console.log("   Значение 'id' (getAttribute):", div.getAttribute("id"));
        console.log("   Значение 'data-status' (getAttribute):", div.getAttribute("data-status"));
        console.log("   Значение 'data-status' (dataset.status):", div.dataset.status);
        div.dataset.status = "inactive";
        console.log("   Значение 'data-status' после изменения через dataset:", div.getAttribute("data-status"));
        div.removeAttribute("id");
        console.log("   Атрибут 'id' удалён (hasAttribute)?", !div.hasAttribute("id"));
        console.log("   HTML после removeAttribute:", div.outerHTML);
    },
    // --- Код для примера "CSS-классы" ---
    "css-classes": () => {
        // Этот код демонстрирует управление CSS-классами.
        console.log("===== 4. Управление CSS-классами =====");
        const box = document.createElement("div");
        box.classList.add("box");
        console.log("Начальные классы (box.className):", box.className);
        console.log("\ncontains:");
        console.log("   Есть ли класс 'box'?", box.classList.contains("box"));
        console.log("   Есть ли класс 'active'?", box.classList.contains("active"));
        console.log("\nadd 'active':");
        box.classList.add("active");
        console.log("   Классы после добавления 'active':", box.className);
        box.classList.add("highlighted", "important");
        console.log("   Классы после добавления 'highlighted', 'important':", box.className);
        console.log("\nremove 'active':");
        box.classList.remove("active");
        console.log("   Классы после удаления 'active':", box.className);
        console.log("\ntoggle 'highlighted' (удаление):");
        box.classList.toggle("highlighted");
        console.log("   Классы после первого toggle:", box.className);
        console.log("toggle 'highlighted' (добавление):");
        box.classList.toggle("highlighted");
        console.log("   Классы после второго toggle:", box.className);
        console.log("toggle 'visible' (force=true):");
        box.classList.toggle("visible", true);
        console.log("   Классы после toggle(true):", box.className);
        console.log("toggle 'visible' (force=false):");
        box.classList.toggle("visible", false);
        console.log("   Классы после toggle(false):", box.className);
        console.log("\nreplace 'box' with 'new-box':");
        box.classList.replace("box", "new-box");
        console.log("   Классы после замены:", box.className);
    },
    // --- Код для примера "Создание и удаление" ---
    "create-remove": () => {
        // Этот код демонстрирует создание, добавление и удаление элементов.
        console.log("===== 5. Создание и удаление элементов =====");
        const newDiv = document.createElement("div");
        newDiv.textContent = "Это новый динамически созданный элемент.";
        newDiv.style.padding = "10px";
        newDiv.style.backgroundColor = "#e0f7fa";
        newDiv.style.border = "1px solid #00796b";
        newDiv.style.margin = "10px 0";
        newDiv.style.borderRadius = "5px";
        newDiv.id = "dynamic-div";
        console.log("Создан и настроен элемент:", newDiv);
        document.body.prepend(newDiv);
        console.log("Элемент добавлен в начало body.");
        const htmlToInsert = "<p style='margin-top: 5px; color: #00796b;'><em>Добавлено через insertAdjacentHTML</em></p>";
        newDiv.insertAdjacentHTML("beforeend", htmlToInsert);
        console.log("HTML добавлен внутрь элемента.");
        const delaySeconds = 3;
        console.log(`Элемент будет удален со страницы через ${delaySeconds} секунды...`);
        setTimeout(() => {
            const elementToRemove = document.getElementById("dynamic-div");
            if (elementToRemove) {
                elementToRemove.remove();
                console.log("Элемент dynamic-div удалён со страницы.");
            } else {
                console.log("Элемент dynamic-div уже был удален ранее.");
            }
        }, delaySeconds * 1000);
    },
    // --- Код для примера "События" ---
    "events": () => {
        // Этот код демонстрирует добавление и удаление обработчиков событий.
        console.log("===== 6. Работа с событиями =====");
        const btn = document.createElement("button");
        btn.textContent = "Нажми меня (для click)";
        btn.id = "event-button";
        btn.style.marginRight = "10px";
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Введи текст (для input, focus, blur)";
        input.id = "event-input";
        input.style.margin = "10px 0";
        input.style.display = "block";
        const handleClick = (event) => {
            console.log("Кнопка нажата!");
            console.log("   Тип события:", event.type);
            console.log("   Цель события (event.target):", event.target);
        };
        btn.addEventListener("click", handleClick);
        console.log("Добавлен слушатель 'click' на кнопку.");
        input.addEventListener("input", (event) => console.log("Событие 'input'. Введено:", event.target.value));
        input.addEventListener("focus", () => { console.log("Событие 'focus'. Поле получило фокус!"); input.style.borderColor = "blue"; });
        input.addEventListener("blur", () => { console.log("Событие 'blur'. Поле потеряло фокус!"); input.style.borderColor = ""; });
        const eventSection = document.getElementById("события");
        if (eventSection) {
            eventSection.after(input);
            eventSection.after(btn);
        } else {
            document.body.append(btn, input);
        }
        console.log("Кнопка и поле ввода добавлены на страницу.");
        const removeClickListenerTimeout = 2000;
        console.log(`Слушатель 'click' будет удален с кнопки через ${removeClickListenerTimeout / 1000} сек.`);
        setTimeout(() => {
            btn.removeEventListener("click", handleClick);
            console.log("Слушатель 'click' удалён с кнопки.");
        }, removeClickListenerTimeout);
        const handleKeyDown = (event) => {
            console.log(`Событие 'keydown'. Нажата клавиша: Key='${event.key}', Code='${event.code}'`);
            document.removeEventListener("keydown", handleKeyDown);
            console.log("(Слушатель 'keydown' удален после первого нажатия)");
        };
        document.addEventListener("keydown", handleKeyDown);
        console.log("Добавлен слушатель 'keydown' на документ (сработает один раз).");
        const removalTimeout = 5000;
        console.log(`Кнопка и поле ввода будут удалены со страницы через ${removalTimeout / 1000} секунд.`);
        setTimeout(() => {
            const buttonToRemove = document.getElementById("event-button");
            const inputToRemove = document.getElementById("event-input");
            if (buttonToRemove) { buttonToRemove.remove(); console.log("Кнопка удалена."); }
            if (inputToRemove) { inputToRemove.remove(); console.log("Поле ввода удалено."); }
            document.removeEventListener("keydown", handleKeyDown);
        }, removalTimeout);
    },
    // --- Код для примера "Интерактивный TODO-список" (Запускаемый кнопкой) ---
    // Этот код вызывается кнопкой "Запустить пример" под блоком кода TODO.
    // Он просто выводит сообщение и может (опционально) очищать список.
    "todo-app": () => {
        console.log("===== 7. Интерактивный TODO-список =====");
        console.log("Логика этого примера выполняется при загрузке страницы (см. ниже).");
        console.log("Попробуйте добавить/удалить/отметить задачи в виджете выше.");
        // Опционально: очистка списка при нажатии кнопки "Запустить пример".
        const todoList = document.querySelector(".todo-list");
        if (todoList) {
            todoList.innerHTML = ''; // Очищаем HTML-содержимое списка.
            console.log("   Список дел очищен (при нажатии 'Запустить пример').");
        }
    }
};

// --- Логика инициализации страницы и обработчиков ---
// Используем DOMContentLoaded, чтобы скрипт выполнялся после полной загрузки HTML.
document.addEventListener('DOMContentLoaded', () => {
    // Сообщение о начале инициализации.
    console.log("DOM загружен. Инициализация страницы...");

    // --- Инициализация TODO-списка (Выполняется один раз при загрузке) ---
    // Находим элементы TODO-списка.
    const todoForm = document.querySelector(".todo-form");
    const todoInput = document.querySelector(".todo-input");
    const todoList = document.querySelector(".todo-list");

    // Проверяем, найдены ли все элементы TODO.
    if (todoForm && todoInput && todoList) {
        console.log("   Инициализация TODO-списка...");
        // Обработчик отправки формы для добавления задачи.
        todoForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Отменяем стандартное поведение.
            const taskText = todoInput.value.trim(); // Получаем текст.
            if (taskText === "") { // Проверка на пустоту.
                alert("Пожалуйста, введите текст задачи!");
                return;
            }
            // Создаем элементы задачи (li, span, button).
            const newTaskLi = document.createElement("li");
            newTaskLi.classList.add("todo-item");
            const taskSpan = document.createElement("span");
            taskSpan.textContent = taskText;
            taskSpan.classList.add("task-text");
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Удалить";
            deleteBtn.classList.add("delete-btn");
            // Собираем элемент задачи.
            newTaskLi.append(taskSpan, deleteBtn);
            // Добавляем обработчики на новый элемент.
            taskSpan.addEventListener("click", () => { // Клик по тексту.
                newTaskLi.classList.toggle("completed");
            });
            deleteBtn.addEventListener("click", () => { // Клик по кнопке.
                newTaskLi.remove();
            });
            // Добавляем задачу в список.
            todoList.append(newTaskLi);
            // Очищаем поле ввода.
            todoInput.value = "";
        });

        // Дополнительные обработчики для поля ввода (опционально).
        todoInput.addEventListener("input", (event) => {
            const currentLength = event.currentTarget.value.length;
            todoInput.style.outline = currentLength > 50 ? "2px solid red" : "";
        });
        todoInput.addEventListener("focus", () => { todoInput.style.borderColor = "dodgerblue"; });
        todoInput.addEventListener("blur", () => { todoInput.style.borderColor = ""; });

        console.log("   Инициализация TODO-списка завершена.");
    } else {
        // Предупреждение, если элементы TODO не найдены.
        console.warn("   Элементы для TODO-списка не найдены. Проверьте HTML.");
    }
    // --- Конец инициализации TODO-списка ---


    // --- Инициализация кнопок "Запустить пример" ---
    console.log("   Назначаем обработчики на кнопки 'run-code'...");
    // Находим все кнопки запуска примеров.
    const runButtons = document.querySelectorAll('.run-code');
    if (runButtons.length === 0) {
        // Предупреждение, если кнопки не найдены.
        console.warn("   Не найдено ни одной кнопки с классом '.run-code'.");
        return;
    }

    // Перебираем кнопки и назначаем обработчики клика.
    runButtons.forEach(button => {
        button.addEventListener('click', () => {
            // --- Поиск элементов для вывода ---
            // Находим ближайший родительский '.code-block'.
            const codeBlock = button.closest('.code-block');
            if (!codeBlock) { console.warn("Не найден '.code-block'"); return; }
            // Находим блок '.output' внутри '.code-block'.
            const outputDiv = codeBlock.querySelector('.output');
            if (!outputDiv) { console.warn("Не найден '.output'"); return; }

            // Получаем ID примера из data-атрибута кнопки.
            const exampleId = button.getAttribute('data-example');
            // Очищаем предыдущий вывод.
            outputDiv.innerHTML = '';
            outputDiv.classList.remove('error'); // Снимаем класс ошибки.

            // --- Перехват console ---
            // Сохраняем оригинальные методы console.
            const originalConsoleLog = console.log;
            const originalConsoleError = console.error;
            const originalConsoleWarn = console.warn;
            // Массив для сбора логов.
            const logs = [];
            // Функция-обработчик для перехвата.
            const logHandler = (type) => (...args) => {
                // Форматируем аргументы для вывода.
                const formattedArgs = args.map(arg => {
                    if (arg instanceof Error) {
                        return `Error: ${arg.message}\n${arg.stack ? arg.stack.split('\n').slice(0, 2).join('\n') : ''}`;
                    }
                    if (typeof arg === 'object' && arg !== null) {
                        try { return JSON.stringify(arg, null, 2); }
                        catch (e) { return '[Circular Object]'; }
                    }
                    return String(arg);
                });
                // Сохраняем лог.
                logs.push({ type: type, message: formattedArgs.join(' ') });
                // Вызываем оригинальный метод.
                if (type === 'error') originalConsoleError.apply(console, args);
                else if (type === 'warn') originalConsoleWarn.apply(console, args);
                else originalConsoleLog.apply(console, args);
            };
            // Переопределяем console.
            console.log = logHandler('log');
            console.error = logHandler('error');
            console.warn = logHandler('warn');
            // --- Конец перехвата console ---

            // --- Выполнение кода примера ---
            try {
                // Проверяем, есть ли функция для этого ID в объекте 'examples'.
                if (examples[exampleId]) {
                    // Выполняем код примера.
                    examples[exampleId]();
                    // Выводим логи в .output.
                    if (logs.length > 0) {
                        logs.forEach(log => {
                            const p = document.createElement('p');
                            p.innerHTML = log.message.replace(/\n/g, '<br>'); // Используем innerHTML для <br>
                            p.classList.add(`log-${log.type}`); // Добавляем класс log-info, log-warn или log-error
                            if (log.type === 'error') outputDiv.classList.add('error'); // Помечаем весь блок при ошибке
                            outputDiv.appendChild(p);
                        });
                    } else {
                        // Если вывода в console не было.
                        const p = document.createElement('p');
                        p.textContent = "Код выполнен без вывода в console.";
                        p.classList.add('log-info', 'italic');
                        outputDiv.appendChild(p);
                    }
                } else {
                    // Если пример не найден в объекте 'examples'.
                    throw new Error(`Пример с id "${exampleId}" не найден.`);
                }
            } catch (error) {
                // --- Обработка ошибок выполнения кода примера ---
                console.error("Ошибка выполнения кода примера:", error); // Выводим в консоль (и в output через перехватчик).
                // Дополнительно выводим в outputDiv, если не попало через перехват.
                if (!logs.some(log => log.type === 'error')) {
                    const p = document.createElement('p');
                    p.innerHTML = `Ошибка выполнения: ${error.name}: ${error.message.replace(/\n/g, '<br>')}`;
                    p.classList.add('log-error');
                    outputDiv.appendChild(p);
                    outputDiv.classList.add('error');
                }
            } finally {
                // --- Восстановление console ---
                // Возвращаем оригинальные методы console на место.
                console.log = originalConsoleLog;
                console.error = originalConsoleError;
                console.warn = originalConsoleWarn;
            }
            // --- Конец выполнения кода примера ---
        }); // Конец обработчика 'click'
    }); // Конец forEach
    console.log("   Обработчики на кнопки 'run-code' назначены.");

}); // Конец обработчика 'DOMContentLoaded'

// --- Конец файла 10_dom_summary.js ---
