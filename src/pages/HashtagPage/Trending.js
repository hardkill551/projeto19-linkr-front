import { TrendingContainer } from "./style";
import React from "react";
import axios from "axios";
import LiHashtags from "./LiHashtags";

export default function Trending() {
  const [trends, setTrends] = React.useState([""]);
  const { REACT_APP_API_URL } = process.env;

  React.useEffect(() => {
    const request = axios.get(`${REACT_APP_API_URL}/trending`);
    request.then((response) => {
      setTrends(response.data);
    });
    request.catch((error) => {
      alert(error.response.data.message);
    });
  }, []);

  return (
    <TrendingContainer>
      <h2>trending</h2>
      <ul>
        {trends.map((tag) => (
          <LiHashtags key={tag.id} id={tag.id} tag={tag.tag} />
        ))}
      </ul>
    </TrendingContainer>
  );
}
