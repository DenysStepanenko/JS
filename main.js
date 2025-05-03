// ===== Файл: main.js (Финальная исправленная версия 2) =====

document.addEventListener('DOMContentLoaded', () => {
    // Весь код, который должен выполниться ПОСЛЕ загрузки HTML, помещаем СЮДА
    console.log("DOM fully loaded and parsed. Initializing scripts...");

    // --- Переключение темы ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body; // Определяем body здесь

    function setTheme(isLight) {
        if (!body || !themeToggle) { return; }
        if (isLight) {
            body.classList.add('light-theme');
            themeToggle.textContent = 'Темная тема';
        } else {
            body.classList.remove('light-theme');
            themeToggle.textContent = 'Светлая тема';
        }
        try {
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        } catch (e) {
            console.error("Ошибка сохранения темы:", e);
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTheme(!body.classList.contains('light-theme'));
        });
        // Применяем тему при загрузке
        try {
            const savedTheme = localStorage.getItem('theme');
            setTheme(savedTheme === 'light');
        } catch (e) {
            console.error("Ошибка загрузки темы:", e);
            setTheme(false);
        }
    } else {
        console.warn("Кнопка темы #theme-toggle не найдена.");
    }

    // --- Прогресс-бар ---
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const scrollableHeight = docHeight - windowHeight;
            const scrollPercent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        });
    } else {
        console.warn("Прогресс-бар #progress-bar не найден.");
    }

    // --- Кнопка "Наверх" ---
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = (window.scrollY || document.documentElement.scrollTop) > 200 ? 'block' : 'none';
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    } else {
        console.warn("Кнопка #scroll-top не найдена.");
    }

    // --- Скрытие/показ кода ---
    document.querySelectorAll('.toggle-code').forEach(button => {
        const preElementInit = button.parentElement?.querySelector('pre');
        if (preElementInit) {
            button.textContent = (preElementInit.style.display === 'none') ? 'Показать код' : 'Скрыть код';
        } else {
            button.textContent = 'Скрыть код'; // По умолчанию
        }
        button.addEventListener('click', () => {
            const preElement = button.parentElement?.querySelector('pre');
            if (preElement) {
                const isHidden = preElement.style.display === 'none';
                preElement.style.display = isHidden ? 'block' : 'none';
                button.textContent = isHidden ? 'Скрыть код' : 'Показать код';
            }
        });
    });

    // --- Копирование кода ---
    document.querySelectorAll('.copy-code').forEach(button => {
        button.textContent = 'Скопировать';
        button.addEventListener('click', () => {
            const codeElement = button.parentElement?.querySelector('pre code');
            if (codeElement && navigator.clipboard) {
                navigator.clipboard.writeText(codeElement.textContent || "").then(() => {
                    button.textContent = 'Скопировано!';
                    setTimeout(() => { button.textContent = 'Скопировать'; }, 2000);
                }).catch(err => {
                    console.error('Ошибка копирования: ', err);
                    button.textContent = 'Ошибка!';
                    setTimeout(() => { button.textContent = 'Скопировать'; }, 2000);
                });
            } else {
                console.warn("Не удалось скопировать: элемент не найден или clipboard API недоступен.");
                button.textContent = 'Ошибка!';
                setTimeout(() => { button.textContent = 'Скопировать'; }, 2000);
            }
        });
    });

    // --- Выполнение кода из редактора ---
    // Используем делегирование событий для кнопок запуска кода, чтобы работало для динамически добавленного контента
    document.addEventListener('click', function (event) {
        // Проверяем, кликнули ли по кнопке запуска кода в редакторе
        if (event.target.matches('.run-code-editor')) {
            const button = event.target;
            const codeBlock = button.closest('.code-block'); // Находим родительский блок кода
            if (!codeBlock) return;

            const textarea = codeBlock.querySelector('.code-editor');
            const resultDiv = codeBlock.querySelector('.result');

            if (!textarea || !resultDiv) {
                console.warn("Не найдены '.code-editor' или '.result' для кнопки 'Запустить'.");
                return;
            }

            resultDiv.innerHTML = ''; // Очищаем результат
            const originalConsoleLog = console.log;
            const logs = [];

            // Перехватываем console.log
            console.log = (...args) => {
                const formattedArgs = args.map(arg => {
                    try {
                        return (typeof arg === 'object' && arg !== null) ? JSON.stringify(arg, null, 2) : String(arg);
                    } catch (e) {
                        return '[Circular Object]';
                    }
                }).join(' ');
                logs.push(formattedArgs);
                originalConsoleLog.apply(console, args); // Выводим и в реальную консоль
            };

            // Выполняем код
            try {
                new Function(textarea.value)(); // Выполняем код из textarea
                if (logs.length > 0) {
                    resultDiv.innerHTML = logs.map(log => `<p>${log.replace(/\n/g, '<br>')}</p>`).join('');
                } else {
                    resultDiv.innerHTML = `<p style="font-style: italic;">Код выполнен без вывода.</p>`;
                }
            } catch (error) {
                resultDiv.innerHTML = `<p style="color: #ff5555;">Ошибка: ${error.message}</p>`;
                originalConsoleLog.error("Ошибка выполнения кода из редактора:", error);
            } finally {
                console.log = originalConsoleLog; // Восстанавливаем console.log
            }
        }

        // Проверяем, кликнули ли по кнопке запуска обычного примера кода (не редактора)
        if (event.target.matches('button.run-code:not(.run-code-editor)')) {
            const button = event.target;
            const codeBlock = button.closest('.code-block');
            if (!codeBlock) return;

            const codeElement = codeBlock.querySelector('pre code');
            const outputDiv = codeBlock.querySelector('.output'); // Ищем .output для вывода

            if (!codeElement || !outputDiv) {
                console.warn("Не найдены 'pre code' или '.output' для кнопки 'Запустить пример'.");
                return;
            }

            outputDiv.innerHTML = ''; // Очищаем результат
            const originalConsoleLog = console.log;
            const logs = [];

            console.log = (...args) => {
                const formattedArgs = args.map(arg => typeof arg === 'object' && arg !== null ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
                logs.push(formattedArgs);
                originalConsoleLog.apply(console, args);
            };

            try {
                new Function(codeElement.textContent || "")(); // Выполняем код из pre code
                if (logs.length > 0) {
                    outputDiv.innerHTML = logs.map(log => `<p>${log.replace(/\n/g, '<br>')}</p>`).join('');
                } else {
                    outputDiv.innerHTML = `<p style="font-style: italic;">Пример выполнен без вывода.</p>`;
                }
            } catch (error) {
                outputDiv.innerHTML = `<p style="color: #ff5555;">Ошибка: ${error.message}</p>`;
                originalConsoleLog.error("Ошибка выполнения примера кода:", error);
            } finally {
                console.log = originalConsoleLog;
            }
        }
    });


    // --- Анимация появления секций ---
    const sectionsToReveal = document.querySelectorAll('.scroll-reveal'); // Используем новый класс
    console.log(`[Scroll Reveal] Найдено секций для анимации: ${sectionsToReveal.length}`);
    if (sectionsToReveal.length > 0) {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                threshold: 0.15 // Срабатывать, когда видно 15% элемента
            };
            const observer = new IntersectionObserver((entries, obs) => {
                console.log(`[Scroll Reveal] IntersectionObserver сработал (записей: ${entries.length})`);
                entries.forEach(entry => {
                    const targetId = entry.target.id || '[без ID]';
                    if (entry.isIntersecting) {
                        console.log(`[Scroll Reveal] Секция ${targetId} видна.`);
                        entry.target.classList.add('is-visible'); // Используем новый класс для видимости
                        // obs.unobserve(entry.target); // Для однократной анимации
                    }
                    // Не убираем класс при выходе из видимости
                });
            }, observerOptions);

            sectionsToReveal.forEach(section => {
                observer.observe(section);
                console.log(`[Scroll Reveal] Наблюдение за секцией ${section.id || '[без ID]'}`);
            });
            console.log("[Scroll Reveal] Наблюдение за всеми секциями установлено.");
        } else {
            console.warn('[Scroll Reveal] IntersectionObserver не поддерживается.');
            sectionsToReveal.forEach(section => section.classList.add('is-visible'));
        }
    } else {
        console.log("[Scroll Reveal] Секции .scroll-reveal не найдены.");
    }

    // --- Анимация клика по навигации ---
    const navLinks = document.querySelectorAll('nav ul li a');
    console.log(`[Nav Anim] Найдено ссылок: ${navLinks.length}`);
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                if (this.classList.contains('animate-neon-fill')) return;
                navLinks.forEach(el => el.classList.remove('animate-neon-fill'));
                this.classList.add('animate-neon-fill');
                const destination = this.href;
                console.log(`[Nav Anim] Анимация для ${destination}...`);
                // Используем requestAnimationFrame для плавности перед переходом
                requestAnimationFrame(() => {
                    setTimeout(() => { // Небольшая задержка
                        console.log('[Nav Anim] Переход на:', destination);
                        window.location.href = destination;
                    }, 50); // Уменьшил задержку
                });
            });
        });
        console.log("[Nav Anim] Обработчики для анимации навигации добавлены.");
    } else {
        console.warn("[Nav Anim] Ссылки навигации не найдены.");
    }

    console.log("Инициализация всех скриптов завершена.");

}); // Конец ЕДИНОГО DOMContentLoaded

// ===== Конец файла main.js =====
