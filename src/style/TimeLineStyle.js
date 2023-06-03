import styled from "styled-components"

export const TimelineContainer = styled.div`
    background-color: #4D4D4D;
    width: 100%;
    min-height: 100vh;
    
    h1{
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
        padding-top: 70px;
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
    margin-right: auto;

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
