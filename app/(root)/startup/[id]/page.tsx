import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import markdown from 'markdown-it'
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import  View  from '../../../../components/View';
import { auth } from '@/auth';

const md = markdown();

export const EXPERIMENTAL_PPR = true;

const page = async ({params} : {params: Promise<{id:string}>}) => {
    const id = (await params).id
    const posts = await client.fetch(STARTUP_BY_ID_QUERY,{id})
    if(!posts) return notFound();
    
    const parseContent = md.render(posts?.pitch || '')
    const session =await auth();
    console.log(session)
  return (
    <>
      <section className='pink_container !min-h-[230px]' >
          <p className='tag' > {formatDate(posts?._createdAt)}</p>
          <h1 className='heading' >{posts.title}</h1>
          <p className='sub-heading !max-w-5xl' > {posts.description} </p>
      </section>
      <section className='section_container' >
        <Image src={posts.image} alt={'picture'} width={1200} height={200} className='w-full h-auto rounded-xl'  />
        <div className='space-y-5 mt-10 max-w-4xl mx-auto' >
            <div className='flex-between gap-5' >
                <Link href={`/user/${posts.author?._id}`} className='flex gap-2 items-center mb-3' >
                <Image src={posts.author?.image} alt='avatar' width={64} height={40} className='rounded-full drop-shadow-lg border '/>
                <div>
                  <p className='text-20-medium' >{posts.author?.name}</p>
                  <p className='text-16-medium !text-black-300' >@{posts.author?.username}</p>
                </div>
                </Link>
                <p className='category-tag' >{posts.category}</p>
            </div>
            <h3 className='text-30-bold' >Pitch Details </h3>
            {
                parseContent ?(
                  <article
                  className='prose max-w-4xl font-work-sans break-all'
                  dangerouslySetInnerHTML={{__html:parseContent}}
                  />
                ):(
                  <p className='no-result' >
                      No details Provided
                  </p>
                )
            }
        </div>
      </section>
      <Suspense fallback={<Skeleton className='view_skeleton'/>} >
            <View id={id} />
      </Suspense>
    </>
  )
}

export default page