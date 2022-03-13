class MainApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    async register(name, email, password) {
        const res = await fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        return res;
    }

    async login(email, password) {
        const res = await fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        return res
    }

    async logout() {
        const res = await fetch(`${this._baseUrl}/signout`, {
            method: 'DELETE',
            credentials: 'include',
        });

        return res;
    }

    async getUser() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
        });

        return res;
    }

    async changeUserInfo(email, name) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                name,
            }),
        });

        return res;
    }

    async getSavedMovies() {
        const res = await fetch(`${this._baseUrl}/movies`, {
            credentials: 'include',
        });

        return res;
    }

    async createMovie(
        country,
        description,
        director,
        duration,
        movieId,
        image,
        nameEN,
        nameRU,
        trailer,
        year,
        thumbnail
    ) {
        const res = await fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country,
                description,
                director,
                duration,
                movieId,
                image,
                nameEN,
                nameRU,
                trailer,
                year,
                thumbnail,
            }),
        });

        return res;
    }

    async deleteMovie(movieId) {
        const res = await fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        return res;
    }
}

// const mainApi = new MainApi(
//     `${window.location.protocol}${
//         process.env.REACT_APP_API_URL || '//localhost:8000'
//     }`
// );

// const mainApi = new MainApi(`${window.location.protocol}//api.domain404.nomoredomains.club`)
const mainApi = new MainApi(`${window.location.protocol}//praktikum-movies-explorer-api.herokuapp.com/`)

export default mainApi;
