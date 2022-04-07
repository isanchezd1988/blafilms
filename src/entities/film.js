export class Film {
    #imdbID;
    #poster;
    #title;
    #type;
    #year;

    constructor(imdbID, poster, title, type, year) {
        this.#imdbID = imdbID;
        this.#poster = poster !== 'N/A' ? poster : '';
        this.#title = title;
        this.#type = type;
        this.#year = year;
    }

    get imdbID() {
        return this.#imdbID;
    }

    get poster() {
        return this.#poster;
    }

    get title() {
        return this.#title;
    }

    get type() {
        return this.#type;
    }

    get year() {
        return this.#year;
    }


}