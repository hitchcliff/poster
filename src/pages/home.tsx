import { useState } from "react";
import Button from "../components/Button";
import CreateFeed from "../components/CreateFeed";
import Feeds from "../components/Feeds";
import FriendSuggestions from "../components/FriendSuggestions";
import InfoBar from "../components/InfoBar";
import Loader from "../components/Loader";
import PrivateRoute from "../components/Route/PrivateRoute";
import SearchBar from "../components/SearchBar";
import Trendings from "../components/Trendings";
import { usePaginatedPostQuery, usePostsQuery } from "../gen/graphql";

const Home = () => {
  const [limit, setLimit] = useState<number>(3);
  const [{ data: fetchPosts, fetching }] = usePaginatedPostQuery({
    variables: {
      options: {
        offset: 0,
        limit,
      },
    },
  });

  if (!fetchPosts?.paginatedPosts) return <Loader />;

  return (
    <div className="relative bg-light-mode dark:bg-dark-mode flex flex-row min-h-screen gap-7">
      <div className="relative skeleton">
        <div className="opacity-0">
          <InfoBar />
        </div>
        <div className="fixed top-0 left-0 h-full">
          <InfoBar />
        </div>
      </div>
      <div className="relative py-7 w-full flex flex-col gap-7">
        <CreateFeed />
        {fetchPosts?.paginatedPosts.map((post, idx) => (
          <Feeds
            key={idx}
            postDetails={post.postDetails}
            poster={post.poster}
          />
        ))}
        <div className="text-center">
          <Button
            isSubmitting={fetching}
            onClick={() => {
              setLimit((prev) => prev + 5);
            }}
          >
            Load More
          </Button>
        </div>
      </div>
      <div className="relative py-7 pr-7 w-1/2">
        <div className="flex flex-col gap-7">
          <SearchBar />
          <FriendSuggestions />
          <Trendings />
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute(Home, { ssr: true });
