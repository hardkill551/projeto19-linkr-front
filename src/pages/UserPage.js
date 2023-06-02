import Header from "../componentes/Header";
import styled from "styled-components";
import Post from "../componentes/Post";
import { ContentContainer, ProfilePicture, TimelineContainer } from "../style/TimeLineStyle";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextAPI/ContextUser";

export default function UserPage() {
    const [posts, setPosts] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
    const {userInfo, setUserInfo} = useContext(UserContext)

        useEffect(()=>{
        if(token){
            axios.post(process.env.REACT_APP_API_URL+"/token", {},{headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(res=>{
                setUserInfo({...userInfo, name:res.data.name, email:res.data.email, picture:res.data.picture, token:res.data.token})
            }).catch(err=>{
                alert(err.response.data)
            })
        }
        else{
            navigate("/")
        }},[])
    return (
        <><Header />
            <TimelineContainer>
                <ContentContainer>
                    <ProfileContainer>
                        <ProfilePicture src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png" alt="profile-picture" />
                        <h1>Juvenal Juvêncio's posts</h1>
                    </ProfileContainer>
                
                    <Post>

                    </Post>
                    <Post>

                    </Post>
                </ContentContainer>
            </TimelineContainer></>
    )
}

const ProfileContainer = styled.div`
    display: flex;
    height: 158px;
    padding-left: 24px;
    align-items: center;
    h1{
        padding: 0px;
    }
    img{
        margin-right: 18px;
        margin-bottom: 5px;
    }
`