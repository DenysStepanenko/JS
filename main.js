// ===== Файл: main.js =====

// --- Переключение темы ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

/**
 * Устанавливает тему (светлую или темную) и сохраняет выбор.
 * @param {boolean} isLight - True для светлой темы, false для темной.
 */
function setTheme(isLight) {
    if (!body || !themeToggle) {
        // console.warn("Элементы для переключения темы не найдены.");
        return; // Тихо выходим, если элементов нет
    }
    if (isLight) {
        body.classList.add('light-theme');
        themeToggle.textContent = 'Темная тема';
    } else {
        body.classList.remove('light-theme');
        themeToggle.textContent = 'Светлая тема';
    }
    // Сохраняем выбор в localStorage
    try {
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    } catch (e) {
        console.error("Не удалось сохранить тему в localStorage:", e);
    }
}

// Добавляем обработчик на кнопку переключения темы
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Переключаем тему на противоположную текущей
        setTheme(!body.classList.contains('light-theme'));
    });
}

// Применяем сохраненную тему при загрузке страницы
try {
    const savedTheme = localStorage.getItem('theme');
    // Устанавливаем светлую тему, если сохранено 'light'
    setTheme(savedTheme === 'light');
} catch (e) {
    console.error("Не удалось загрузить тему из localStorage:", e);
    setTheme(false); // Устанавливаем темную тему по умолчанию при ошибке
}


// --- Прогресс-бар при прокрутке ---
const progressBar = document.getElementById('progress-bar');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // Учитываем случаи, когда высота документа равна высоте окна (нет прокрутки)
        const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollableHeight = docHeight - windowHeight;

        // Избегаем деления на ноль и отрицательных значений
        const scrollPercent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`; // Ограничиваем 100%
    });
} else {
    // console.warn("Элемент прогресс-бара ('progress-bar') не найден.");
}


// --- Кнопка "Наверх" ---
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        // Показываем кнопку, если прокрутили больше чем на 200px
        scrollTopBtn.style.display = (window.scrollY || document.documentElement.scrollTop) > 200 ? 'block' : 'none';
    });

    // Плавная прокрутка вверх по клику
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
} else {
    // console.warn("Кнопка 'Наверх' ('scroll-top') не найдена.");
}


// --- Скрытие/показ кода ---
// Находим все кнопки с классом 'toggle-code'
document.querySelectorAll('.toggle-code').forEach(button => {
    button.addEventListener('click', () => {
        // Находим элемент <pre>, который должен быть перед кнопками copy и toggle
        const preElement = button.parentElement.querySelector('pre'); // Ищем pre внутри родителя кнопки

        if (preElement) {
            const isHidden = preElement.style.display === 'none';
            preElement.style.display = isHidden ? 'block' : 'none';
            button.textContent = isHidden ? 'Показать код' : 'Скрыть код';
        } else {
            console.warn("Не найден элемент <pre> для кнопки 'Скрыть/Показать код'. Проверьте HTML-структуру.");
        }
    });
    // Инициализация: если pre скрыт, меняем текст кнопки
    const preElement = button.parentElement.querySelector('pre');
    if (preElement && preElement.style.display === 'none') {
        button.textContent = 'Показать код';
    }
});


// --- Копирование кода ---
document.querySelectorAll('.copy-code').forEach(button => {
    button.addEventListener('click', () => {
        // Находим элемент <code> внутри <pre> в том же родителе, что и кнопка
        const codeElement = button.parentElement.querySelector('pre code');

        if (codeElement && navigator.clipboard) {
            const codeText = codeElement.textContent;
            navigator.clipboard.writeText(codeText).then(() => {
                // Успешно скопировано
                button.textContent = 'Скопировано!';
                // Возвращаем исходный текст через 2 секунды
                setTimeout(() => {
                    button.textContent = 'Скопировать';
                }, 2000);
            }).catch(err => {
                // Ошибка копирования
                console.error('Не удалось скопировать код: ', err);
                button.textContent = 'Ошибка!';
                setTimeout(() => {
                    button.textContent = 'Скопировать';
                }, 2000);
            });
        } else if (!navigator.clipboard) {
            console.warn("navigator.clipboard не поддерживается или недоступен (возможно, не HTTPS).");
            button.textContent = 'Ошибка!';
            setTimeout(() => { button.textContent = 'Скопировать'; }, 2000);
        } else {
            console.warn("Не найден элемент <pre><code> для кнопки 'Скопировать'. Проверьте HTML-структуру.");
        }
    });
});


// --- Выполнение кода из редактора (если используется) ---
// Этот блок оставлен на случай, если вы решите добавить редактируемые блоки
document.querySelectorAll('.run-code').forEach(button => {
    button.addEventListener('click', () => {
        // Ищем textarea и div.result внутри родителя кнопки
        const textarea = button.parentElement.querySelector('.code-editor'); // Используем класс редактора
        const resultDiv = button.parentElement.querySelector('.result');

        if (!textarea || !resultDiv) {
            console.warn("Не найдены элементы 'textarea.code-editor' или 'div.result' для кнопки 'Запустить'.");
            return;
        }

        resultDiv.innerHTML = ''; // Очищаем предыдущий результат

        // Сохраняем оригинальный console.log
        const originalConsoleLog = console.log;
        const logs = [];

        // Перехватываем console.log
        console.log = (...args) => {
            // Форматируем вывод для читаемости
            const formattedArgs = args.map(arg => {
                if (typeof arg === 'object' && arg !== null) {
                    try {
                        return JSON.stringify(arg, null, 2); // Красивый вывод объектов/массивов
                    } catch (e) { return '[Circular Object]'; }
                }
                return String(arg);
            });
            logs.push(formattedArgs.join(' '));
            originalConsoleLog.apply(console, args); // Выводим и в реальную консоль
        };

        try {
            // Используем Function для безопасного выполнения кода
            const userCode = new Function(textarea.value);
            userCode();

            // Выводим логи в resultDiv
            if (logs.length > 0) {
                logs.forEach(log => {
                    const p = document.createElement('p');
                    p.textContent = log;
                    resultDiv.appendChild(p);
                });
            } else {
                const p = document.createElement('p');
                p.textContent = "Код выполнен без вывода в console.log.";
                p.style.fontStyle = "italic";
                resultDiv.appendChild(p);
            }

        } catch (error) {
            // Выводим ошибку в resultDiv
            const p = document.createElement('p');
            p.textContent = `Ошибка выполнения: ${error.message}`;
            p.style.color = '#ff5555'; // Цвет ошибки
            resultDiv.appendChild(p);
        } finally {
            // Восстанавливаем оригинальный console.log
            console.log = originalConsoleLog;
        }
    });
});


// --- Анимация появления секций ---
// Находим все секции с классом 'fade-in'
const sectionsToFade = document.querySelectorAll('.fade-in');

// Проверяем, поддерживает ли браузер IntersectionObserver
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Если секция пересекает область видимости
            if (entry.isIntersecting) {
                // Добавляем класс 'visible' для запуска анимации
                entry.target.classList.add('visible');
                // Отключаем наблюдение за этой секцией после анимации (опционально)
                // observer.unobserve(entry.target);
            }
            // Можно добавить логику для скрытия при выходе из видимости, если нужно
            // else {
            //     entry.target.classList.remove('visible');
            // }
        });
    }, { threshold: 0.1 }); // Анимация начнется, когда 10% секции видно

    // Начинаем наблюдение за каждой секцией
    sectionsToFade.forEach(section => observer.observe(section));
} else {
    // Если IntersectionObserver не поддерживается, просто делаем секции видимыми
    // console.warn("IntersectionObserver не поддерживается. Анимация 'fade-in' не будет работать динамически.");
    sectionsToFade.forEach(section => section.classList.add('visible'));
}

// --- Конец файла main.js ---
