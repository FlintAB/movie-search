import { FC } from "react";


export const Loader: FC = () => {
   return (
      <div className="flex justify-center items-center p-4">
         <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin">
         </div>
      </div>
   )
};