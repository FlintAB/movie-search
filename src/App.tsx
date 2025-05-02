import './index.css'; 
import { Header } from './components/header/Header';
import { SearchForm } from './components/searchForm/SearchForm';
import {MovieList} from './components/movieList/MovieList'

function App() {
  return (
    <>
    <Header/>
    <SearchForm/>
    <MovieList/>
    </>
  )
}

export default App;
