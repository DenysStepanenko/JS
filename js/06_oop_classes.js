// ===== Файл: js/06_oop_classes.js =====

// --- Выполнение кода из примеров на странице oop-classes.html ---
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

// --- Конец файла 06_oop_classes.js ---