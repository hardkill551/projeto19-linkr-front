import Header from "../componentes/Header";
import styled from "styled-components";
import Post from "../componentes/Post";
import { ContentContainer, Posts, ProfilePicture, TimelineContainer } from "../style/TimeLineStyle";
import { useEffect, useState } from "react";
import api from "../axios";
import { useParams } from "react-router-dom";

export default function UserPage() {
    const {id} = useParams();
    
    const [posts, setPosts] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {

        const request = api.get("/posts/"+id,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        request.then(response => { setPosts(response.data) });
        request.catch(err => console.log(err))

  
    }, []);
    console.log(posts)
    if (posts === null) {
        return <>Carregando</>
    }

    return (
        <><Header />
            <TimelineContainer>
                <ContentContainer>
                    <ProfileContainer>
                        <ProfilePicture src={posts[0].picture} alt="profile-picture" />
                        <h1>{posts[0].name}'s posts</h1>
                    </ProfileContainer>
                    {posts.length===0?<p>Este usuario ainda não possui posts</p>:
                    <Posts posts={posts}>
                        {posts.map(p => <Post key={p.id} message={p.message} name={p.name} picture={p.picture} link={p.link} linkTitle={p.linkTitle} linkImage={p.linkImage} linkDescription={p.linkDescription} id={p.id}/>)}
                        <p data-test="message">There are no posts yet</p>
                    </Posts>}
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