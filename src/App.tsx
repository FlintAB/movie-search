import './index.css'; 
import { Header } from './components/header/Header';
import { SearchForm } from './components/searchForm/SearchForm';
import {MovieList} from './components/movieList/MovieList'

function App() {
  return (
    <div className='min-h-screen bg-gray-900'>
    <Header/>
    <main className='container mx-auto'>
      <SearchForm/>
      <MovieList/>
    </main>
    </div>
  )
}

export default App;
