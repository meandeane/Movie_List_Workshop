import React from 'react';
// import { Formik } from 'formik';
// import exampleMovieData from '../data/exampleMovieData.js';
import movies from '../data/MovieData.js';
import MovieList from './MovieList.jsx';
import Search from './Search.jsx';
import Input from './Input.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
          movies: movies,
          search: '',
          input: '',
          isToggled: false
        };

    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = event.target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
      event.preventDefault();
    }

    handleClick(event) {
      const target = event.target;
      const value = event.target.value;
      const name = target.name;
      if(value === 'Watched') {
        var watchedMovies = movies.filter(movie =>
          movie.isWatched === true
          );
          this.setState({
            movies: watchedMovies
          });
      }else if (value === 'All') {
        this.setState({
          movies: movies
        });
      }
      event.preventDefault();
      console.log(target, value, name);
    }

    handleSearchSubmit(event) {      
      var searchedMovie = movies.filter(movie => 
        movie.title === this.state.search
        );
        if(searchedMovie.length !== 0) {
          this.setState({
            movies: searchedMovie,
            search: ''          
          });
        }else {
          alert('Sorry that movie can\'t be found');
        }
        event.preventDefault();
    }

    handleInputSubmit(event) {
      if(this.state.input !== '') {
        this.state.movies.push({image: null, title: this.state.input, description: '', isWatched: false });
        this.setState({
          input: ''
        });
      }else {
        alert("Please enter a movie you would like to add");
      }
      event.preventDefault();
    }

    handleToggle(event) {
      movies.forEach(movie => {
        if(movie.title === event.target.id) {
          movie.isWatched = !movie.isWatched;
        }
      });
      this.forceUpdate();
      event.preventDefault();
    }
    
    render() {
      return (
        <div className="container">
          <div className="header">
            <h1>Movie List</h1>
          </div>        
        <div className="navbar">
          <div className="inputbar">
            <Input input={this.state.input} handleInputChange={this.handleInputChange} handleInputSubmit={this.handleInputSubmit} />
          </div>
          <div className="searchbar">
            <Search search={this.state.search} handleInputChange={this.handleInputChange} handleSearchSubmit={this.handleSearchSubmit} handleClick={this.handleClick} />
          </div>
        </div>
        <div className="main-content">
          <MovieList movies={this.state.movies} handleToggle={this.handleToggle} />
        </div>
      </div>
      );
    }
}

export default App;