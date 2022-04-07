import { Film } from '../entities/film';

export const FilmsRepository = {
    async getFilms(searchValue, page) {
        const films = [];

        const response = await fetch(
            `http://www.omdbapi.com/?apikey=a461e386&s=${searchValue}${page ? '&page='+ page : '' }`,
          )

          const data = await response.json()

          if(data.Response === 'True') {
              films.push(...data.Search.map(item => new Film(item.imdbID, item.Poster, item.Title, item.Type, item.Year)));
              console.log(films[0].imdbID);
          }

          return films;
        }

        
}