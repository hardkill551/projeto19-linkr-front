export const DeleteContainer = styled.div`
width: 100vw;
height: 100vh;
background: rgba(255, 255, 255, 0.9);
display: flex;
align-items: center;
justify-content: center;
`
export const TextDelete = styled.h1`
font-family: 'Lato';
font-style: normal;
font-weight: 700;
font-size: 34px;
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

`
export const ButtonDelete = styled.button`
width: 134px;
height: 37px;
background: ${(p) => p.backcolor};
color: ${(p) => p.letterColor};
border: none;
margin:10px;
border-radius:10px;
`
