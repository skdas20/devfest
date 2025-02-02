import { Wrapper } from '@frontend/components/layout/wrapper';
import { getLeaderBoard } from '@frontend/queries/leaderboard';
import Seo from '@frontend/components/seo/seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Index(props: {
  leaderBoard: { id: string; name: string; score: number }[];
}) {
  const { leaderBoard } = props;
  const router = useRouter();

  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to filter leaderboard based on the search query
  const filteredLeaderboard = leaderBoard.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Wrapper>
      <Seo
        title="Leaderboard"
        description="Contribute code, rank on the leaderboard and win awesome SWAG."
      />
      <h1 className="mb-10 text-center font-inter mx-auto max-w-2xl font-semibold text-[100px] md:text-42 xs:max-w-[246px]">
        Leaderboard
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <div className="flex flex-col w-full max-w-[800px] mx-auto gap-2.5">
          <div className="grid grid-cols-[100px,1fr,100px] rounded-[12px] bg-chatGrad h-[72px] px-[32px]">
            <div className="text-left flex items-center">PLACE</div>
            <div className="flex items-center">NAME</div>
            <div className="flex items-center">SCORE</div>
          </div>

          {/* Render filtered leaderboard */}
          {filteredLeaderboard.map((p, index) => (
            <div
              onClick={() => router.push(`/leaderboard/${p.id}`)}
              key={p.id}
              className="cursor-pointer grid grid-cols-[100px,1fr,100px] bg-[#191919] hover:bg-[#333333] rounded-[12px] h-[72px] px-[32px]"
            >
              <div className="text-left flex items-center">{index + 1}</div>
              <div className="flex items-center">
                <Link href={`/leaderboard/${p.id}`}>{p.name}</Link>
              </div>
              <div className="flex items-center">{p.score}</div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const leaderBoard = await getLeaderBoard();
  return {
    props: {
      leaderBoard: leaderBoard,
    },
    revalidate: 120,
  };
};
