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

  if (!movies || movies.length === 0 && query) {
    return (
      <div className="text-center p-4">
        {" "}
        Не найдено фильмов по запросу '{query}'
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="bg-white rounded shadow p-4 flex flex-col items-center"
        >
          {movie.Poster !== 'N/A' ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-48 object-cover rounded"
            />
          ) : (
            <div className="w-full h-48 bg-gray-400 flex items-center justify-center rounded">
              Постер отсутствует
            </div>
          )}
          <h3 className="mt-2 text-lg font-semibold">{movie.Title}</h3>
          <p className="text-gray-600">{movie.Year || 'N/A'}</p>
      </div>
      ))}
    </div>
  );
};

