// ===== Файл: js/gallery.js =====
// Содержит данные и логику для галереи изображений на странице gallery.html

// --- 1. Массив данных для галереи ---
// ЗАМЕНИ пути и описания на свои реальные данные из папки ../img/
const images = [
    {
        preview: '/img/CyberpunkAlley600x400.jpg',
        original: '/img/CyberpunkAlley1530x1024.jpg',
        description: 'Киборг-детектив в неоновом плаще',
    },
    {
        preview: '/img/CyberpunkBartender600x400.jpg',
        original: '/img/CyberpunkBartender1530x1024.jpg',
        description: 'Робот-бармен в футуристическом баре',
    },
    {
        preview: '/img/NeonCatSign600x900.jpg',
        original: '/img/NeonCatSign1024x1536.jpg',
        description: 'Кибернетический кот с неоновыми глазами',
    },
    {
        preview: '/img/NeonRunner600x400.jpg',
        original: '/img/NeonRunner1530x1024.jpg',
        description: 'Уличный самурай с кибер-катаной',
    },
    {
        preview: '/img/NeonDogSign600x900.jpg',
        original: '/img/NeonDogSign1024x1536.jpg',
        description: 'Робо-пес патрулирует мегаполис',
    },
    {
        preview: '/img/MaskedCyberpunk600x900.jpg',
        original: '/img/MaskedCyberpunk1024x1536.jpg',
        description: 'Девушка-хакер за терминалом',
    },
    {
        preview: '/img/NeonRobot600x400.jpg',
        original: '/img/NeonRobot1530x1024.jpg',
        description: 'Рынок андроидов под неоновыми вывесками',
    },
    {
        preview: '/img/A neon-lit scene with a dog600x900.jpg',
        original: '/img/A neon-lit scene with a dog1024x1536.jpg',
        description: 'Собака с кибернетическими улучшениями',
    },
    {
        preview: '/img/NeonCatStreet600x900.jpg',
        original: '/img/NeonCatStreet1024x1536.jpg',
        description: 'Уличный кот в неоновом переулке',
    },
];

// --- 2. Поиск контейнера галереи ---
// Находим элемент <ul class="gallery"> в документе один раз и сохраняем в переменную.
const galleryContainer = document.querySelector('.gallery');

// --- 3. Создание и добавление разметки галереи ---
// Проверяем, найден ли контейнер, чтобы избежать ошибок, если HTML изменится.
if (galleryContainer) {
    // Создаем HTML-строку для всех элементов галереи:
    // 1. map() проходит по каждому объекту в массиве 'images'.
    // 2. Деструктуризация { preview, original, description } извлекает нужные свойства из объекта.
    // 3. Шаблонная строка `` создает HTML для одного элемента <li>.
    // 4. join('') объединяет все строки <li> в одну большую HTML-строку.
    const galleryMarkup = images
        .map(({ preview, original, description }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${original}">
            <img
              class="gallery-image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `)
        .join('');

    // Вставляем сгенерированную разметку внутрь контейнера .gallery.
    galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
    console.log("Разметка галереи создана и добавлена в DOM.");

    // --- 4. Делегирование и открытие модального окна basicLightbox ---
    // Добавляем ОДИН слушатель события 'click' на весь контейнер <ul>.
    galleryContainer.addEventListener('click', (event) => {
        // event - объект события.

        // Предотвращаем стандартное действие браузера для ссылки (переход по href).
        event.preventDefault();

        // Определяем элемент, на который кликнули (event.target).
        // Используем closest('.gallery-image'), чтобы найти само изображение,
        // даже если клик пришелся на ссылку или другой элемент внутри <li>.
        const targetImage = event.target.closest('.gallery-image');

        // Если клик был не по изображению (или элементу внутри него), выходим из функции.
        if (!targetImage) {
            return;
        }

        // Получаем URL большого изображения из data-атрибута 'source'.
        const largeImageURL = targetImage.dataset.source;
        // Получаем описание из атрибута 'alt'.
        const imageDescription = targetImage.alt;

        // Если URL не найден (атрибут data-source отсутствует), выходим.
        if (!largeImageURL) {
            console.warn("Не найден атрибут data-source у изображения.");
            return;
        }

        // --- Создание и показ модального окна basicLightbox ---
        let instance = null; // Переменная для хранения экземпляра окна

        // Функция для закрытия окна по Escape
        const onEscKeyPress = (e) => {
            if (e.key === 'Escape' && instance && instance.visible()) {
                instance.close();
            }
        };

        // Создаем экземпляр окна
        instance = basicLightbox.create(`
            <img src="${largeImageURL}" alt="${imageDescription}" width="1112" height="640">
        `, {
            onShow: (instance) => {
                // Добавляем слушатель Esc при показе
                document.addEventListener('keydown', onEscKeyPress);
            },
            onClose: (instance) => {
                // Удаляем слушатель Esc при закрытии
                document.removeEventListener('keydown', onEscKeyPress);
            }
        });

        // Показываем окно
        instance.show();
    });
    console.log("Слушатель кликов с basicLightbox добавлен на .gallery.");

} else {
    // Сообщение об ошибке, если контейнер .gallery не найден.
    console.error("Ошибка: Контейнер .gallery не найден на странице!");
}

// --- Конец файла gallery.js ---
