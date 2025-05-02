import React, { FC, useState } from "react";
import { searchMovies } from "../../services/slices/searchSlice";
import { useAppDispatch } from "../../services/store";




export const SearchForm: FC = () => {
   const [value, setValue] = useState('');
   const dispatch = useAppDispatch();

   function handleSubmit (e: React.FormEvent) {
      e.preventDefault();
      if (value.trim()) {
         dispatch(searchMovies(value))
      }
   };
   function handleChange (e: React.ChangeEvent<HTMLInputElement>){
      setValue(e.target.value);
   }

   return (
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 max-w-md mx-auto">
      <input name="searchFilmField" type="text" placeholder="Введите название фильма" value={value} onChange={handleChange} className="flex-1 p-2 rounded border border-gray-500 focus:outline focus:border-blue-800"/>
      <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-600">Search</button>
      </form>
   );
};