class DomInterface {
    constructor() {
        this.title = document.querySelector('#TituloComic');
        this.image = document.querySelector('#ImagenComic');
        this.random = document.querySelector('#pedirComic');
        
    }

/* Funcion que muestra el comic */
    mostrarComics(data) {
        const { title, img } = data;

        this.title.innerHTML = title;
        this.image.src = img;
        if (data.alt) this.image.alt = data.alt;

    }


}


class RequestController {
    /* Conexión con API */
    constructor() {
        this.DomInterface = new DomInterface();
        this.corsHeader = 'https://the-ultimate-api-challenge.herokuapp.com';
        this.apiUrl = 'https://xkcd.com';
        this.apiUrlFormat = 'info.0.json';
        this.superAgent = superagent;

        this.currentComicsNumber = 0;
        this.maxComicsNumber = 0;

        this.getCurrentComics();
        this.registerEvents();


    }

    setMaxComicsNumber(number) {
        this.maxComicsNumber = number;
    }

    setCurrentComicsNumber(number) {
        this.currentComicsNumber = number;
    }

    getRandomComicsNumber() {
        const min = 1;
        const max = this.maxComicsNumber;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }

    getCurrentComics() {
        const requestUrl = `${this.corsHeader}/${this.apiUrl}/${this.apiUrlFormat}`;

        this.superAgent.get(requestUrl).end((er, res) => {

            const data = res.body;

            this.DomInterface.mostrarComics(data);
            this.setCurrentComicsNumber(data.num);
            this.setMaxComicsNumber(data.num);
        });
    }

    getComicsByNumber(number) {


        const requestUrl = `${this.corsHeader}/${this.apiUrl}/${number}/${this.apiUrlFormat}`;

        this.superAgent.get(requestUrl).end((er, res) => {

            const data = res.body;

            this.setCurrentComicsNumber(data.num);
            this.DomInterface.mostrarComics(data);
        });
    }



    registerEvents() {
        this.DomInterface.random.addEventListener('click', () =>
            this.getComicsByNumber(this.getRandomComicsNumber())
        );

    }
}


/* Funcion para reiniciar el puntaje de estrellas */
var btnReset = document.getElementById("pedirComic");
if (btnReset) {
    btnReset.onclick = function () {
        resetRadioButtons("estrellas");
    }
}


function resetRadioButtons(groupName) {
    var arRadioBtn = document.getElementsByName(groupName);

    for (var ii = 0; ii < arRadioBtn.length; ii++) {
        var radButton = arRadioBtn[ii];
        radButton.checked = false;
    }
}

const comics = new RequestController();


