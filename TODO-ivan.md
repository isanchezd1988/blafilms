# TODOs (práctica KataKroker 2022/02/25)

## 1. Buscador de pelis

Si escribimos en el input de búsqueda se hace una nueva llamada al API buscando por ese término de búsqueda.

- El API de OMDB acepta un query parameter `s` para buscar pelis
- `state`.`search`: value a pasar al query parameter.
- `state`.`searchResult` para los resultados de búsqueda.
- `search-input` input html para introducir la búsqueda.
- `search-btn` button html para ejecutar la búsqueda.

#### Tasks on `App` component

- [x] Add a `state`.`search` with default value of `''`
- [x] Connect state variable `search` with input `search-input` as a controlled component
- [x] Call the API after `click` on `search-btn` and pass the `state`.`search` to the API call

---

## 2. Búsqueda de pelis paginada

Si hacemos clic en las flechas `<` `>` mostraremos los resultados de la página anterior y siguiente respectivamente.

- El API de OMDB acepta un query parameter `page`
- A la variable de `state` la llamaremos `searchPage`

#### Tasks on `App` component

- [x] Add a state variable `searchPage` with a default value of `1`
- [x] Connect state variable `searchPage` with the navigation arrow `<`. Handle the change with the method `goBeforePage`
- [x] Connect state variable `searchPage` with the navigation arrow `>`. Handle the change with the method `goNextPage`
- [] Check `searchPage` cannot be lower than 1
- [] Call the API after `click` the navigation arrows `<` and `>`

---

## 3. Testing de componentes

- [] App renders no results yet
- [] App renders search results
- [] App renders `search-input`
- [] App does not render arrows for navigation when no results
- [] App renders left arrow as disabled when page is 1
- [] App renders right arrow as disabled when page is $last
- [] App renders results after clicking `search-btn`
- [] App renders results after hiting `Enter` key

#### Tasks

- [] bla

---

## 4. Crear custom components

#### Tasks

- [] crear custom component `SearchInput`
- [] crear custom component `SearchNoResults`
- [] crear custom component `SearchNavPage`
- [] crear custom component `List`
- [] crear custom component `Card`

---

## 5. Refactor caching

#### Tasks

- [] [REFACTOR] cache `search` combined with `searchPage` on a new state variable `searchesMap` and avoid the need for recalling the API every time
