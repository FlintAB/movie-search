import { FC } from "react";

type TErrorProps = {
   message: string | null;
}

export const Error: FC<TErrorProps> = ({message}) => {
   return (
      <div className="text-center p-4">
         <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-lg">
            {message || 'Неизвестная ошибка'} 
         </div>
      </div>
   )
};
