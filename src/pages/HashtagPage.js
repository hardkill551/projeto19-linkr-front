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
import InfiniteScroll from "react-infinite-scroller";
import LoadingPosts from "../componentes/LoadingPage";

export default function HashtagPage() {

    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState(null);
    const { userInfo, setUserInfo } = useContext(UserContext)
    const { logoutBox, setLogoutBox } = useContext(LogoutContext)
    const navigate = useNavigate();
    const { hashtag } = useParams();
    const [following, setFollowing] = useState([]);
    const [ct, setCt] = useState(0)
    const [loadCount, setLoadCount] = useState(10)
    const [quantity, setQuantity] = useState(true)
    useEffect(() => {
        if (token) {
            axios.post(process.env.REACT_APP_API_URL + "/token", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                setUserInfo({ ...userInfo,id:res.data.id, name: res.data.name, email: res.data.email, picture: res.data.picture, token: res.data.token })
            }).catch(err => {
                localStorage.clear();
                navigate("/")
            })
        }
        else {
            navigate("/")
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios.get(process.env.REACT_APP_API_URL + "/followers", config)
            .then(res => {
                
                setFollowing(res.data);
            }
            ).catch(err => {
                console.log(err.message);
            });

        axios.get(process.env.REACT_APP_API_URL + "/hashtag/" + hashtag + "/0",
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                console.log(response.data)
                setPosts(response.data);
            })
            .catch(err => console.log(err))
    }, [hashtag, ct]);

    function loadMore(){

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        axios.get(process.env.REACT_APP_API_URL + "/followers", config)
            .then(res => {
                setFollowing(res.data);
            }
            ).catch(err => {
                console.log(err.message);
            });

        axios.get(process.env.REACT_APP_API_URL + "/hashtag/" + hashtag +"/" + String(loadCount),
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                const moreTenPost = []
                for(let i = 0; i<posts.length;i++){
                    moreTenPost.push(posts[i])
                }
                for(let i = 0; i<response.data.length;i++){
                    moreTenPost.push(response.data[i])
                }
                if(moreTenPost[moreTenPost.length-1].id===posts[posts.length-1].id) return setQuantity(false)
                setPosts(moreTenPost)
                setLoadCount(loadCount+10)

            })
            .catch(err => console.log(err))
            
    }
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
                <InfiniteScroll
                        pageStart={0}
                        loadMore={()=>loadMore()}
                        hasMore={quantity}
                        loader={<LoadingPosts/>}
                        >
                        
                <Posts posts={posts}>
                    {posts.map((p,i) => <Post key={p.id} like_count={p.like_count} message={p.message} name={p.name} picture={p.picture} link={p.link} linkTitle={p.linkTitle} linkImage={p.linkImage} postId={p.id} linkDescription={p.linkDescription} id={p.userId} nameUser={userInfo.name} liked_by={p.liked_by} commentsCount={p.commentsCount}
                        commentsData={p.commentsData}
                        following={following}
                        userId={p.userId}
                        ct={ct}
                        setCt={setCt}
                        i={i}
                        repost={p.repost}
                        repostBy={p.repostBy}
                        loadCount={20} />)}
                </Posts>
                </InfiniteScroll>
            </ContentContainer>
            <Trending ct={ct} />
        </TimelineContainer></>
    )
}