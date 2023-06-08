import { useEffect, useState } from "react"

import styled from "styled-components"
export default function Share({showShare,setShowShare}) {


        function SharePoster(){
            alert("back sendo construido...")
            useEffect(()=>{
                if(token){
                    axios.post(process.env.REACT_APP_API_URL+"/token", {},{headers:{
                            Authorization: `Bearer ${token}`
                        }
                    }).then(res=>{
                        navigate("/timeline")
                        
                    }).catch(err=>{
                        alert(err.response.data)
                    })
                }
            }, [])
           setShowShare(false)
        }

    return(
        <Container onClick={()=>setShowShare(false)} >
            <TableContainer>
                
                <Text>
                Do you want to re-post this link?
                </Text>
                
               
                <ButtonContainer>
                <Button backcolor={"#1877F2"}
                 letterColor={"#FFFFFF"}
                  onClick={()=>setShowShare(false)}
                  >No, cancel
                  </Button>
                <Button
                 backcolor ={"#FFFFFF"}
                 letterColor={"#1877F2"}
                 onClick={SharePoster}
                 >
                    Yes, share! 
                 </Button>
                </ButtonContainer>
                
            </TableContainer>

            
        </Container>
    )
}



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
