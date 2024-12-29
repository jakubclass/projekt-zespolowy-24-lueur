import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CommunitiesHeader from './CommunitiesHeader';
import { SingleCommunityCard } from './SingleCommunityCard';

const CommunitiesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const { data: authUser } = useQuery({ queryKey: ['authUser'] });

    const { data: communities, isLoading, isError, error } = useQuery({
        queryKey: ['communities'],
        queryFn: async () => {
            const res = await fetch('/api/communities');
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.statusText}`);
            }
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            console.log("ALL_COMMUNITIES: ", data);
            return data;
        },
        onError: (error) => {
            toast.error(error.message)
            console.error(error.message);
        }
    });

    if (isError) {
        return (
            <p className='w-full mx-5 text-center block mt-[35vh] bg-[rgb(28,28,37)] rounded-xl h-fit py-6 text-slate-300'>
                Error: {error.message}
            </p>
        );
    }

    const filteredCommunities = communities?.filter(community =>
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderedCommunities = filteredCommunities?.map(community => (
        <SingleCommunityCard key={community._id} {...community} />
    ));

    const ownedCommunities = communities?.filter(community =>
        community.admins.some(admin => admin._id.toString() === authUser?._id?.toString())
    );

    const renderedOwnedCommunities = ownedCommunities?.map(community => (
        <SingleCommunityCard key={community._id} {...community} />
    ));
 
    return (
        <div className='p-10 w-full scroll-smooth h-[89vh] scrollbar-thumb-slate-800 scrollbar-thin scrollbar-track-transparent overflow-y-scroll'>
            <CommunitiesHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            {isLoading ? (
                <span className="loading loading-ring loading-lg block mx-auto mt-[35vh]"></span>
            ) : (
                <>
                    {renderedCommunities.length === 0 ? (
                        <p className='w-full mx-5 text-center block mt-[35vh] bg-[rgb(28,28,37)] rounded-xl h-fit py-6 text-slate-300'>
                            No communities found
                        </p>
                    ) : (
                        <div>
                            {ownedCommunities?.length > 0 && (
                                <div className='mt-16'>
                                    <div className='text-xl tracking-wider'>Your communities</div>
                                    <div className='grid grid-cols-4 gap-4 mt-6'>
                                        {renderedOwnedCommunities}
                                    </div>
                                    <div className='text-xl tracking-wider mt-8'>All communities</div>
                                </div>
                            )}
                            <div className='grid grid-cols-4 gap-4 mt-6'>
                                {renderedCommunities}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CommunitiesPage;
