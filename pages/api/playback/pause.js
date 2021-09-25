import { customPut } from '../../../utils/spotify/customPut';

export default async (req, res) => {
  try {
    const resp = await customPut("https://api.spotify.com/v1/me/player/pause", {
      req,
      res,
    });
    console.log(resp);
    res.status(200).json({ message: "Pause Successful" });
  } catch (err) {
    console.log(err.message);
  }
};
