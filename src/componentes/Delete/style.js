import styled from "styled-components"

export const DeleteContainer = styled.div`
width: 100vw;
height: 100vh;
background: rgba(255, 255, 255, 0.9);
display: flex;
align-items: center;
justify-content: center;
position:fixed;
top:0px;
left:0px;
z-index: 2;
h1{
    padding:0px !important;
    font-size:34px !important;
}
`
export const TextDelete = styled.h1`
font-family: 'Lato';
font-style: normal;
font-weight: 700;
line-height: 41px;
text-align: center;
color: #FFFFFF;
width: 338px;
height: 82px;

`
export const TabDelete = styled.div`
width: 597px;
height: 262px;
background: #333333;
border-radius: 50px;
display: flex;
justify-content: space-around;
flex-direction: column;
align-items: center;
button:first-child:hover{
background-color:#1555FF;
}
button:nth-child(2):hover{
background-color:#EEEEEE;
}
`
export const ButtonDelete = styled.button`
width: 134px;
height: 37px;
background: ${(p) => p.backcolor};
color: ${(p) => p.letterColor};
border: none;
margin:10px;
border-radius:10px;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
font-size:15px;
svg{
    height:35px;
}

`
