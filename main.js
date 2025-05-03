// Переключение темы
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(isLight) {
    if (!body || !themeToggle) return;
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
}

try {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme === 'light');
} catch (e) {
    console.error("Не удалось загрузить тему из localStorage:", e);
    setTheme(false);
}

// Прогресс-бар при прокрутке
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
}

// Кнопка "Наверх"
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = (window.scrollY || document.documentElement.scrollTop) > 200 ? 'block' : 'none';
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Скрытие/показ кода
document.addEventListener('DOMContentLoaded', () => {
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
            }
        });
    });
});

// Копирование кода
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
            }
        });
    });
});

// Выполнение кода из редактора
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.run-code-editor').forEach(button => {
        button.addEventListener('click', () => {
            const textarea = button.parentElement?.querySelector('.code-editor');
            const resultDiv = button.parentElement?.querySelector('.result');

            if (!textarea || !resultDiv) return;

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
                originalConsoleLog.error("Ошибка выполнения кода:", error);
            } finally {
                console.log = originalConsoleLog;
            }
        });
    });
});

// Анимация клика по навигации
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    console.log(`Найдено ${navLinks.length} ссылок навигации`);

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                if (this.classList.contains('animate-neon-fill')) return;

                navLinks.forEach(el => {
                    if (el !== this && el.classList.contains('animate-neon-fill')) {
                        el.classList.remove('animate-neon-fill');
                    }
                });

                this.classList.add('animate-neon-fill');

                const destination = this.href;

                this.addEventListener('animationend', (e) => {
                    if (e.animationName === 'neon-fill-ltr') {
                        if (this.classList.contains('animate-neon-fill')) {
                            this.classList.remove('animate-neon-fill');
                        }
                        window.location.href = destination;
                    }
                }, { once: true });
            });
        });
    }
});

// Анимация появления секций
window.addEventListener('load', () => {
    const sectionsToFade = document.querySelectorAll('section.fade-in');
    console.log(`Найдено ${sectionsToFade.length} элементов с классом .fade-in`);

    const checkVisibility = () => {
        sectionsToFade.forEach(section => {
            const rect = section.getBoundingClientRect();
            console.log(`Позиция элемента ${section.id || section.tagName}: rect.top = ${rect.top}, window.innerHeight = ${window.innerHeight}`);
            if (rect.top < window.innerHeight && rect.bottom >= 0 && !section.classList.contains('visible')) {
                console.log(`Элемент ${section.id || section.tagName} стал видимым, добавляю .visible`);
                section.classList.add('visible');
            }
        });
    };

    // Дебounce для оптимизации прокрутки
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                checkVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Проверка при загрузке
    checkVisibility();
});