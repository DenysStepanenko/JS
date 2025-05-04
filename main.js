document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed. Initializing scripts...");

    const body = document.body;
    const header = document.querySelector('header');
    const mainNav = document.getElementById('main-nav');
    const menuToggleBtn = document.getElementById('menu-toggle');
    const menuCloseBtn = document.getElementById('menu-close');
    const progressBar = document.getElementById('progress-bar');
    const scrollTopBtn = document.getElementById('scroll-top');
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
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            const scrollableHeight = docHeight - windowHeight;
            const scrollPercent = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
            progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }, { passive: true });
    }

    // --- 3. Кнопка "Наверх" ---
    function setupScrollTopButton() {
        if (!scrollTopBtn) {
            console.warn("Кнопка #scroll-top не найдена.");
            return;
        }
        window.addEventListener('scroll', () => {
            scrollTopBtn.style.display = (window.scrollY || document.documentElement.scrollTop) > 200 ? 'block' : 'none';
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. Скрытие/показ кода ---
    function setupToggleCode() {
        document.querySelectorAll('.toggle-code').forEach(button => {
            const preElementInit = button.parentElement?.querySelector('pre');
            if (preElementInit) {
                button.textContent = (preElementInit.style.display === 'none') ? 'Показать код' : 'Скрыть код';
            } else {
                button.textContent = 'Скрыть код';
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
    }

    // --- 5. Копирование кода ---
    function setupCopyCode() {
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
    }

    // --- 6. Выполнение кода ---
    function setupCodeExecution() {
        document.addEventListener('click', function (event) {
            if (event.target.matches('.run-code-editor')) {
                const button = event.target;
                const codeBlock = button.closest('.code-block');
                if (!codeBlock) return;

                const textarea = codeBlock.querySelector('.code-editor');
                const resultDiv = codeBlock.querySelector('.result');

                if (!textarea || !resultDiv) {
                    console.warn("Не найдены '.code-editor' или '.result' для кнопки 'Запустить'.");
                    return;
                }

                resultDiv.innerHTML = '';
                const originalConsoleLog = console.log;
                const logs = [];

                console.log = (...args) => {
                    const formattedArgs = args.map(arg => {
                        try {
                            return (typeof arg === 'object' && arg !== null) ? JSON.stringify(arg, null, 2) : String(arg);
                        } catch (e) {
                            return '[Circular Object]';
                        }
                    }).join(' ');
                    logs.push(formattedArgs);
                    originalConsoleLog.apply(console, args);
                };

                try {
                    new Function(textarea.value)();
                    if (logs.length > 0) {
                        resultDiv.innerHTML = logs.map(log => `<p>${log.replace(/\n/g, '<br>')}</p>`).join('');
                    } else {
                        resultDiv.innerHTML = `<p style="color: #ff5555;">Код выполнен без вывода.</p>`;
                    }
                } catch (error) {
                    resultDiv.innerHTML = `<p style="color: #ff5555;">Ошибка: ${error.message}</p>`;
                    originalConsoleLog.error("Ошибка выполнения кода из редактора:", error);
                } finally {
                    console.log = originalConsoleLog;
                }
            }

            if (event.target.matches('button.run-code:not(.run-code-editor)')) {
                const button = event.target;
                const codeBlock = button.closest('.code-block');
                if (!codeBlock) return;

                const codeElement = codeBlock.querySelector('pre code');
                const outputDiv = codeBlock.querySelector('.output');

                if (!codeElement || !outputDiv) {
                    console.warn("Не найдены 'pre code' или '.output' для кнопки 'Запустить пример'.");
                    return;
                }

                outputDiv.innerHTML = '';
                const originalConsoleLog = console.log;
                const logs = [];

                console.log = (...args) => {
                    const formattedArgs = args.map(arg => typeof arg === 'object' && arg !== null ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
                    logs.push(formattedArgs);
                    originalConsoleLog.apply(console, args);
                };

                try {
                    new Function(codeElement.textContent || "")();
                    if (logs.length > 0) {
                        outputDiv.innerHTML = logs.map(log => `<p>${log.replace(/\n/g, '<br>')}</p>`).join('');
                    } else {
                        outputDiv.innerHTML = `<p style="color: #ff5555;">Пример выполнен без вывода.</p>`;
                    }
                } catch (error) {
                    outputDiv.innerHTML = `<p style="color: #ff5555;">Ошибка: ${error.message}</p>`;
                    originalConsoleLog.error("Ошибка выполнения примера кода:", error);
                } finally {
                    console.log = originalConsoleLog;
                }
            }
        });
    }

    // --- 7. Анимация появления секций ---
    function setupScrollReveal() {
        const sectionsToReveal = document.querySelectorAll('.scroll-reveal');
        console.log(`[Scroll Reveal] Найдено секций для анимации: ${sectionsToReveal.length}`);
        if (sectionsToReveal.length > 0) {
            if ('IntersectionObserver' in window) {
                const observerOptions = {
                    threshold: 0.15
                };
                const observer = new IntersectionObserver((entries, obs) => {
                    console.log(`[Scroll Reveal] IntersectionObserver сработал (записей: ${entries.length})`);
                    entries.forEach(entry => {
                        const targetId = entry.target.id || '[без ID]';
                        if (entry.isIntersecting) {
                            console.log(`[Scroll Reveal] Секция ${targetId} видна.`);
                            entry.target.classList.add('is-visible');
                        }
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
    }

    // --- 8. Эффект прокрутки шапки ---
    function setupScrollHeaderEffect() {
        if (!header) {
            console.warn("Элемент header не найден.");
            return;
        }

        let lastScrollY = 0;
        const scrollThreshold = 50;
        const mobileBreakpoint = 950;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollingDown = currentScrollY > lastScrollY;
            const isAtTop = currentScrollY <= scrollThreshold;

            // Управление эффектом .header-scrolled
            if (currentScrollY > scrollThreshold && !header.classList.contains('header-scrolled')) {
                header.classList.add('header-scrolled');
            } else if (isAtTop && header.classList.contains('header-scrolled')) {
                header.classList.remove('header-scrolled');
            }

            // Управление скрытием шапки
            if (scrollingDown && currentScrollY > scrollThreshold && !header.classList.contains('header-hidden')) {
                header.classList.add('header-hidden');
            } else if (!scrollingDown && header.classList.contains('header-hidden')) {
                header.classList.remove('header-hidden');
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
        console.log("[Scroll Header Effect] Наблюдение за скроллом для шапки установлено.");

        const checkScreenSize = () => {
            if (window.innerWidth < mobileBreakpoint && header.classList.contains('header-scrolled')) {
                header.classList.remove('header-scrolled');
            }
        };
        window.addEventListener('load', checkScreenSize);
        window.addEventListener('resize', checkScreenSize);
    }

    // --- 9. Бургер-меню и подменю ---
    function setupMobileMenu() {
        console.log("[Mobile Menu] Поиск элементов меню...");

        if (!menuToggleBtn || !menuCloseBtn || !mainNav) {
            console.warn("[Mobile Menu] Не найдены все необходимые элементы: #menu-toggle, #menu-close, #main-nav. Мобильное меню не будет работать.");
            if (mainNav) {
                mainNav.setAttribute('aria-hidden', 'false');
            }
            return;
        }
        console.log("[Mobile Menu] Элементы найдены, добавляем обработчики.");

        const elementsToHideFromScreenReader = document.querySelectorAll('main, footer');

        const openMenu = () => {
            console.log("[Mobile Menu] Открываем меню.");
            mainNav.classList.add('is-open');
            body.classList.add('no-scroll');
            menuToggleBtn.setAttribute('aria-expanded', 'true');
            menuToggleBtn.setAttribute('aria-label', 'Закрыть меню');

            elementsToHideFromScreenReader.forEach(el => el.setAttribute('aria-hidden', 'true'));
            mainNav.setAttribute('aria-hidden', 'false');
            mainNav.setAttribute('role', 'dialog');
            mainNav.setAttribute('aria-modal', 'true');

            setTimeout(() => {
                menuCloseBtn.focus();
            }, 50);
        };

        const closeMenu = () => {
            console.log("[Mobile Menu] Закрываем меню.");
            mainNav.classList.remove('is-open');
            mainNav.querySelectorAll('li.submenu-open').forEach(li => {
                li.classList.remove('submenu-open');
            });

            setTimeout(() => {
                body.classList.remove('no-scroll');
                elementsToHideFromScreenReader.forEach(el => el.removeAttribute('aria-hidden'));
                mainNav.setAttribute('aria-hidden', 'true');
                mainNav.removeAttribute('role');
                mainNav.removeAttribute('aria-modal');

                const mobileBreakpoint = 950;
                if (window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`).matches) {
                    menuToggleBtn.focus();
                }
            }, 400);
        };

        if (mainNav) {
            mainNav.setAttribute('aria-hidden', 'true');
            elementsToHideFromScreenReader.forEach(el => el.removeAttribute('aria-hidden'));
        }

        menuToggleBtn.addEventListener('click', () => {
            if (mainNav.classList.contains('is-open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        menuCloseBtn.addEventListener('click', closeMenu);

        mainNav.addEventListener('click', (event) => {
            if (event.target === mainNav && mainNav.classList.contains('is-open')) {
                console.log("[Mobile Menu] Клик по фону оверлея - закрываем меню.");
                closeMenu();
            }
        });

        window.addEventListener('keydown', (event) => {
            const isMenuOpen = mainNav.classList.contains('is-open');
            const isFocusInMenu = mainNav.contains(document.activeElement) || document.activeElement === menuToggleBtn;

            if (event.key === 'Escape' && isMenuOpen && isFocusInMenu) {
                console.log("[Mobile Menu] Нажат Escape - закрываем меню.");
                closeMenu();
                event.preventDefault();
            }
        });

        mainNav.querySelectorAll('li.has-submenu > a').forEach(link => {
            link.addEventListener('click', function (event) {
                if (mainNav.classList.contains('is-open')) {
                    const parentLi = this.closest('li');
                    const submenu = parentLi?.querySelector('ul.submenu');
                    const href = this.getAttribute('href');
                    const isAnchorOnCurrentPage = href && href.startsWith('#') && href.length > 1 && window.location.pathname.endsWith(href.split('#')[0] || '/');

                    if (parentLi && submenu && !isAnchorOnCurrentPage) {
                        event.preventDefault();
                        console.log('[Mobile Submenu Toggle] Клик по родителю подменю.');

                        parentLi.parentElement.querySelectorAll('li.submenu-open').forEach(li => {
                            if (li !== parentLi) {
                                li.classList.remove('submenu-open');
                            }
                        });

                        parentLi.classList.toggle('submenu-open');
                    } else if (mainNav.classList.contains('is-open') && href && href !== '#') {
                        console.log('[Mobile Submenu Toggle] Клик по ссылке в открытом меню - закрываем все.');
                        closeMenu();
                    } else if (href === '#') {
                        event.preventDefault();
                    }
                }
            });

            link.addEventListener('keydown', function (event) {
                if (mainNav.classList.contains('is-open') && (event.key === 'Enter' || event.key === ' ')) {
                    const parentLi = this.closest('li');
                    const submenu = parentLi?.querySelector('ul.submenu');
                    const href = this.getAttribute('href');
                    const isAnchorOnCurrentPage = href && href.startsWith('#') && href.length > 1 && window.location.pathname.endsWith(href.split('#')[0] || '/');

                    if (parentLi && submenu && !isAnchorOnCurrentPage) {
                        event.preventDefault();
                        console.log('[Mobile Submenu Toggle] Enter/Space на родителе подменю.');

                        parentLi.parentElement.querySelectorAll('li.submenu-open').forEach(li => {
                            if (li !== parentLi) {
                                li.classList.remove('submenu-open');
                            }
                        });
                        parentLi.classList.toggle('submenu-open');

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

        document.addEventListener('click', (event) => {
            if (!mainNav.contains(event.target) && mainNav.classList.contains('is-open')) {
                mainNav.querySelectorAll('li.submenu-open').forEach(li => {
                    li.classList.remove('submenu-open');
                });
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                const openSubmenus = mainNav.querySelectorAll('li.submenu-open');
                if (openSubmenus.length > 0) {
                    console.log("[Mobile Submenu Toggle] Escape нажат, закрываем подменю.");
                    openSubmenus.forEach(li => li.classList.remove('submenu-open'));
                }
            }
        });
    }

    // --- 10. Анимация клика по навигации ---
    function setupNavAnimation() {
        const navLinks = document.querySelectorAll('#main-nav a[href]');
        console.log(`[Nav Anim] Найдено потенциальных ссылок для анимации: ${navLinks.length}`);

        // Добавляем .animate-neon-fill к активной ссылке при загрузке
        const currentPath = window.location.pathname.replace(/^\//, '');
        navLinks.forEach(link => {
            const href = link.getAttribute('href').replace(/^\.\//, '').replace(/^\.\.\//, '');
            if (currentPath === href || link.classList.contains('active')) {
                link.classList.add('animate-neon-fill');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                const href = this.getAttribute('href');
                const isExternalLink = href && !href.startsWith('#') && href !== '#';
                const isCurrentPage = window.location.pathname.endsWith(href.replace('../', '/').replace('./', '/'));

                const mobileBreakpoint = 950;
                const isMobileMenu = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`).matches;

                if (isExternalLink && !isCurrentPage && !isMobileMenu) {
                    event.preventDefault();
                    console.log(`[Nav Anim] Запускаем анимацию для ссылки: ${href}`);

                    mainNav.querySelectorAll(':scope .animate-neon-fill').forEach(el => el.classList.remove('animate-neon-fill'));
                    this.classList.add('animate-neon-fill');

                    const handleAnimationEnd = () => {
                        console.log('[Nav Anim] Анимация завершена, переход на:', href);
                        window.location.href = href;
                        this.removeEventListener('animationend', handleAnimationEnd);
                    };

                    this.addEventListener('animationend', handleAnimationEnd);

                    setTimeout(() => {
                        const currentPathAdjusted = window.location.pathname.replace(/\/(partials\/)?/g, '/').replace(/^\//, '');
                        const hrefAdjusted = href.replace(/\/(partials\/)?/g, '/').replace(/^\//, '');
                        if (!currentPathAdjusted.endsWith(hrefAdjusted) && this.classList.contains('animate-neon-fill')) {
                            console.warn('[Nav Anim] Animationend не сработал, переход по Timeout.');
                            window.location.href = href;
                        }
                    }, 2000);
                } else if (href === '#' || !href) {
                    event.preventDefault();
                    console.log('[Nav Anim] Клик по ссылке "#" или без href.');
                }
            });
        });
        console.log("[Nav Anim] Обработчики для анимации навигации добавлены к внешним ссылкам.");
    }

    // --- Вызов всех функций инициализации ---
    setupThemeToggle();
    setupProgressBar();
    setupScrollTopButton();
    setupToggleCode();
    setupCopyCode();
    setupCodeExecution();
    setupScrollReveal();
    setupScrollHeaderEffect();
    setupMobileMenu();
    setupNavAnimation();

    console.log("Инициализация всех скриптов завершена.");
});