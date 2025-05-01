// ===== Файл: js/gallery.js =====
// Содержит данные и логику для галереи изображений на странице gallery.html

// --- 1. Массив данных для галереи (Киберпанк) ---
// Используем плейсхолдеры с placehold.co для надежности
const images = [
    {
        // preview: ссылка на маленькое изображение (для отображения в сетке галереи)
        preview: 'https://placehold.co/600x400/000020/00ffff?text=Neon+Cityscape+Prev',
        // original: ссылка на большое изображение (для модального окна)
        original: 'https://placehold.co/1280x720/000020/00ffff?text=Neon+Cityscape',
        // description: текстовое описание изображения
        description: 'Неоновый городской пейзаж под дождем',
    },
    {
        preview: 'https://placehold.co/600x400/1a001a/ff00ff?text=Cyborg+Alley+Prev',
        original: 'https://placehold.co/1280x720/1a001a/ff00ff?text=Cyborg+Alley',
        description: 'Киборг в темном переулке',
    },
    {
        preview: 'https://placehold.co/600x400/202020/00ff00?text=Data+Stream+Prev',
        original: 'https://placehold.co/1280x720/202020/00ff00?text=Data+Stream',
        description: 'Поток цифровых данных',
    },
    {
        preview: 'https://placehold.co/600x400/0d0d0d/ff4500?text=Rainy+Streets+Prev',
        original: 'https://placehold.co/1280x720/0d0d0d/ff4500?text=Rainy+Streets',
        description: 'Дождливые улицы мегаполиса ночью',
    },
    {
        preview: 'https://placehold.co/600x400/001f3f/7fdbff?text=Hologram+Ad+Prev',
        original: 'https://placehold.co/1280x720/001f3f/7fdbff?text=Hologram+Ad',
        description: 'Голографическая реклама в городе будущего',
    },
    {
        preview: 'https://placehold.co/600x400/301934/f0e68c?text=Tech+Noir+Prev',
        original: 'https://placehold.co/1280x720/301934/f0e68c?text=Tech+Noir',
        description: 'Атмосфера тек-нуара',
    },
    {
        preview: 'https://placehold.co/600x400/4b0082/ee82ee?text=Cyberpunk+Rider+Prev',
        original: 'https://placehold.co/1280x720/4b0082/ee82ee?text=Cyberpunk+Rider',
        description: 'Гонщик на футуристическом байке',
    },
    {
        preview: 'https://placehold.co/600x400/111111/ffcc00?text=Glitch+Art+Prev',
        original: 'https://placehold.co/1280x720/111111/ffcc00?text=Glitch+Art',
        description: 'Абстрактный глитч-арт',
    },
    {
        preview: 'https://placehold.co/600x400/003366/ccffff?text=Android+Dream+Prev',
        original: 'https://placehold.co/1280x720/003366/ccffff?text=Android+Dream',
        description: 'Задумчивый андроид',
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
    // Используем insertAdjacentHTML для большей гибкости, чем innerHTML.
    // 'beforeend' вставляет разметку перед закрывающим тегом </ul>.
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
            // console.log("Клик был не по изображению (.gallery-image). Игнорируем.");
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
        // Объявляем переменную для хранения экземпляра модального окна.
        let instance = null;

        // Объявляем функцию-обработчик для нажатия клавиши Escape.
        // Она должна быть объявлена здесь, чтобы иметь доступ к 'instance'.
        const onEscKeyPress = (e) => {
            // Проверяем, что нажата клавиша 'Escape' и модальное окно видимо.
            if (e.key === 'Escape' && instance && instance.visible()) {
                // console.log("Нажат Escape, закрываем модальное окно.");
                instance.close(); // Закрываем модальное окно.
            }
        };

        // Создаем экземпляр модального окна с помощью basicLightbox.create().
        // Первый аргумент - HTML-строка содержимого окна.
        // Второй аргумент - объект с опциями.
        instance = basicLightbox.create(`
            <img src="${largeImageURL}" alt="${imageDescription}" width="1112" height="640">
        `, {
            // Опция onShow: функция, которая выполнится ПЕРЕД показом окна.
            onShow: (instance) => {
                // console.log("Модальное окно открывается. Добавляем слушатель Esc.");
                // Добавляем слушатель нажатия клавиш на весь документ.
                document.addEventListener('keydown', onEscKeyPress);
            },
            // Опция onClose: функция, которая выполнится ПОСЛЕ закрытия окна.
            onClose: (instance) => {
                // console.log("Модальное окно закрыто. Удаляем слушатель Esc.");
                // Удаляем слушатель нажатия клавиш, чтобы он не висел без дела.
                document.removeEventListener('keydown', onEscKeyPress);
            }
        });

        // Показываем созданное модальное окно.
        instance.show();
        // console.log(`Открыто модальное окно для: ${largeImageURL}`);
    });
    console.log("Слушатель кликов с basicLightbox добавлен на .gallery.");

} else {
    // Сообщение об ошибке, если контейнер .gallery не найден.
    console.error("Ошибка: Контейнер .gallery не найден на странице!");
}

// --- Конец файла gallery.js ---
