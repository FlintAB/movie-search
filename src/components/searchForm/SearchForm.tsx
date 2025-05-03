import React, { FC, useEffect, useState } from "react";
import { searchMovies } from "../../services/slices/searchSlice";
import { RootState, useAppDispatch } from "../../services/store";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

export const SearchForm: FC = () => {
   const [query, setQuery] = useState('');
   const debouncedQuery = useDebounce(query, 1000);
   const {status} = useSelector((state: RootState) => state.search)
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (debouncedQuery.trim()) {
         dispatch(searchMovies(debouncedQuery));
      }
   }, [debouncedQuery, dispatch]);

   function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (query.trim()) {
         dispatch(searchMovies(query));
      }
   };

   function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setQuery(e.target.value);
   }

   return (
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 max-w-md mx-auto bg-gray-800 rounded-lg">
      <input name="searchFilmField" type="text" placeholder="Введите название фильма (eng)" value={query} onChange={handleChange} disabled={status === 'loading'} className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"/>
      <button type="submit" disabled={!query.trim() || status === 'loading'} className={`text-white px-4 py-2 rounded ${!query.trim() || status === 'loading' ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:blue-700'}`} >Search</button>
      </form>
   );
};