// Примеры кода
const examples = {
    "search-elements": () => {
        console.log("===== Поиск DOM-элементов =====");
        const heading = document.querySelector("h1");
        console.log("Первый заголовок:", heading);
        const items = document.querySelectorAll(".item");
        console.log("Все элементы с классом 'item':", items);
    },
    "dom-navigation": () => {
        console.log("===== Навигация по DOM =====");
        const ul = document.createElement("ul");
        const li1 = document.createElement("li");
        li1.textContent = "Элемент 1";
        const li2 = document.createElement("li");
        li2.textContent = "Элемент 2";
        ul.append(li1, li2);
        console.log("Родитель li1:", li1.parentElement);
        console.log("Дети ul:", ul.children);
        console.log("Первый ребёнок ul:", ul.firstElementChild);
        console.log("Последний ребёнок ul:", ul.lastElementChild);
        console.log("Следующий сосед li1:", li1.nextElementSibling);
        console.log("Предыдущий сосед li2:", li2.previousElementSibling);
    },
    "element-properties": () => {
        console.log("===== Свойства DOM-элемента =====");
        const div = document.createElement("div");
        div.innerHTML = "<p>Привет</p>";
        console.log("textContent:", div.textContent);
        console.log("innerHTML:", div.innerHTML);
        div.style.backgroundColor = "lightblue";
        console.log("style.backgroundColor:", div.style.backgroundColor);
        div.setAttribute("data-type", "info");
        console.log("Есть ли атрибут data-type?", div.hasAttribute("data-type"));
        console.log("Значение data-type:", div.getAttribute("data-type"));
        console.log("dataset.type:", div.dataset.type);
        div.removeAttribute("data-type");
        console.log("Атрибут data-type удалён:", !div.hasAttribute("data-type"));
    },
    "css-classes": () => {
        console.log("===== Управление CSS-классами =====");
        const box = document.createElement("div");
        box.classList.add("box");
        console.log("Есть ли класс 'box'?", box.classList.contains("box"));
        box.classList.add("active");
        console.log("Классы после добавления:", box.classList);
        box.classList.toggle("active");
        console.log("Классы после toggle:", box.classList);
        box.classList.replace("box", "new-box");
        console.log("Классы после замены:", box.classList);
    },
    "create-remove": () => {
        console.log("===== Создание и удаление элементов =====");

        // Создаём элемент
        const newDiv = document.createElement("div");
        newDiv.textContent = "Новый элемент";
        newDiv.style.padding = "10px";
        newDiv.style.backgroundColor = "#e0f7fa";
        newDiv.style.border = "1px solid #ccc";
        newDiv.style.margin = "10px 0";

        // Добавляем в начало body
        document.body.prepend(newDiv);
        console.log("Добавлен элемент:", document.body.firstElementChild);

        // Добавляем HTML через insertAdjacentHTML
        newDiv.insertAdjacentHTML("beforeend", "<p>Внутри div</p>");
        console.log("HTML внутри div:", newDiv.innerHTML);

        // Удаляем элемент через 3 секунды, чтобы пользователь увидел
        setTimeout(() => {
            newDiv.remove();
            console.log("Элемент удалён:", document.body.firstElementChild);
        }, 3000);
    },
    "events": () => {
        console.log("===== Работа с событиями =====");

        // Создаём кнопку
        const btn = document.createElement("button");
        btn.textContent = "Нажми меня";

        // Создаём обработчик
        const handleClick = () => {
            console.log("Кнопка нажата!");
        };

        // Добавляем слушатель
        btn.addEventListener("click", handleClick);

        // Создаём поле ввода
        const input = document.createElement("input");
        input.placeholder = "Введи текст для тестирования событий";
        input.style.margin = "10px 0"; // Добавим небольшой отступ для красоты

        // Добавляем элементы в DOM, чтобы пользователь мог с ними взаимодействовать
        document.body.appendChild(btn);
        document.body.appendChild(input);

        // Пример события input
        input.addEventListener("input", event => {
            console.log("Введено:", event.target.value);
        });

        // Пример события focus
        input.addEventListener("focus", () => {
            console.log("Поле в фокусе!");
        });

        // Пример события blur
        input.addEventListener("blur", () => {
            console.log("Поле потеряло фокус!");
        });

        // Удаляем слушатель
        btn.removeEventListener("click", handleClick);
        console.log("Слушатель клика удалён");

        // Пример события keydown
        document.addEventListener("keydown", event => {
            console.log("Клавиша нажата:", event.key, "Код:", event.code);
        });

        // Удаляем элементы после выполнения примера (чтобы не накапливались)
        setTimeout(() => {
            btn.remove();
            input.remove();
        }, 5000); // Удаляем через 5 секунд, чтобы пользователь успел протестировать
    },
    "todo-app": () => {
        console.log("===== Интерактивный TODO-список =====");
        const form = document.querySelector(".todo-form");
        const input = document.querySelector(".todo-input");
        const list = document.querySelector(".todo-list");
        if (!form || !input || !list) {
            console.log("Элементы не найдены");
        } else {
            form.addEventListener("submit", event => {
                event.preventDefault();
                const taskText = input.value.trim();
                if (taskText === "") {
                    console.log("Введите задачу!");
                    return;
                }
                const li = document.createElement("li");
                li.classList.add("todo-item");
                const taskSpan = document.createElement("span");
                taskSpan.textContent = taskText;
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Удалить";
                li.append(taskSpan, deleteBtn);
                taskSpan.addEventListener("click", () => {
                    li.classList.toggle("completed");
                });
                deleteBtn.addEventListener("click", () => {
                    li.remove();
                });
                list.append(li);
                input.value = "";
                input.focus();
            });
            input.addEventListener("input", event => {
                if (event.currentTarget.value.length > 20) {
                    input.style.borderColor = "red";
                } else {
                    input.style.borderColor = "";
                }
            });
            input.addEventListener("focus", () => {
                input.style.borderColor = "blue";
            });
            input.addEventListener("blur", () => {
                if (input.value.trim() === "") {
                    input.style.borderColor = "";
                }
            });
        }
    }
};

// Логика выполнения примеров
if (document.querySelectorAll) {
    document.querySelectorAll('.run-code').forEach(button => {
        button.addEventListener('click', () => {
            const outputDiv = button.parentElement.querySelector('.output');
            if (!outputDiv) {
                console.warn("Не найден элемент 'div.output' для кнопки 'Запустить'.");
                return;
            }

            const exampleId = button.getAttribute('data-example');
            outputDiv.innerHTML = ''; // Очищаем предыдущий результат

            const originalConsoleLog = console.log;
            const logs = [];

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
                if (examples[exampleId]) {
                    examples[exampleId]();
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
                } else {
                    throw new Error(`Пример с id "${exampleId}" не найден.`);
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
} else {
    console.warn("Метод document.querySelectorAll недоступен. Проверьте совместимость браузера.");
}

// --- Конец файла 10_dom_summary.js ---