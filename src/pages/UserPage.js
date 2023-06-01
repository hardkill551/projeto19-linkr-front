import Header from "../componentes/Header";
import styled from "styled-components";
import Post from "../componentes/Post";
import { ContentContainer, ProfilePicture, TimelineContainer } from "../style/TimeLineStyle";
import { useState } from "react";

export default function UserPage() {
    const [posts, setPosts] = useState(null);
  

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