import { FC } from "react";
import { searchMovies } from "../../services/slices/searchSlice";
import { useAppDispatch } from "../../services/store";

export const Header: FC = () => {
   const dispatch = useAppDispatch();

   const resetSearch = () => {
      dispatch(searchMovies(''));
   };
   
   return(
      <header className="p-4  bg-gradient-to-r from-red-800 to-blue-500 ">
         <h1 className="text-3xl font-extrabold text-white text-center cursor-pointer" onClick={resetSearch}>OMDb movies search</h1>
      </header>
   );
};