import styled from "styled-components"
import { ClipLoader } from "react-spinners"

export default function LoadingPosts (){

    return(<>
    <LoadingContainer>
    <ClipLoader color="#a9abab" />
        <h2>Loading more posts...</h2>
        
    </LoadingContainer>
    </>)
}



const LoadingContainer = styled.div`
width: 100%;
display:flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
color: white;
h2 {
    font-family: 'Oswald';
    font-weight: 400;
    font-size: 15px;
    line-height: 36px;
    color: rgb(183, 183, 183);
    margin-bottom: 5px;
    margin-top:5px;
}`