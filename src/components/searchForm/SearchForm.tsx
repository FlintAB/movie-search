import React, { FC, useState } from "react";
import { searchMovies } from "../../services/slices/searchSlice";
import { RootState, useAppDispatch } from "../../services/store";
import { useSelector } from "react-redux";




export const SearchForm: FC = () => {
   const [value, setValue] = useState('');
   const {status} = useSelector((state: RootState) => state.search)
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
      <input name="searchFilmField" type="text" placeholder="Введите название фильма" value={value} onChange={handleChange} disabled={status === 'loading'} className="flex-1 p-2 rounded border border-gray-500 focus:outline focus:border-blue-800"/>
      <button type="submit" disabled={!value.trim() || status === 'loading'} className={`text-white px-4 py-2 rounded ${!value.trim() || status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`} >Search</button>
      </form>
   );
};