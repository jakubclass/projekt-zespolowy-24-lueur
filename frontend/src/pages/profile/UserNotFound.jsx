import React from 'react';

export const UserNotFound = (props) => {
  return (
    <p className='w-full mx-5 text-center block mt-[35vh] bg-[rgb(28,28,37)] rounded-xl h-fit py-6 text-slate-300'>
      {props.message}
    </p>
  );
};