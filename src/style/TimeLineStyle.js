import styled from "styled-components"

export const TimelineContainer = styled.div`
    background-color: #4D4D4D;
    width: 100%;
    min-height: 100vh;
    display:flex;
    justify-content: center;
    gap:25px;
    
    h1{
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
        padding-top: 70px;
        padding-bottom:43px;
    }

    @media (max-width:611px){
        h1{
            padding-left:10px;
        }
    }
`
export const ContentContainer = styled.div`
    width: 611px;
    height: 100%;
    margin-left: auto;

    @media(max-width:800px){
    margin-right: auto;
  }
    @media (max-width:611px){
        width:100%;
    }
`

export const ProfilePicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    background-color: #EFEFEF;

    @media (max-width:415px){
        display:none;
    }
`
export const Posts = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p{
        margin-top:30px;
        display:${(props) => (props.posts.length !== 0 ? "none" : "flex")};
        font-family: 'Oswald';
        font-weight: 400;
        font-size: 24px;
        line-height: 36px;
        color: #ffffff;
    }
`

export const Loading = styled.div`
width: 100%;
height: 100vh;
display:flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
h2 {
    font-family: 'Oswald';
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    color: #ffffff;
    margin-bottom: 5px;
    margin-top:5px;
}
`