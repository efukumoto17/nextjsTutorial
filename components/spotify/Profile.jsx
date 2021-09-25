import React from "react";



export default function Profile({ user }) {
   console.log(user)
   const [profile, setProfile] = React.useState(user);
   console.log(profile)
   
   return(
      <div>
         <div>
            {/* <img src={profile.images[0].url} style={{ height: 150 }}/> */}
            {/* <h1>{profile.display_name}</h1>
            <h2>{profile.email}</h2> */}
            hello
         </div>
      </div>
   )
}