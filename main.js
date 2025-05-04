// ===== Файл: main.js (Финальная версия с модальным меню для мобильных, прокачанной горизонтальной для десктопа, и всей логикой) =====

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed. Initializing main.js scripts...");

    const body = document.body;
    const header = document.querySelector('header');
    const mainNav = document.getElementById('main-nav');
    // Проверяем, существуют ли кнопки бургера/закрытия перед получением ссылок
    const menuToggleBtn = document.getElementById('menu-toggle');
    const menuCloseBtn = document.getElementById('menu-close');

    const progressBar = document.getElementById('progress-bar');
    const scrollTopBtn = document.getElementById('scroll-top');

    // Элементы фона для ARIA (main и footer)
    const contentElementsToHide = document.querySelectorAll('main, footer');


    // --- 1. Переключение темы ---
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) {
            console.warn("Кнопка темы #theme-toggle не найдена.");
            return;
        }

        function setTheme(isLight) {
            body.classList.toggle('light-theme', isLight);
            themeToggle.textContent = isLight ? 'Темная тема' : 'Светлая тема';
            themeToggle.setAttribute('aria-label', isLight ? 'Переключить на темную тему' : 'Переключить на светлую тему');
            console.log(`Theme set to: ${isLight ? 'light' : 'dark'}`);
            try {
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            } catch (e) {
                console.error("Ошибка сохранения темы в localStorage:", e);
            }
        }

        themeToggle.addEventListener('click', () => {
            setTheme(!body.classList.contains('light-theme'));
        });

        try {
            const savedTheme = localStorage.getItem('theme');
            setTheme(savedTheme === 'light');
        } catch (e) {
            console.error("Ошибка загрузки темы из localStorage:", e);
            setTheme(false);
        }
    }

    // --- 2. Прогресс-бар ---
    function setupProgressBar() {
        if (!progressBar) {
            console.warn("Прогресс-бар #progress-bar не найден.");
            return;
        }
        window.addEventListener('scroll', () => {
            const docHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollableHeight = docHeight - windowHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollPercent = scrollableHeight > 0 ? Math.min((scrollTop / scrollableHeight) * 100, 100) : 0;
            progressBar.style.width = `${scrollPercent}%`;
        }, { passive: true });
    }

    // --- 3. Кнопка "Наверх" ---
    function setupScrollTopButton() {
        if (!scrollTopBtn) {
            console.warn("Кнопка #scroll-top не найдена.");
            return;
        }
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = (window.scrollY || document.documentElement.scrollTop) > 300 ? 'block' : 'none';
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. Эффект растворения шапки при скролле (Только для ДЕСКТОПА) ---
    function setupScrollHeaderEffect() {
        if (!header) {
            console.warn("Элемент header не найден.");
            return;
        }

        let lastScrollY = 0;
        const scrollThreshold = 50;
        const mobileBreakpoint = 950; // Должен совпадать с медиа-запросом в CSS

        window.addEventListener('scroll', () => {
            // Применяем эффект только если ширина окна больше или равна мобильному брейкпоинту
            if (window.innerWidth >= mobileBreakpoint) { // Используем >= чтобы совпало с медиа-запросом max-width
                const currentScrollY = window.scrollY;
                const scrollingDown = currentScrollY > lastScrollY;
                const isAtTop = currentScrollY === 0;

                if (scrollingDown && currentScrollY > scrollThreshold && !header.classList.contains('header-scrolled')) {
                    header.classList.add('header-scrolled');
                } else if ((currentScrollY < scrollThreshold || isAtTop) && header.classList.contains('header-scrolled')) {
                    header.classList.remove('header-scrolled');
                }

                lastScrollY = currentScrollY;
            } else {
                // Если мы на мобильном/планшете, убеждаемся, что класс эффекта скролла удален
                if (header.classList.contains('header-scrolled')) {
                    header.classList.remove('header-scrolled');
                }
            }
        }, { passive: true });
        console.log("[Scroll Header Effect] Наблюдение за скроллом для шапки установлено.");

        // Дополнительно проверяем размер экрана при загрузке и изменении размера
        const checkScreenSize = () => {
            if (window.innerWidth < mobileBreakpoint && header.classList.contains('header-scrolled')) {
                header.classList.remove('header-scrolled');
            }
        };
        window.addEventListener('load', checkScreenSize);
        window.addEventListener('resize', checkScreenSize);
    }


    // --- 5. Функционал кнопок в блоках кода (.code-block) ---
    function setupCodeExecution() {
        // Функция для форматирования вывода (та же, что и раньше)
        function formatLogMessage(args) {
            return args.map(arg => {
                if (arg instanceof Error) {
                    const stack = arg.stack ? '\n' + arg.stack.split('\n').slice(1, 4).join('\n') : '';
                    return `Error: ${arg.message}${stack}`;
                } else if (typeof arg === 'object' && arg !== null) {
                    try {
                        const cache = new Set();
                        const jsonString = JSON.stringify(arg, (key, value) => {
                            if (typeof value === 'object' && value !== null) {
                                if (cache.has(value)) {
                                    return '[Circular]';
                                }
                                cache.add(value);
                            }
                            return value;
                        }, 2);
                        return jsonString;
                    } catch (e) {
                        return '[Object (cannot stringify)]';
                    }
                } else if (arg === undefined) {
                    return 'undefined';
                } else if (arg === null) {
                    return 'null';
                } else if (typeof arg === 'function') {
                    return `[Function: ${arg.name || 'anonymous'}]`;
                }
                return String(arg);
            }).join(' ');
        }


        document.addEventListener('click', async (event) => {
            const target = event.target;

            // 1. Кнопка "Скрыть/Показать код"
            if (target.classList.contains('toggle-code')) {
                const codeBlock = target.closest('.code-block');
                const preElement = codeBlock?.querySelector('pre');
                const buttonGroup = codeBlock?.querySelector('.button-group'); // Убедимся, что находим button-group

                if (preElement && buttonGroup) {
                    const isHidden = preElement.style.display === 'none';
                    preElement.style.display = isHidden ? '' : 'none'; // '' вернет стиль по умолчанию (block)

                    // Корректируем margin button-group
                    // Проверяем, существует ли pre вообще, чтобы знать, куда применять margin-top
                    const preVisible = preElement.style.display !== 'none';

                    // Если кнопки в .button-group, то margin-top должен быть только у .button-group
                    // CSS: .code-block .button-group { margin-top: 8px; }
                    // JS: просто убираем margin-bottom у .button-group когда pre скрыт.
                    if (buttonGroup) {
                        buttonGroup.style.marginBottom = preVisible ? '' : '0'; // Убираем нижний отступ button-group если pre скрыт
                    }

                    target.textContent = isHidden ? 'Скрыть код' : 'Показать код';
                } else {
                    console.warn("Не найдены <pre> или .button-group для кнопки 'toggle-code'.");
                }
            }

            // 2. Кнопка "Скопировать"
            if (target.classList.contains('copy-code')) {
                const codeBlock = target.closest('.code-block');
                const codeElement = codeBlock?.querySelector('pre code') || codeBlock?.querySelector('.code-editor');

                if (codeElement && navigator.clipboard) {
                    const codeToCopy = codeElement.textContent || codeElement.value || "";
                    const originalText = target.textContent;
                    target.disabled = true;

                    try {
                        await navigator.clipboard.writeText(codeToCopy);
                        target.textContent = 'Скопировано!';
                        console.log('Код скопирован в буфер обмена.');
                    } catch (err) {
                        target.textContent = 'Ошибка!';
                        console.error('Ошибка копирования: ', err);
                    } finally {
                        setTimeout(() => {
                            target.textContent = originalText;
                            target.disabled = false;
                        }, 1500);
                    }
                } else {
                    if (!navigator.clipboard) {
                        console.warn("Clipboard API не доступен в этом браузере.");
                        target.textContent = 'Ошибка: Clipboard API';
                    } else {
                        console.warn("Не найден 'pre code' или '.code-editor' для кнопки 'copy-code'.");
                        target.textContent = 'Ошибка: Нет кода';
                    }
                    const originalText = target.textContent;
                    setTimeout(() => { target.textContent = originalText.startsWith('Ошибка') ? 'Скопировать' : originalText; }, 2500);
                }
            }

            // 3. Кнопка "Запустить пример/редактор"
            if (target.classList.contains('run-code') || target.classList.contains('run-code-editor')) {
                const codeBlock = target.closest('.code-block');
                if (!codeBlock) {
                    console.warn("Не найден родительский '.code-block' для кнопки запуска.");
                    return;
                }

                const isEditor = target.classList.contains('run-code-editor');
                const codeSourceElement = isEditor
                    ? codeBlock.querySelector('.code-editor')
                    : codeBlock.querySelector('pre code');
                const outputDiv = codeBlock.querySelector('.output') || codeBlock.querySelector('.result');

                if (!codeSourceElement || !outputDiv) {
                    console.warn(`Не найдены ${isEditor ? 'textarea.code-editor или div.result' : 'pre code или div.output'}.`);
                    return;
                }

                outputDiv.innerHTML = '';
                // Убираем классы логов с контейнера перед новым запуском
                outputDiv.classList.remove('log-error', 'log-warn', 'log-info', 'italic', 'error');


                const originalConsoleLog = console.log;
                const originalConsoleError = console.error;
                const originalConsoleWarn = console.warn;
                const logs = [];

                console.log = (...args) => { logs.push({ type: 'log', message: formatLogMessage(args) }); originalConsoleLog.apply(console, args); };
                console.warn = (...args) => { logs.push({ type: 'warn', message: formatLogMessage(args) }); originalConsoleWarn.apply(console, args); };
                console.error = (...args) => { logs.push({ type: 'error', message: formatLogMessage(args) }); originalConsoleError.apply(console, args); };

                try {
                    new Function(codeText)();
                } catch (error) {
                    logs.push({ type: 'error', message: formatLogMessage([error]) });
                } finally {
                    console.log = originalConsoleLog;
                    console.error = originalConsoleError;
                    console.warn = originalConsoleWarn;

                    if (logs.length > 0) {
                        logs.forEach(log => {
                            const p = document.createElement('p');
                            p.innerHTML = log.message.replace(/\n/g, '<br>'); // Используем innerHTML с заменой \n
                            if (log.type === 'error') {
                                p.classList.add('log-error');
                                outputDiv.classList.add('error'); // Добавляем класс ошибки к контейнеру
                            } else if (log.type === 'warn') {
                                p.classList.add('log-warn');
                            } else {
                                p.classList.add('log-info');
                            }
                            outputDiv.appendChild(p);
                        });
                    } else {
                        const p = document.createElement('p');
                        p.textContent = isEditor ? 'Код выполнен без вывода.' : 'Пример выполнен без вывода.';
                        p.classList.add('log-info', 'italic');
                        outputDiv.appendChild(p);
                    }
                }
            }
        });
    }

    // --- 6. Анимация появления секций ---
    function setupScrollReveal() {
        const sectionsToReveal = document.querySelectorAll('.scroll-reveal');
        console.log(`[Scroll Reveal] Найдено секций для анимации: ${sectionsToReveal.length}`);

        if (sectionsToReveal.length === 0) {
            console.log("[Scroll Reveal] Секции .scroll-reveal не найдены.");
            return;
        }

        if ('IntersectionObserver' in window) {
            const observerOptions = { threshold: 0.15 };
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!entry.target.classList.contains('is-visible')) {
                            entry.target.classList.add('is-visible');
                            // obs.unobserve(entry.target);
                        }
                    } else {
                        // entry.target.classList.remove('is-visible');
                    }
                });
            }, observerOptions);

            sectionsToReveal.forEach(section => {
                observer.observe(section);
            });
            console.log("[Scroll Reveal] Наблюдение за секциями установлено.");
        } else {
            console.warn('[Scroll Reveal] IntersectionObserver не поддерживается. Показываем все секции.');
            sectionsToReveal.forEach(section => section.classList.add('is-visible'));
        }
    }

    // --- 7. Бургер-меню (Модальное навигационное окно) и Тоггл подменю в нем ---
    function setupMobileMenu() {
        console.log("[Mobile Menu] Поиск элементов меню...");

        // Проверяем наличие элементов бургера и модального меню.
        // Если их нет (например, на старых версиях HTML или других страницах), функция ничего не делает.
        if (!menuToggleBtn || !menuCloseBtn || !mainNav) {
            console.warn("[Mobile Menu] Не найдены все необходимые элементы: #menu-toggle, #menu-close, #main-nav. Мобильное меню не будет работать.");
            // Убеждаемся, что десктопное меню видно по умолчанию, если моб. элементов нет
            if (mainNav) {
                // Эти стили должны быть уже установлены по умолчанию в CSS для десктопа
                // mainNav.style.display = 'block';
                // mainNav.style.position = 'static';
                // mainNav.style.transform = 'none';
                // mainNav.style.height = 'auto';
                // mainNav.style.width = 'auto';
                // mainNav.style.overflowY = 'visible';
                // mainNav.style.zIndex = 'initial';
                // mainNav.setAttribute('aria-hidden', 'false'); // Видимо для скринридеров на десктопе
            }
            return; // Выходим из функции
        }
        console.log("[Mobile Menu] Элементы найдены, добавляем обработчики.");

        // Элементы для ARIA (main и footer), скрываются/показываются при открытии/закрытии модала
        const elementsToHideFromScreenReader = document.querySelectorAll('main, footer');


        const openMenu = () => {
            console.log("[Mobile Menu] Открываем меню.");
            mainNav.classList.add('is-open');
            body.classList.add('no-scroll'); // Блокируем скролл body
            menuToggleBtn.setAttribute('aria-expanded', 'true');
            menuToggleBtn.setAttribute('aria-label', 'Закрыть меню');

            // --- Доступность: Скрываем фон и устанавливаем фокус ---
            elementsToHideFromScreenReader.forEach(el => el.setAttribute('aria-hidden', 'true'));
            mainNav.setAttribute('aria-hidden', 'false'); // Меню видимо для скринридеров
            mainNav.setAttribute('role', 'dialog'); // Определяем как диалоговое окно
            mainNav.setAttribute('aria-modal', 'true'); // Указываем, что оно модальное

            // Перемещаем фокус на кнопку закрытия для удобства навигации по клавиатуре
            // Используем setTimeout для гарантии, что меню стало видимым и фокусируемым
            setTimeout(() => {
                menuCloseBtn.focus();
            }, 50); // Небольшая задержка

            // TODO: Реализовать более сложный захват фокуса внутри модального окна (Tab trapping)
        };

        const closeMenu = () => {
            console.log("[Mobile Menu] Закрываем меню.");
            mainNav.classList.remove('is-open');
            // Закрываем любые открытые подменю в мобильном меню при закрытии оверлея
            mainNav.querySelectorAll('li.submenu-open').forEach(li => {
                li.classList.remove('submenu-open');
            });


            setTimeout(() => { // Задержка для анимации закрытия
                body.classList.remove('no-scroll');
                // Доступность: Показываем фон и возвращаем фокус
                elementsToHideFromScreenReader.forEach(el => el.removeAttribute('aria-hidden'));
                mainNav.setAttribute('aria-hidden', 'true');
                mainNav.removeAttribute('role');
                mainNav.removeAttribute('aria-modal');

                // Проверяем, что кнопка бургера еще видна (мы на мобильном) перед возвратом фокуса
                // Используем matchMedia, чтобы точно знать, находимся ли мы в мобильном представлении
                const mobileBreakpoint = 950;
                if (window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`).matches) { // Если меньше брейкпоинта
                    menuToggleBtn.focus(); // Возвращаем фокус на кнопку, открывшую меню
                }
            }, 400); // Длительность равна или чуть больше длительности CSS transition
        };

        // Изначально скрываем меню для скринридеров и показываем фон
        // Это важно для правильной работы ARIA, даже если CSS скрывает меню визуально
        if (mainNav) {
            mainNav.setAttribute('aria-hidden', 'true'); // По умолчанию скрыто для скринридеров
            elementsToHideFromScreenReader.forEach(el => el.removeAttribute('aria-hidden')); // Фон по умолчанию виден
        }

        menuToggleBtn.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        menuCloseBtn.addEventListener('click', closeMenu);


        // Закрытие меню при клике вне области навигации (на фон оверлея)
        mainNav.addEventListener('click', (event) => {
            // Закрываем только если клик был непосредственно по самому контейнеру #main-nav
            // Проверяем, что меню действительно открыто
            if (event.target === mainNav && mainNav.classList.contains('is-open')) {
                console.log("[Mobile Menu] Клик по фону оверлея - закрываем меню.");
                closeMenu();
            }
        });

        // Закрытие меню по клавише Escape
        window.addEventListener('keydown', (event) => {
            const isMenuOpen = mainNav.classList.contains('is-open');
            const isFocusInMenu = mainNav.contains(document.activeElement) || document.activeElement === menuToggleBtn;

            if (event.key === 'Escape' && isMenuOpen && isFocusInMenu) {
                console.log("[Mobile Menu] Нажат Escape - закрываем меню.");
                closeMenu();
                event.preventDefault(); // Предотвращаем любое стандартное действие Escape
            }
        });

        // 7.1. Тоггл подменю по клику в МОБИЛЬНОМ меню
        // Применяем эту логику ТОЛЬКО когда меню открыто (т.е. мы на маленьком экране)
        mainNav.querySelectorAll('li.has-submenu > a').forEach(link => {
            link.addEventListener('click', function (event) {
                // Проверяем, что меню открыто (т.е., мы находимся в мобильном представлении меню)
                if (mainNav.classList.contains('is-open')) {
                    const parentLi = this.closest('li');
                    const submenu = parentLi?.querySelector('ul.submenu');
                    const href = this.getAttribute('href');
                    // Определяем, является ли ссылка якорем на текущей странице
                    // Если клик по якорю на текущей странице, мы хотим закрыть меню и скроллить, а не тогглить подменю
                    const isAnchorOnCurrentPage = href && href.startsWith('#') && href.length > 1 && window.location.pathname.endsWith(href.split('#')[0] || '/');


                    if (parentLi && submenu && !isAnchorOnCurrentPage) { // Если есть подменю и это не якорь на текущей
                        event.preventDefault(); // Предотвращаем стандартный переход по ссылке родителя
                        console.log('[Mobile Submenu Toggle] Клик по родителю подменю.');

                        // Закрываем все другие открытые подменю на этом уровне в этом меню
                        parentLi.parentElement.querySelectorAll('li.submenu-open').forEach(li => {
                            if (li !== parentLi) {
                                li.classList.remove('submenu-open');
                            }
                        });

                        // Тогглим класс на текущем пункте
                        parentLi.classList.toggle('submenu-open');

                        // Опционально: скролл к открытому подменю
                        // setTimeout(() => {
                        //      parentLi.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        // }, 100);
                    } else if (mainNav.classList.contains('is-open') && href && href !== '#') {
                        // Если это реальная ссылка (не # и не якорь на текущей) в открытом меню, закрываем все меню
                        console.log('[Mobile Submenu Toggle] Клик по ссылке в открытом меню - закрываем все.');
                        closeMenu();
                        // Переход по ссылке произойдет автоматически
                    } else if (href === '#') {
                        // Если это просто "#", предотвращаем дефолт
                        event.preventDefault();
                    }
                    // Если это якорь на текущей странице (isAnchorOnCurrentPage),
                    // не предотвращаем дефолт, меню закроется выше, и скролл сработает.

                }
            });

            // Для доступности: Обработка Enter/Space на родителе подменю (в мобильном меню)
            link.addEventListener('keydown', function (event) {
                if (mainNav.classList.contains('is-open') && (event.key === 'Enter' || event.key === ' ')) {
                    const parentLi = this.closest('li');
                    const submenu = parentLi?.querySelector('ul.submenu');
                    const href = this.getAttribute('href');
                    const isAnchorOnCurrentPage = href && href.startsWith('#') && href.length > 1 && window.location.pathname.endsWith(href.split('#')[0] || '/');


                    if (parentLi && submenu && !isAnchorOnCurrentPage) { // Если есть подменю и это не якорь на текущей
                        event.preventDefault();
                        console.log('[Mobile Submenu Toggle] Enter/Space на родителе подменю.');

                        parentLi.parentElement.querySelectorAll('li.submenu-open').forEach(li => {
                            if (li !== parentLi) {
                                li.classList.remove('submenu-open');
                            }
                        });
                        parentLi.classList.toggle('submenu-open');

                        // Опционально: переместить фокус
                        if (parentLi.classList.contains('submenu-open')) {
                            setTimeout(() => {
                                const firstSubmenuLink = submenu.querySelector('a');
                                if (firstSubmenuLink) {
                                    firstSubmenuLink.focus();
                                }
                            }, 50);
                        }
                    }
                }
            });
        });
        console.log("[Mobile Submenu Toggle] Обработчики для показа подменю в мобильном меню добавлены.");

        // Закрытие открытых подменю при клике вне навигации
        document.addEventListener('click', (event) => {
            // Если клик не был внутри mainNav И меню открыто
            if (!mainNav.contains(event.target) && mainNav.classList.contains('is-open')) {
                mainNav.querySelectorAll('li.submenu-open').forEach(li => {
                    li.classList.remove('submenu-open');
                });
            }
        });

        // Закрытие открытых подменю по Escape (дополнительно к закрытию всего меню)
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                const openSubmenus = mainNav.querySelectorAll('li.submenu-open');
                if (openSubmenus.length > 0) {
                    console.log("[Mobile Submenu Toggle] Escape нажат, закрываем подменю.");
                    openSubmenus.forEach(li => li.classList.remove('submenu-open'));
                    // Не предотвращаем default здесь, чтобы позволить общему обработчику Escape закрыть все меню
                }
            }
        });

    }

    // --- 8. Анимация клика по навигации (для переходов между страницами) ---
    function setupNavAnimation() {
        // Выбираем ссылки, которые находятся в навигации и имеют href
        const navLinks = document.querySelectorAll('#main-nav a[href]');
        console.log(`[Nav Anim] Найдено потенциальных ссылок для анимации: ${navLinks.length}`);

        navLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                const href = this.getAttribute('href');

                // Анимация перехода применима ТОЛЬКО к ссылкам, которые ведут на ДРУГИЕ страницы.
                // Якоря (#...) обрабатываются стандартным скроллом браузера (с smooth-behavior)
                const isExternalLink = href && !href.startsWith('#') && href !== '#';
                const isCurrentPage = window.location.pathname.endsWith(href.replace('../', '/').replace('./', '/'));

                // Проверяем, находимся ли мы на МОБИЛЬНОМ представлении меню.
                // Используем matchMedia для более надежной проверки ширины окна.
                const mobileBreakpoint = 950;
                const isMobileMenu = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`).matches;


                // Применяем анимацию только к внешним ссылкам на ДЕСКТОПЕ, которые не ведут на текущую страницу
                if (isExternalLink && !isCurrentPage && !isMobileMenu) {
                    event.preventDefault(); // Предотвращаем немедленный переход

                    console.log(`[Nav Anim] Запускаем анимацию для ссылки: ${href}`);

                    // Удаляем предыдущие анимации и добавляем текущую
                    mainNav.querySelectorAll(':scope .animate-neon-fill').forEach(el => el.classList.remove('animate-neon-fill'));
                    this.classList.add('animate-neon-fill');

                    // Переходим по ссылке после завершения CSS-анимации
                    const handleAnimationEnd = () => {
                        console.log('[Nav Anim] Анимация завершена, переход на:', href);
                        window.location.href = href;
                        this.removeEventListener('animationend', handleAnimationEnd);
                    };

                    this.addEventListener('animationend', handleAnimationEnd);

                    setTimeout(() => {
                        // Проверяем, не произошел ли уже переход
                        // Убеждаемся, что мы все еще на той же странице, что и перед анимацией
                        // (Сравниваем после замены ../ и ./ для надежности)
                        const currentPathAdjusted = window.location.pathname.replace(/\/(partials\/)?/g, '/').replace(/^\//, ''); // Пример упрощения пути для сравнения
                        const hrefAdjusted = href.replace(/\/(partials\/)?/g, '/').replace(/^\//, '');
                        if (!currentPathAdjusted.endsWith(hrefAdjusted) && this.classList.contains('animate-neon-fill')) {
                            console.warn('[Nav Anim] Animationend не сработал, переход по Timeout.');
                            window.location.href = href;
                        }
                    }, 2000); // Длительность анимации 1.5s, ставим чуть больше
                } else if (href === '#' || !href) {
                    // Для ссылок-заглушек
                    link.addEventListener('click', function (event) {
                        event.preventDefault();
                        console.log('[Nav Anim] Клик по ссылке "#" или без href.');
                    });
                }
                // Якоря (#...) будут обрабатываться стандартным плавным скроллом (css scroll-behavior: smooth)
                // и не вызывают анимацию перехода страницы. В мобильном меню клик по якорю обрабатывается в setupMobileMenu.
            });
        });
        console.log("[Nav Anim] Обработчики для анимации навигации добавлены к внешним ссылкам.");
    }


    // --- Вызов всех функций инициализации ---
    setupThemeToggle();
    setupProgressBar();
    setupScrollTopButton();
    setupCodeExecution(); // Настраивает кнопки запуска кода на всех страницах
    setupScrollReveal();
    setupMobileMenu(); // Настраивает модальное меню для мобильных И тоггл подменю в нем
    setupScrollHeaderEffect(); // Настраивает эффект скролла шапки (только для десктопа)
    setupNavAnimation(); // Настраивает анимацию перехода между страницами (для внешних ссылок)


    // Инициализация Prism.js после загрузки всех скриптов и DOM
    // Используем autoloader и defer в HTML для большинства случаев.
    // Этот блок можно использовать для проверки или если автозагрузка не сработала.
    if (window.Prism) {
        // Prism.plugins.autoloader.addAlias('javascript', 'js'); // Обычно не нужно, autoloader делает это сам
        // Prism.highlightAll(); // Обычно вызывается автоматически Autoloader'ом
        console.log("Prism.js OK.");
    } else {
        console.warn("Prism.js не загружен, подсветка кода может не работать полностью.");
    }


    console.log("Инициализация всех скриптов в main.js завершена.");

});