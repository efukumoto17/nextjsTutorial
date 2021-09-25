import axios from 'axios';
import utilStyles from '../../styles/utils.module.css';
import React from 'react';
import { useRouter } from "next/router";


export default function SpotifyPlayer({  playing }) {

   const [nowPlaying, setNowPlaying] = React.useState({});
   const [isPlaying, setIsPlaying] = React.useState(false);
   const [artistTopTracks, setArtistTopTracks] = React.useState([]);
   const [isError, setIsError] = React.useState(false);


   React.useEffect(() => {
      const fetchPlayback = async () => {
        try {
            const res = await axios.get("/api/playback", {
               headers: {
               "Content-Type": "application/json",
               },
            });
            const data = res.data;
            data?.success ? setIsError(false) : setIsError(true);
            console.log(res.data);
            setNowPlaying(res.data?.playback?.item);
            setIsPlaying(res.data?.playback?.is_playing);
            const artistId = res.data?.playback?.item?.artists[0]?.id;
            const topTracks = await axios.get(`/api/artistsTopSongs/${artistId}`, {
               headers: {
                  "Content-Type": "application/json",
               },
            });
            console.log(topTracks);
            setArtistTopTracks(topTracks.data?.tracks.tracks);
         } catch (err) {
            console.log(err.message);
         }
      };
      
      fetchPlayback();
   }, []);
   console.log(nowPlaying)

   const handlePlayback = () => {
      isPlaying ? pausePlayback() : playPlayback();
      setIsPlaying(!isPlaying);
   };

   const pausePlayback = () => {
      if (!isError && nowPlaying) {
         axios.put("/api/playback/pause").then(() => console.log("paused"));
      }
   };

   const playPlayback = () => {
   if (!isError && nowPlaying) {
      axios.put("/api/playback/play").then(() => console.log("played"));
   }
   };

   let skipToNext = () => {
      if (!isError && nowPlaying) {
         axios.put("/api/playback/skip").then((resp) => console.log( resp));
      }
   }
   let skipToPrevious = () => {
      if (!isError && nowPlaying) {
         axios.put("/api/playback/previous").then(() => console.log("previous"));
      }
   }

   return (
      <div className={utilStyles.playerBackground}>
         <div>
            <div>
               <h3>====Now Playing====</h3>
            </div>
            {console.log(artistTopTracks)}
            <div>
               <h2>{nowPlaying.name || ""}</h2> 
               <h3>{nowPlaying.name ? nowPlaying.artists[0]?.name : ""} </h3>
               <h3 className={utilStyles.lightText}>{nowPlaying.album?.name}</h3>
            </div>
            <div>
               <img src={ nowPlaying.album?.images[0].url} style={{ height: 150 }}/>
            </div>
            {nowPlaying.name &&
               <div>
                  <button className={utilStyles.playerButton} onClick={() => skipToPrevious()}>
                     Previous
                  </button>
                  {isPlaying ? 
                  <button className={utilStyles.playerButton} onClick={() => handlePlayback()}>
                     Pause
                  </button> :
                  <button className={utilStyles.playerButton} onClick={() => handlePlayback()}>
                     Play
                  </button>}
                  <button className={utilStyles.playerButton} onClick={() => skipToNext()}>
                     Next
                  </button>
               </div>
            }
            {artistTopTracks?.length > 0 &&
               <div>
                  <h2>Artist Top Tracks</h2>
                  <ul>
                     {artistTopTracks.map(track => {
                        console.log(track)
                        return(
                        <li key={track.id}>
                           {track.name}
                        </li>)
                     })}
                  </ul>
               </div>
            }
         </div>
      </div>
   );

}
