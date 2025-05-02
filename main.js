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
}

// --- Скрытие/показ кода ---
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-code').forEach(button => {
        // Инициализация текста кнопки при загрузке
        const preElementInit = button.parentElement?.querySelector('pre');
        if (preElementInit && preElementInit.style.display === 'none') {
            button.textContent = 'Показать код';
        } else if (preElementInit) {
            button.textContent = 'Скрыть код'; // Устанавливаем по умолчанию, если не скрыт
        }

        button.addEventListener('click', () => {
            const preElement = button.parentElement?.querySelector('pre');
            if (preElement) {
                const isHidden = preElement.style.display === 'none';
                preElement.style.display = isHidden ? 'block' : 'none';
                button.textContent = isHidden ? 'Скрыть код' : 'Показать код';
            } else {
                console.warn("Не найден элемент <pre> для кнопки 'Скрыть/Показать код'. Проверьте HTML-структуру.");
            }
        });
    });
});

// --- Копирование кода ---
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.copy-code').forEach(button => {
        button.textContent = 'Скопировать';

        button.addEventListener('click', () => {
            const codeElement = button.parentElement?.querySelector('pre code');
            if (codeElement && navigator.clipboard) {
                const codeText = codeElement.textContent || "";
                navigator.clipboard.writeText(codeText).then(() => {
                    button.textContent = 'Скопировано!';
                    setTimeout(() => {
                        button.textContent = 'Скопировать';
                    }, 2000);
                }).catch(err => {
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
});

// --- Выполнение кода из редактора (если используется) ---
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.run-code-editor').forEach(button => {
        button.addEventListener('click', () => {
            const textarea = button.parentElement?.querySelector('.code-editor');
            const resultDiv = button.parentElement?.querySelector('.result');

            if (!textarea || !resultDiv) {
                console.warn("Не найдены элементы 'textarea.code-editor' или 'div.result' для кнопки 'Запустить'.");
                return;
            }

            resultDiv.innerHTML = '';
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
                const userCode = new Function(textarea.value);
                userCode();

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
                const p = document.createElement('p');
                p.textContent = `Ошибка выполнения: ${error.message}`;
                p.style.color = '#ff5555';
                resultDiv.appendChild(p);
                originalConsoleLog.error("Ошибка выполнения кода из редактора:", error);
            } finally {
                console.log = originalConsoleLog;
            }
        });
    });
});

// --- Анимация появления секций ---
document.addEventListener('DOMContentLoaded', () => {
    const sectionsToFade = document.querySelectorAll('.fade-in');
    console.log(`Найдено ${sectionsToFade.length} элементов с классом .fade-in`);
    if (sectionsToFade.length > 0) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log(`Элемент ${entry.target.id} стал видимым, добавляю .visible`);
                        entry.target.classList.add('visible');
                        // observer.unobserve(entry.target); // Раскомментируйте для однократной анимации
                    }
                });
            }, { threshold: 0.1 });
            sectionsToFade.forEach(section => {
                console.log(`Наблюдаю за элементом: ${section.id}`);
                observer.observe(section);
            });
        } else {
            console.warn('IntersectionObserver не поддерживается, добавляю .visible ко всем элементам');
            sectionsToFade.forEach(section => section.classList.add('visible'));
        }
    }
});

// --- Navigation Link Click Animation ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded. Searching for nav links for click animation...');
    const navLinks = document.querySelectorAll('nav ul li a');
    console.log(`Found ${navLinks.length} nav links.`);

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                console.log('>>> Click detected on:', this.href);
                event.preventDefault();

                if (this.classList.contains('animate-neon-fill')) {
                    console.log('Анимация уже идет для:', this.href);
                    return;
                }

                navLinks.forEach(el => {
                    if (el !== this && el.classList.contains('animate-neon-fill')) {
                        console.log('Удаляю класс анимации с другой ссылки:', el.href);
                        el.classList.remove('animate-neon-fill');
                    }
                });

                console.log('Добавляю класс .animate-neon-fill к:', this.href);
                this.classList.add('animate-neon-fill');

                const destination = this.href;

                this.addEventListener('animationend', (e) => {
                    if (e.animationName === 'neon-fill-ltr') {
                        console.log('<<< Анимация закончилась для:', this.href);
                        if (this.classList.contains('animate-neon-fill')) {
                            console.log('Удаляю класс .animate-neon-fill после анимации.');
                            this.classList.remove('animate-neon-fill');
                        }
                        console.log('Перехожу на:', destination);
                        window.location.href = destination;
                    }
                }, { once: true });
            });
        });
        console.log("Обработчики кликов (с задержкой навигации) для анимации добавлены.");
    } else {
        console.warn("Ссылки навигации не найдены для анимации по клику.");
    }
});
// --- End Navigation Link Click Animation ---

// ===== Конец файла main.js ====