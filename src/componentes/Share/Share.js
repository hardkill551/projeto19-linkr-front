import { useEffect, useState,useNavigate } from "react"
import axios from "axios";
import { Button, ButtonContainer, Container, TableContainer, Text } from "./style";
import { useContext } from "react";
import { UserContext } from "../../ContextAPI/ContextUser";

export default function Share({setShowShare, postId, setCt, ct}) {
     const token = localStorage.getItem("token");
        function SharePoster(){
            axios.post(process.env.REACT_APP_API_URL+"/share", {postId},{headers:{
                Authorization: `Bearer ${token}`
                }
            }).then(res=>{   
                setShowShare(false)
                setCt(ct+1)
                }).catch(err=>{
                    alert(err.response.data)
                })
                 

           setShowShare(false)
        }

    return(
        <Container >
            <TableContainer>
                
                <Text>
                Do you want to re-post this link?
                </Text>
                
               
                <ButtonContainer>
                <Button data-test="cancel" backcolor={"#1877F2"}
                 letterColor={"#FFFFFF"}
                  onClick={()=>setShowShare(false)}
                  >No, cancel
                  </Button>
                <Button
                 backcolor ={"#FFFFFF"}
                 letterColor={"#1877F2"}
                 onClick={SharePoster}
                 data-test="confirm"
                 >
                    Yes, share! 
                 </Button>
                </ButtonContainer>
                
            </TableContainer>

            
        </Container>
    )
}