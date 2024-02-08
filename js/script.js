
$(document).ready(function() {
  let phrases = [
    'Промокод: D2h4zjG -15%',
    'Промокод: D2h4zjG -14%',
    'Промокод: D2h4zjG -13%',
    'Промокод: D2h4zjG -12%',
    'Промокод: D2h4zjG -11%',
    'Промокод: D2h4zjG -10%',
    'Промокод: D2h4zjG -9%',
    'Промокод: D2h4zjG -8%',
    'Промокод: D2h4zjG -7%',
    'Промокод: D2h4zjG -6%',
    'Промокод: D2h4zjG -5%',
    'Промокод: D2h4zjG -4%',
    'Промокод: D2h4zjG -3%',
    'Промокод: D2h4zjG -2%',
    'Промокод: D2h4zjG -1%',
    'Промокод: D2h4zjG -10%',
    'Промокод: D2h4zjG -9%',
    'Промокод: D2h4zjG -8%',
    'Промокод: D2h4zjG -7%',
    'Промокод: D2h4zjG -6%',
    'Промокод: D2h4zjG -5%',
    'Промокод: D2h4zjG -4%',
    'Промокод: D2h4zjG -3%',
    'Промокод: D2h4zjG -2%',
    'Промокод: D2h4zjG -1%',
];
    $('.symbol').css("background-image", `url(/img/probki/start.png)`);
    let imagesFolder = "/img/probki/"; // Шлях до папки з зображеннями
    let imageCount = 14; // Кількість зображень
    let spinsPerSlot = 12; // Кількість прокруток для кожного слота
    let isSpinning = false; // Флаг для відстеження статусу прокрутки
    let randomPhrase = ''; // Змінна для зберігання випадкової фрази
  
    function spin() {
      if (isSpinning) return; // Перевірка чи функція вже працює
      isSpinning = true; // Встановлення флагу в true, щоб позначити початок прокрутки
      
      $('.spin-button').css('background-color', '#1d042d'); // Зміна кольору кнопки під час прокрутки
  
      const baseSpinDelay = 100; // Базова затримка між прокрутками
      const delayMultiplier = 1.3; // Коефіцієнт затримки
  
      function spinSlot($slot, spinsLeft, spinDelay) {
        const randomImageIndex = Math.floor(Math.random() * imageCount) + 1;
        $slot.css("background-image", `url(${imagesFolder}${randomImageIndex}.png)`);
  
        if (spinsLeft > 0) {
          setTimeout(function() {
            spinSlot($slot, spinsLeft - 1, spinDelay * delayMultiplier);
          }, spinDelay);
        } else {
          isSpinning = false; // Позначення кінця прокрутки, коли всі слоти завершуються
          $('.spin-button').css('background-color', ''); // Зміна кольору кнопки після завершення прокрутки
          checkRow();
        }
      }
  
      function checkRow() {

        let randomPraseIndex = Math.floor(Math.random() * phrases.length);
        randomPhrase = phrases[randomPraseIndex]; // Записуємо випадкову фразу в глобальну змінну
        let rows = $(".slot-spin_container");
        let allSymbols = $();
        rows.each(function() {
            let symbols = $(this).find(".symbol");
            allSymbols = allSymbols.add(symbols);
            let firstSymbolSrc = symbols.eq(0).css("background-image");
            let sameSymbols = symbols.filter(function() {
                return $(this).css("background-image") === firstSymbolSrc;
            });
            if (sameSymbols.length === symbols.length) {
                $(this).css("background-color", "red");
                $('.spin-button').remove(); // Remove the .spin-button element if all symbols have it
                $('.slot-random_phrase').text(randomPhrase); // Update slot-random_phrase text after checking all rows
            } else {
                $(this).css("background-color", "");
            }
        });

    }
    $('.slot-random_phrase').click(function() {
      imageCount = 5;
      spinsPerSlot = 5;
      phrases.shift()
      phrases.shift()
      phrases.shift()
      phrases.shift()
      phrases.shift()
    });
      $('.slot .symbol').each(function() {
        const $slot = $(this);
        const spinsLeft = spinsPerSlot;
        const initialSpinDelay = baseSpinDelay;
        spinSlot($slot, spinsLeft, initialSpinDelay);
      });
    }

    $('.spin-button').click(function() {
      spin();
    });
  });