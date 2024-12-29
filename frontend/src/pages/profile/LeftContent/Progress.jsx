import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const Progress = () => {
    const { isLoading, data: userProfile } = useQuery({ queryKey: ['userProfile'] });
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (userProfile) {
        let newProgress = 0;
        for (const [key, value] of Object.entries(userProfile)) {
          if (['profileImg', 'coverImg', 'bio', 'link'].includes(key) && value) {
            newProgress += 25;
          }
        }
        setProgress(newProgress);
      }
    }, [userProfile]);

    if (isLoading) {
      return <div className='skeleton rounded-xl w-full h-[100px]'></div>;
    }

    return (
      <div className='bg-[rgb(28,28,37)] p-6 montserrat-my rounded-xl'>
        <p className='text-slate-300'>Completed profile</p>
        <div className='flex items-center gap-10 mt-6 w-full'>
          <progress className='progress progress-accent w-full' value={progress} max='100'></progress>
          <p className='text-slate-300'>{progress}%</p>
        </div>
      </div>
    );
};

export default Progress;
