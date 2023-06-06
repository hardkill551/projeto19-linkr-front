import { useContext, useEffect, useState } from "react";
import Header from "../componentes/Header";
import styled from "styled-components";
import { ContentContainer, Loading, Posts, TimelineContainer } from "../style/TimeLineStyle";
import { UserContext } from "../ContextAPI/ContextUser";
import { LogoutContext } from "../ContextAPI/ContextLogout";
import Post from "../componentes/Post";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import Trending from "../componentes/Trending";

export default function HashtagPage() {

    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState(null);
    const { userInfo, setUserInfo } = useContext(UserContext)
    const { logoutBox, setLogoutBox } = useContext(LogoutContext)
    const navigate = useNavigate();
    const { hashtag } = useParams();

    useEffect(() => {
        if (token) {
            axios.post(process.env.REACT_APP_API_URL + "/token", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                setUserInfo({ ...userInfo, name: res.data.name, email: res.data.email, picture: res.data.picture, token: res.data.token })
            }).catch(err => {
                localStorage.clear();
                navigate("/")
            })
        }
        else {
            navigate("/")
        }

        axios.get(process.env.REACT_APP_API_URL + "/hashtag/" + hashtag,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => console.log(err))
    }, [hashtag]);


    if (!posts) {
        return (
            <><Header />
                <TimelineContainer onClick={() => setLogoutBox(false)}>
                    <Loading>
                        <h2 data-test="message">Loading</h2>
                        <div><ThreeDots
                            height="10"
                            width="80"
                            radius="9"
                            color="#ffffff"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible="true"
                        /></div>
                    </Loading>
                </TimelineContainer></>
        )
    }

    return (
        <><Header /><TimelineContainer onClick={() => setLogoutBox(false)}>
            <ContentContainer>
                <h1 data-test="hashtag-title"># {hashtag}</h1>
                <Posts posts={posts}>
                    {posts.map(p => <Post key={p.id} like_count={p.like_count} message={p.message} name={p.name} picture={p.picture} link={p.link} linkTitle={p.linkTitle} linkImage={p.linkImage} postId={p.id} linkDescription={p.linkDescription} id={p.userId} nameUser={userInfo.name} />)}
                </Posts>
            </ContentContainer>
            <Trending />
        </TimelineContainer></>
    )
}