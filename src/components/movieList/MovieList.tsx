import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";


export const MovieList: FC = () => {
  const { movies, status, error, query } = useSelector(
    (state: RootState) => state.search
  );

  if (status === "loading") {
    return <div className="text-center p-4">Загрузка...</div>;
  }

  if (status === "error") {
    return <div className="text-center p-4 text-red-600">{error}</div>;
  }

  if (movies.length === 0 && query) {
    return (
      <div className="text-center p-4">
        {" "}
        Не найдено фильмов по запросу '{query}'
      </div>
    );
  }

  return (
    <div>
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded shadow p-4 flex flex-col items-center"
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover rounded"
            />
          ) : (
            <div className="w-full h-48 bg-gray-400 flex items-center justify-center rounded">
              Постер отсутствует
            </div>
          )}
          <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
          <p className="text-gray-600">{movie.release_date.split('-'[0])}</p>
          <p className="text-yellow-400">{movie.vote_average.toFixed(1)}</p>
      </div>
      ))}
    </div>
  );
};

