// --- Логика для выполнения примеров на странице arrays.html ---
document.querySelectorAll('.run-code').forEach(button => {
    button.addEventListener('click', () => {
        // Находим ближайший родительский '.code-block'
        const codeBlock = button.closest('.code-block');
        if (!codeBlock) return; // Если не нашли блок кода, выходим

        // Ищем элемент <code> внутри <pre> в этом блоке
        const codeElement = codeBlock.querySelector('pre code');
        // Ищем div для вывода результата в этом блоке
        const outputDiv = codeBlock.querySelector('.output');

        // Проверяем, что нашли и код, и место для вывода
        if (!codeElement || !outputDiv) {
            console.warn("Не найдены элементы 'pre code' или 'div.output' для кнопки 'Запустить'.");
            return;
        }

        // Очищаем предыдущий результат вывода
        outputDiv.innerHTML = '';
        // Добавляем класс для стилизации (например, рамка во время выполнения)
        outputDiv.classList.add('output--active');

        // Сохраняем оригинальную функцию console.log, чтобы не сломать ее глобально
        const originalConsoleLog = console.log;
        // Создаем массив для сбора всех вызовов console.log во время выполнения кода примера
        const logs = [];

        // Временно ПЕРЕОПРЕДЕЛЯЕМ console.log
        console.log = (...args) => {
            // Форматируем аргументы для вывода (объекты превращаем в JSON-строки)
            const formattedArgs = args.map(arg => {
                if (typeof arg === 'object' && arg !== null) {
                    try {
                        // Пытаемся преобразовать объект в читаемую строку JSON
                        // `null, 2` добавляет отступы для красивого вывода
                        return JSON.stringify(arg, null, 2);
                    } catch (e) {
                        // Обработка ошибки, если объект циклический (ссылается сам на себя)
                        return '[Circular Object]';
                    }
                }
                // Если это не объект, просто преобразуем в строку
                return String(arg);
            });
            // Добавляем отформатированную строку лога в наш массив `logs`
            logs.push(formattedArgs.join(' ')); // Объединяем аргументы через пробел, если их несколько
            // Вызываем оригинальный console.log, чтобы лог все еще появлялся в консоли разработчика
            originalConsoleLog.apply(console, args);
        };

        try {
            // Получаем текстовое содержимое элемента <code> (это и есть код для выполнения)
            const codeText = codeElement.textContent;
            // Создаем новую анонимную функцию из текста кода.
            // Это безопаснее, чем eval(), так как код выполняется в своем контексте.
            const userCode = new Function(codeText);
            // Выполняем созданную функцию (т.е. код из примера)
            userCode();

            // Выводим собранные логи в `outputDiv`
            if (logs.length > 0) {
                // Если были логи, создаем для каждого параграф <p> и добавляем в div
                logs.forEach(log => {
                    const p = document.createElement('p');
                    p.textContent = log;
                    outputDiv.appendChild(p);
                });
            } else {
                // Если логов не было, выводим сообщение об этом
                const p = document.createElement('p');
                p.textContent = "Код выполнен без вывода в console.log.";
                p.style.fontStyle = "italic"; // Делаем текст курсивом
                outputDiv.appendChild(p);
            }
        } catch (error) {
            // Если во время выполнения кода произошла ошибка
            const p = document.createElement('p');
            p.textContent = `Ошибка выполнения: ${error.message}`; // Показываем сообщение об ошибке
            p.style.color = 'var(--error-color, #ff5555)'; // Красный цвет для ошибки (используем переменную CSS, если есть)
            outputDiv.appendChild(p);
            // Также выводим ошибку в настоящую консоль для детальной отладки
            originalConsoleLog("Ошибка в примере:", error);
        } finally {
            // ВАЖНО: В любом случае (успех или ошибка) ВОССТАНАВЛИВАЕМ оригинальный console.log
            console.log = originalConsoleLog;
            // Можно убрать класс активности после выполнения (опционально)
            // setTimeout(() => outputDiv.classList.remove('output--active'), 500);
        }
    });
});

// --- Логика для кнопки "Скопировать код" ---
document.querySelectorAll('.copy-code').forEach(button => {
    button.addEventListener('click', async () => {
        const codeBlock = button.closest('.code-block');
        if (!codeBlock) return;
        const codeElement = codeBlock.querySelector('pre code');
        if (!codeElement) return;

        // Получаем текст кода ИЗ HTML
        const codeToCopy = codeElement.textContent;
        try {
            // Используем современный Clipboard API для копирования
            await navigator.clipboard.writeText(codeToCopy);
            // Даем обратную связь пользователю
            const originalText = button.textContent;
            button.textContent = 'Скопировано!';
            button.disabled = true; // Блокируем кнопку на время
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false; // Разблокируем кнопку
            }, 1500); // Через 1.5 секунды возвращаем текст и активность
        } catch (err) {
            console.error('Ошибка копирования:', err);
            // Можно добавить сообщение об ошибке для пользователя
            const originalText = button.textContent;
            button.textContent = 'Ошибка!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 1500);
        }
    });
});

// --- Логика для кнопки "Скрыть/Показать код" ---
document.querySelectorAll('.toggle-code').forEach(button => {
    button.addEventListener('click', () => {
        const codeBlock = button.closest('.code-block');
        if (!codeBlock) return;
        const preElement = codeBlock.querySelector('pre'); // Находим <pre> внутри блока
        if (!preElement) return;

        // Переключаем видимость элемента <pre> с кодом
        if (preElement.style.display === 'none') {
            preElement.style.display = ''; // Возвращаем значение по умолчанию (обычно 'block'), чтобы показать
            button.textContent = 'Скрыть код'; // Обновляем текст кнопки
        } else {
            preElement.style.display = 'none'; // Скрываем элемент
            button.textContent = 'Показать код'; // Обновляем текст кнопки
        }
    });
});

// --- Конец файла 02_arrays_interactive.js ---