
import { GetServerSideProps } from "next";
import AlbumList from "../../components/spotify/AlbumList";
import Heading from "../../components/spotify/Heading"
import PlaylistList from "../../components/spotify/PlaylistList";
import { customGet } from "../../utils/spotify/customGet";
import { getGreeting } from "../../utils/spotify/getGreeting";
import SpotifyWebApi from "spotify-web-api-js";
import SpotifyPlayer from "../../components/spotify/Player";
import Profile from "../../components/spotify/Profile";

export default function Home({ nowPlaying, user }) {
   console.log(user);

  return (
    <div className="w-full p-4">
      <h1 className="mb-5 text-3xl font-bold">Good {getGreeting()}</h1>
      <Heading text="Player" className="mt-10" />
      <Profile profile={user}/>
      <SpotifyPlayer playing={nowPlaying}/>
   
      {/* <AlbumList albums={newReleases?.albums.items} />

      <Heading text={featuredPlaylists?.message} className="mt-16" />
      <PlaylistList playlists={featuredPlaylists?.playlists.items} /> */}
      
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
   console.log("cont")

   const nowPlaying = await customGet(
      "https://api.spotify.com/v1/me/player/currently-playing",
      ctx   
   );

   const user = await customGet(
      "https://api.spotify.com/v1/me",
      ctx
   );


  return { props: { nowPlaying, user } };
};