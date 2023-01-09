import CreateFeed from "../components/CreateFeed";
import Feeds from "../components/Feeds";
import FriendSuggestions from "../components/FriendSuggestions";
import InfoBar from "../components/InfoBar";
import PrivateRoute from "../components/Route/PrivateRoute";
import SearchBar from "../components/SearchBar";
import Trendings from "../components/Trendings";
import { usePostsQuery } from "../gen/graphql";

const Home = () => {
  const [{ data: fetchPosts, fetching }] = usePostsQuery();

  return (
    <div className="relative bg-light flex flex-row min-h-screen gap-7">
      <div className="relative">
        <div className="opacity-0">
          <InfoBar />
        </div>
        <div className="fixed top-0 left-0 h-full">
          <InfoBar />
        </div>
      </div>
      <div className="relative py-7 w-full flex flex-col gap-7">
        <CreateFeed />
        {fetchPosts?.posts.map((post) => (
          <Feeds key={post.id} post={post} />
        ))}
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
