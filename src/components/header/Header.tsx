import { FC } from "react";

export const Header: FC = () => {
   return(
      <header className="p-4  bg-gradient-to-r from-red-800 to-blue-500 ">
         <h1 className="text-2xl font-bold text-white text-center">Movie Search</h1>
      </header>
   );
};