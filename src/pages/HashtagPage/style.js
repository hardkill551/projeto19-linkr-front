import styled from "styled-components";

export const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  height: 406px;
  width: 301px;
  background: #171717;
  color: #ffffff;
  border-radius: 16px;
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
    row-gap: 5px;
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
`;
