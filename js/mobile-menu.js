// // ===== Файл: js/mobile-menu.js =====

// // Оборачиваем весь код в DOMContentLoaded, чтобы он сработал после загрузки HTML
// document.addEventListener('DOMContentLoaded', () => {
//     console.log("[Mobile Menu] Инициализация скрипта мобильного меню...");

//     const menuToggleBtn = document.getElementById('menu-toggle');
//     const menuCloseBtn = document.getElementById('menu-close');
//     const mainNav = document.getElementById('main-nav');
//     const body = document.body; // Получаем body для блокировки скролла

//     if (menuToggleBtn && menuCloseBtn && mainNav && body) {
//         console.log("[Mobile Menu] Элементы найдены, добавляем обработчики.");

//         // Открытие меню по клику на бургер
//         menuToggleBtn.addEventListener('click', () => {
//             console.log("[Mobile Menu] Клик по бургеру - открываем меню.");
//             mainNav.classList.add('is-open');
//             body.classList.add('no-scroll'); // Блокируем скролл фона
//             menuToggleBtn.setAttribute('aria-expanded', 'true');
//         });

//         // Закрытие меню по клику на крестик
//         menuCloseBtn.addEventListener('click', () => {
//             console.log("[Mobile Menu] Клик по крестику - закрываем меню.");
//             mainNav.classList.remove('is-open');
//             body.classList.remove('no-scroll'); // Разблокируем скролл
//             menuToggleBtn.setAttribute('aria-expanded', 'false');
//         });

//         // Закрытие меню при клике на РЕАЛЬНУЮ ссылку внутри него
//         mainNav.querySelectorAll('a').forEach(link => {
//             link.addEventListener('click', (event) => {
//                 const href = link.getAttribute('href');
//                 // Игнорируем ссылки-заглушки (#) или без href
//                 if (!href || href === '#') {
//                     console.log("[Mobile Menu] Клик по ссылке-заглушке или без href, меню не закрываем.");
//                     // Здесь можно добавить логику для подменю, если она нужна
//                     return;
//                 }

//                 console.log("[Mobile Menu] Клик по реальной ссылке - закрываем меню.");
//                 mainNav.classList.remove('is-open');
//                 body.classList.remove('no-scroll');
//                 menuToggleBtn.setAttribute('aria-expanded', 'false');
//                 // Не предотвращаем переход по ссылке (event.preventDefault() не вызываем)
//             });
//         });

//         // Закрытие меню при клике вне области навигации (на фон оверлея)
//         mainNav.addEventListener('click', (event) => {
//             // event.target - это элемент, по которому кликнули
//             // mainNav - это сам оверлей
//             if (event.target === mainNav) {
//                 console.log("[Mobile Menu] Клик по фону оверлея - закрываем меню.");
//                 mainNav.classList.remove('is-open');
//                 body.classList.remove('no-scroll');
//                 menuToggleBtn.setAttribute('aria-expanded', 'false');
//             }
//         });

//     } else {
//         // Выводим более детальное сообщение об ошибке
//         if (!menuToggleBtn) console.warn("[Mobile Menu] Не найден элемент: #menu-toggle");
//         if (!menuCloseBtn) console.warn("[Mobile Menu] Не найден элемент: #menu-close");
//         if (!mainNav) console.warn("[Mobile Menu] Не найден элемент: #main-nav");
//         if (!body) console.warn("[Mobile Menu] Не найден элемент: body");
//     }

//     console.log("[Mobile Menu] Инициализация скрипта мобильного меню завершена.");
// });

// // ===== Конец файла js/mobile-menu.js =====
