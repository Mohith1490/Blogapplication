import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import {STARTUP_QUERY} from '../../sanity/lib/queries'
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;
  const params = {search: query || null};
  const {data:posts} = await sanityFetch({query: STARTUP_QUERY,params})

  return (
    <div >
      <section className="pink_container" >
        <h1 className="heading">Pitch your startup <br /> Connect with founders</h1>
        <p className="sub-heading !max-w-3xl" >
          Submit ideas, Vote on pitches and Get noticed in virtual competitions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container" >
        <p className="text-3xl font-semibold" >
          {query ? `Search result for ${query}` : 'All startups'}
        </p>
        <ul className="mt-7 card_grid" >
          {
            posts?.length > 0 ? (
              posts.map((post: StartupTypeCard) => {
               return <StartupCard key={post?._id} post={post} />
              })
            ) : (
              <p>No startup found</p>
            )
          }
        </ul>
      </section>
      <SanityLive/> 
    </div>
  );
}
