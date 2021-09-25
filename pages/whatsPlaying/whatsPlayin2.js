import utilStyles from '../../styles/utils.module.css';
import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js'
import Layout from '../../components/layout'
import SpotifyPlayer from '../../components/spotify/Player';
import Profile from '../../components/spotify/Profile';
// import useSWR from 'swr';
import { useSession, signIn, signOut } from "next-auth/client"
import { Router, useRouter } from 'next/router'


const spotifyApi = new SpotifyWebApi();

function App() {
  const params = getHashParams();
  const [token, setToken] = React.useState(params.access_token || "");
  const [getMyTopArtists, setGetMyTopArtists] = React.useState([]);
  const [user, setUser] = React.useState({});
  const { data: session } = useSession()
  const router = useRouter()

  function getHashParams() {
    var hashParams = {};
    if (process.browser) {
      var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
    }
    return hashParams;
  }
  
         
  
  let getTopArtists = () => {
      spotifyApi.getMyTopTracks()
         .then(response => {
         console.log(response)
         });
  }
  
//   console.log(session)
  if (token) {
   spotifyApi.setAccessToken(token);
   console.log("token set")
 }
   
   if(session)
      return (
         <Layout>
            <div>Signed in as {session.user.email}</div>
            <button onClick={signOut}>Sign out</button>
         </Layout>)
   else{
      if(process.browser)
         router.replace('/whatsPlaying/login')
      return
   }

   // return (
   //    <Layout>
   //       <div>
   //          <a href='http://localhost:8888' > Login to Spotify </a>
   //          <Profile spotifyApi={spotifyApi} />
   //          <SpotifyPlayer spotifyApi={spotifyApi} />
   //       </div>
   //    </Layout>
   // );
}

export default App;
