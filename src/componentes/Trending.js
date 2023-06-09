import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Trending({ ct }) {
  const [trends, setTrends] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const request = axios.get(`${process.env.REACT_APP_API_URL}/trending`,
      { headers: { Authorization: `Bearer ${token}` } });
    request.then((response) => {
      setTrends(response.data);
    });
    request.catch((error) => {
      console.log(error.response.data);
    });
  }, [ct]);
  return (
    <TrendingContainer data-test="trending">
      <h2>trending</h2>
      <ul>
        {trends.map((h, index) => (
          <li>
            <HashtagLink data-test="hashtag" key={index} to={`/hashtag/${h.hashtag}`}>
              {`# ${h.hashtag}`}
            </HashtagLink>
          </li>
        ))}
      </ul>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  height: 406px;
  width: 301px;
  background: #171717;
  color: #ffffff;
  border-radius: 16px;
  margin-top:177px;
  margin-right: auto;
  h2 {
    padding: 16px;
    height: 61px;
    width: 100%;
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    line-height: 40px;
    border-bottom: 1px solid #484848;
  }
  ul {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    padding-left: 16px;
    padding-top: 22px;
    font-family: "Lato", sans-serif;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    
    li {
      width: fit-content;
      :hover {
        cursor: pointer;
      }
    }
  }

  @media(max-width:800px){
    display:none;
  }
`;
const HashtagLink = styled(Link)`
    text-decoration: none;
    color: #ffffff;
`;
