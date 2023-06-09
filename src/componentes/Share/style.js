import styled from "styled-components"

export const Container = styled.div`
width: 100vw;
height: 100vh;
background: rgba(255, 255, 255, 0.9);
display: flex;
align-items: center;
justify-content: center;
position: fixed;
top: 0px;
left: 0px;
z-index: 1000;
`
export const Text = styled.h1`
font-family: 'Lato';
font-style: normal;
font-weight: 300;
font-size: 48px;
line-height: 41px;
color: #FFFFFF;
width: 70%;
text-align: center;
padding: 0px !important;


`
export const TableContainer= styled.div`
width: 597px;
height: 232px;
background: #333333;
border-radius: 20px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: end;
button:first-child:hover{
background-color:#1555FF;
}
button:nth-child(2):hover{
background-color:#EEEEEE;
}
`
export const Button = styled.button`
width: 134px;
height: 37px;
background: ${(p) => p.backcolor};
color: ${(p) => p.letterColor};
border: none;
margin:10px;
border-radius:10px;
cursor: pointer;

`
export const ButtonContainer = styled.div`
height:40%;
display: flex;
margin:20px;


`