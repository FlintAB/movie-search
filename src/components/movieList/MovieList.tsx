import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import {motion} from 'framer-motion';


export const MovieList: FC = () => {
  const { movies, status, error, query } = useSelector(
    (state: RootState) => state.search
  );
  console.log('Состояние компонента MovieList:', {movies, status, error, query});

  if (status === "loading") {
    return <div className="text-center p-4 text-red-600">Загрузка...</div>;
  };

  if (status === "error") {
    console.log('Redux error:', error)
    return <div className="text-center p-4 text-red-600">{error}</div>;
  };

  if (!movies || movies.length === 0 && query) {
    return (
      <div className="text-center p-4 text-red-600">
        Не найдено фильмов по запросу '{query}'
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <motion.div
          key={movie.imdbID}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          {movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full rounded-lg shadow-sm bg-gray-200 aspect-[2/3]"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg aspect-[2/3]">
              Постер отсутствует
            </div>
          )}
          <h3 className="mt-2 text-lg font-semibold text-white">{movie.Title}</h3>
          <p className="text-gray-400">{movie.Year || 'N/A'}</p>
      </motion.div>
      ))}
    </div>
  );
};

