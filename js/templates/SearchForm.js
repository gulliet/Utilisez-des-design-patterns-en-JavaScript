class Search {
    constructor(Movies) {
        this.Movies = Movies
    }

    search(query) {
        return this.filterMovies(query)
    }
}


class MovieNameSearch extends Search {
    constructor(Movies) {
        super(Movies)
    }

    filterMovies(query) {
        return this.Movies.filter(Movie =>
            Movie.title.toLowerCase().includes(query.toLowerCase())
        )
    }
}

class ActorNameSearch extends Search {
    constructor(Movies) {
        super(Movies)
    }

    filterMovies(query) {
        return this.Movies.filter(Movie =>
            Movie.actor.toLowerCase().includes(query.toLowerCase())
        )
    }
}


class SearchForm {
    constructor(Movies) {
        this.Movies = Movies
        this.isSearchingByActor = false

        this.MovieNameSearch = new MovieNameSearch(Movies)
        this.ActorNameSearch = new ActorNameSearch(Movies)

        this.$wrapper = document.createElement('div')
        this.$searchFormWrapper = document.querySelector('.search-form-wrapper')
        this.$moviesWrapper = document.querySelector('.movies-wrapper')
    }

    search(query) {
        let result = null
        
        if (this.isSearchingByActor) {
            result = this.ActorNameSearch.search(query)
        } else {
            result = this.MovieNameSearch.search(query)
        }

        this.clearMoviesWrapper()
        
        result.forEach(Movie => {
            const Template = new MovieCard(Movie)
            this.$moviesWrapper.appendChild(Template.createMovieCard())
        })
    }

    clearMoviesWrapper() {
        this.$moviesWrapper.innerHTML = ""
    }

    onSearch() {
        this.$wrapper
            .querySelector('form')
            .addEventListener('keyup', e => {
                const query = e.target.value

                if (query.length >= 3) {
                    this.search(query)
                } else if (query.length === 0) {
                    console.log("===")
                    console.log("reboot")
                    console.log("===")
                }
            })
    }

    onChangeSearch() {
        this.$wrapper
            .querySelector('.search-checkbox')
            .addEventListener('change', e => {
                this.isSearchingByActor = e.target.checked

                console.log(this.isSearchingByActor)
            })
    }

    render() {
        const searchForm = `
            <form action="#" method="POST">
                <div class="search-input">
                    <label for="search">Rechercher : </label> 
                    <input id="search" type="text">
                </div>
                <div class="search-checkbox">
                    <label for="actor">Rechercher par acteur</label>
                    <input id="actor" type="checkbox" />
                </div>
            </form>
        `

        this.$wrapper.innerHTML = searchForm

        this.onSearch()
        this.onChangeSearch()

        this.$searchFormWrapper.appendChild(this.$wrapper)
    }
}