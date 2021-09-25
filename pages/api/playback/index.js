import { NextApiRequest, NextApiResponse } from "next";
import { customGet } from "../../../utils/spotify/customGet";

export default async (req, res) => {
  try {
    const playback = await customGet(
      "https://api.spotify.com/v1/me/player?market=from_token",
      {
        req,
        res,
      }
    );
    res.status(200).send({ success: true, playback });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false });
  }
};
