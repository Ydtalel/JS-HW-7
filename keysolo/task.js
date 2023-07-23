class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = container.querySelector('.status__timer');

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {

    document.addEventListener('keydown', (event) => {
      const exceptionKey = event.code.startsWith('Shift') 
      || event.code.startsWith('Control') 
      || event.code.startsWith('Alt') 
      || event.code === 'CapsLock';
      const inputSymbol = event.key.toLowerCase();
      const currentSymbol = this.currentSymbol.textContent.toLowerCase();

      if (exceptionKey) {
        return;
      }

      if (inputSymbol === currentSymbol) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    if (this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    const wordLength = word.length;
    this.timerElement.textContent = wordLength;

    if (this.countdownIntervalId) {
      clearInterval(this.countdownIntervalId);
    }

    let timeLeft = wordLength;
    const countdownTimer = document.getElementById('countdown-timer');
    countdownTimer.textContent = timeLeft;

    this.countdownIntervalId = setInterval(() => {
      timeLeft -= 1;
      countdownTimer.textContent = timeLeft;

      if (timeLeft === 0) {
        clearInterval(this.countdownIntervalId);
        this.fail();
      }
    }, 1000);

    this.renderWord(word);

  }

  getWord() {
    const words = [
      'bob',
      'awesome',
      'netology',
      'hello',
      'kitty',
      'rock',
      'youtube',
      'popcorn',
      'cinema',
      'love',
      'javascript',
      'я люблю kitkat',
      'я учу JavaScript',
      'матрешка',
    ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current' : ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

