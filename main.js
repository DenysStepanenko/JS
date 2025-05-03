// ===== Файл: main.js (Исправленная версия) =====

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM полностью загружен и разобран. Инициализация скриптов...");

    // --- Переключение темы ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function setTheme(isLight) {
        if (!body || !themeToggle) {
            // console.warn("Элементы для переключения темы не найдены.");
            return;
        }
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
            console.error("Не удалось сохранить тему в localStorage:", e);
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTheme(!body.classList.contains('light-theme'));
        });
        // Применяем сохраненную тему при загрузке
        try {
            const savedTheme = localStorage.getItem('theme');
            setTheme(savedTheme === 'light');
        } catch (e) {
            console.error("Не удалось загрузить тему из localStorage:", e);
            setTheme(false);
        }
    } else {
        console.warn("Кнопка переключения темы ('theme-toggle') не найдена.");
    }

    // --- Прогресс-бар при прокрутке ---
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = Math.max(
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const scrollableHeight = docHeight - windowHeight;
            const scrollPercent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        });
    } else {
        console.warn("Элемент прогресс-бара ('progress-bar') не найден.");
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
        console.warn("Кнопка 'Наверх' ('scroll-top') не найдена.");
    }

    // --- Скрытие/показ кода ---
    document.querySelectorAll('.toggle-code').forEach(button => {
        const preElementInit = button.parentElement?.querySelector('pre');
        if (preElementInit && preElementInit.style.display === 'none') {
            button.textContent = 'Показать код';
        } else if (preElementInit) {
            button.textContent = 'Скрыть код';
        }

        button.addEventListener('click', () => {
            const preElement = button.parentElement?.querySelector('pre');
            if (preElement) {
                const isHidden = preElement.style.display === 'none';
                preElement.style.display = isHidden ? 'block' : 'none';
                button.textContent = isHidden ? 'Скрыть код' : 'Показать код';
            } else {
                console.warn("Не найден элемент <pre> для кнопки 'Скрыть/Показать код'.");
            }
        });
    });

    // --- Копирование кода ---
    document.querySelectorAll('.copy-code').forEach(button => {
        button.textContent = 'Скопировать'; // Устанавливаем текст при загрузке
        button.addEventListener('click', () => {
            const codeElement = button.parentElement?.querySelector('pre code');
            if (codeElement && navigator.clipboard) {
                const codeText = codeElement.textContent || "";
                navigator.clipboard.writeText(codeText).then(() => {
                    button.textContent = 'Скопировано!';
                    setTimeout(() => { button.textContent = 'Скопировать'; }, 2000);
                }).catch(err => {
                    console.error('Не удалось скопировать код: ', err);
                    button.textContent = 'Ошибка!';
                    setTimeout(() => { button.textContent = 'Скопировать'; }, 2000);
                });
            } else if (!navigator.clipboard) {
                console.warn("navigator.clipboard не поддерживается.");
                button.textContent = 'Ошибка!';
                setTimeout(() => { button.textContent = 'Скопировать'; }, 2000);
            } else {
                console.warn("Не найден элемент <pre><code> для кнопки 'Скопировать'.");
            }
        });
    });

    // --- Выполнение кода из редактора (если используется) ---
    document.querySelectorAll('.run-code-editor').forEach(button => { // Используем run-code-editor
        button.addEventListener('click', () => {
            const textarea = button.parentElement?.querySelector('.code-editor');
            const resultDiv = button.parentElement?.querySelector('.result');
            if (!textarea || !resultDiv) {
                console.warn("Не найдены '.code-editor' или '.result' для кнопки 'Запустить'.");
                return;
            }
            resultDiv.innerHTML = '';
            const originalConsoleLog = console.log;
            const logs = [];
            console.log = (...args) => {
                const formattedArgs = args.map(arg => typeof arg === 'object' && arg !== null ? JSON.stringify(arg, null, 2) : String(arg));
                logs.push(formattedArgs.join(' '));
                originalConsoleLog.apply(console, args);
            };
            try {
                const userCode = new Function(textarea.value);
                userCode();
                if (logs.length > 0) {
                    logs.forEach(log => {
                        const p = document.createElement('p'); p.textContent = log; resultDiv.appendChild(p);
                    });
                } else {
                    const p = document.createElement('p'); p.textContent = "Код выполнен без вывода."; p.style.fontStyle = "italic"; resultDiv.appendChild(p);
                }
            } catch (error) {
                const p = document.createElement('p'); p.textContent = `Ошибка: ${error.message}`; p.style.color = '#ff5555'; resultDiv.appendChild(p);
                originalConsoleLog.error("Ошибка выполнения кода из редактора:", error);
            } finally {
                console.log = originalConsoleLog;
            }
        });
    });

    // --- Анимация появления секций ---
    const sectionsToFade = document.querySelectorAll('.fade-in');
    console.log(`[Fade-In] Найдено ${sectionsToFade.length} секций для анимации.`);
    if (sectionsToFade.length > 0) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => { // Добавили obs
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log(`[Fade-In] Элемент #${entry.target.id || 'без ID'} стал видимым.`);
                        entry.target.classList.add('visible');
                        // obs.unobserve(entry.target); // Раскомментируйте, если анимация нужна только один раз
                    }
                    // Можно добавить else для скрытия при выходе из видимости:
                    // else {
                    //     entry.target.classList.remove('visible');
                    // }
                });
            }, { threshold: 0.1 }); // Порог срабатывания 10%

            sectionsToFade.forEach(section => {
                // Добавим проверку, есть ли у секции ID, чтобы лог был информативнее
                const sectionIdentifier = section.id ? `#${section.id}` : (section.classList[0] ? `.${section.classList[0]}` : 'элемент');
                console.log(`[Fade-In] Начинаю наблюдение за ${sectionIdentifier}`);
                observer.observe(section);
            });
        } else {
            console.warn('[Fade-In] IntersectionObserver не поддерживается. Анимация не будет динамической.');
            sectionsToFade.forEach(section => section.classList.add('visible')); // Показываем все сразу
        }
    } else {
        console.log("[Fade-In] Секции с классом .fade-in не найдены на этой странице.");
    }

    // --- Navigation Link Click Animation ---
    console.log('[Nav Anim] Поиск ссылок навигации...');
    const navLinks = document.querySelectorAll('nav ul li a');
    console.log(`[Nav Anim] Найдено ${navLinks.length} ссылок.`);
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                console.log('[Nav Anim] Клик на:', this.href);
                event.preventDefault();
                if (this.classList.contains('animate-neon-fill')) {
                    console.log('[Nav Anim] Анимация уже идет для:', this.href);
                    return; // Предотвращаем повторный запуск анимации
                }
                // Удаляем класс анимации с других ссылок перед добавлением к текущей
                navLinks.forEach(el => {
                    if (el !== this) { // Не удаляем с текущей ссылки
                        el.classList.remove('animate-neon-fill');
                    }
                });
                this.classList.add('animate-neon-fill');
                const destination = this.href;
                console.log('[Nav Anim] Добавлен класс animate-neon-fill, ждем завершения анимации...');

                // Используем requestAnimationFrame для большей надежности перед переходом
                requestAnimationFrame(() => {
                    setTimeout(() => { // Небольшая задержка перед переходом, чтобы анимация точно запустилась
                        console.log('[Nav Anim] Переход на:', destination);
                        window.location.href = destination;
                        // Удаляем класс после перехода (на случай если пользователь вернется назад)
                        // Это может быть не идеально, но лучше чем оставлять класс
                        setTimeout(() => this.classList.remove('animate-neon-fill'), 50);
                    }, 50); // Задержка 50мс
                });

                // Убрали обработчик animationend, т.к. он может быть ненадежным
                // и переход теперь инициируется по таймеру после добавления класса
            });
        });
        console.log("[Nav Anim] Обработчики кликов для анимации навигации добавлены.");
    } else {
        console.warn("[Nav Anim] Ссылки навигации не найдены.");
    }

    console.log("Инициализация скриптов завершена.");
}); // Конец главного DOMContentLoaded

// ===== Конец файла main.js =====
