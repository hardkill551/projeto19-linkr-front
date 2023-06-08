import Header from "../componentes/Header";
import styled from "styled-components";
import Post from "../componentes/Post";
import { ContentContainer, Loading, Posts, ProfilePicture, TimelineContainer } from "../style/TimeLineStyle";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextAPI/ContextUser";
import { LogoutContext } from "../ContextAPI/ContextLogout";
import { ThreeDots } from 'react-loader-spinner'
import Trending from "../componentes/Trending";

export default function UserPage() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [posts, setPosts] = useState(null);
    const token = localStorage.getItem("token");
    const { userInfo, setUserInfo } = useContext(UserContext)
    const { logoutBox, setLogoutBox } = useContext(LogoutContext)
    const [buttonFollow, setButtonFollow] = useState("Follow")
    const [able, setAble] = useState(false);
    const [following, setFollowing] = useState([]);

    useEffect(() => {

        if (token) {
            axios.post(process.env.REACT_APP_API_URL + "/token", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                setUserInfo({ ...userInfo, id:res.data.id, name: res.data.name, email: res.data.email, picture: res.data.picture, token: res.data.token })
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
            .then((res) => {
                setFollowing(res.data);
                if (res.data.length > 0) {
                    const follow = res.data.some(obj => obj.followedId === Number(id))
                    if (follow) setButtonFollow("Unfollow")
                    else setButtonFollow("Follow")
                }
            }).catch(err => {
                console.log(err.message);
            });
        axios.get(process.env.REACT_APP_API_URL + "/posts/" + id,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                setPosts(response.data);
            })
            .catch(err => console.log(err))


    }, [id, posts]);

    function follow() {
        setAble(true)
        const body = { followedId: id }
        const config = { headers: { Authorization: `Bearer ${token}` } }
        axios.post(process.env.REACT_APP_API_URL + "/followers", body, config)
            .then((response) => {
                setAble(false)
                setButtonFollow("Unfollow")
            }).catch(err => {
                setAble(false)
                alert(err.response)
            })
    }

    function unfollow() {
        setAble(true)
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        axios.delete(process.env.REACT_APP_API_URL + "/followers/" + id, config)
            .then((response) => {
                setAble(false)
                setButtonFollow("Follow");
            })
            .catch(err => {
                setAble(false)
                alert(err.response)
            })
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
    if (posts && posts.postsUser.length === 0) {
        return (
            <>
                <Header />
                <TimelineContainer onClick={() => setLogoutBox(false)}>
                    <ContentContainer>
                        <UserContainer>
                            <ProfileContainer>
                                <ProfilePicture src={posts.picture} alt="profile-picture" />
                                <h1>{posts.name}'s posts</h1>
                            </ProfileContainer>
                            {
                                buttonFollow === "Follow" ?
                                    <ButtonFollow data-test="follow-btn" disabled={able} onClick={follow} style={{ display: userInfo.name === posts.name ? "none" : "block" }}>Follow</ButtonFollow> :
                                    <ButtonUnfollow data-test="follow-btn" disabled={able} onClick={unfollow} style={{ display: userInfo.name === posts.name ? "none" : "block" }}>Unfollow</ButtonUnfollow>
                            }
                        </UserContainer>
                        <h1>There are no posts yet</h1>
                    </ContentContainer>
                    <Trending />
                </TimelineContainer>
            </>
        )
    }

    return (
        <><Header />
            <TimelineContainer onClick={() => setLogoutBox(false)}>
                <ContentContainer>
                    <UserContainer>
                        <ProfileContainer>
                            <ProfilePicture src={posts.picture} alt="profile-picture" />
                            <h1>{posts.name}'s posts</h1>
                        </ProfileContainer>
                        {
                            buttonFollow === "Follow" ?
                                <ButtonFollow data-test="follow-btn" disabled={able} onClick={follow} style={{ display: userInfo.name === posts.name ? "none" : "block" }}>{buttonFollow}</ButtonFollow> :
                                <ButtonUnfollow data-test="follow-btn" disabled={able} onClick={unfollow} style={{ display: userInfo.name === posts.name ? "none" : "block" }}>{buttonFollow}</ButtonUnfollow>
                        }
                    </UserContainer>

                    <Posts posts={posts}>
                        {posts.postsUser.map(p => <Post 
                            key={p.id} 
                            message={p.message} 
                            name={posts.name} 
                            picture={p.picture} 
                            link={p.link} 
                            linkTitle={p.linkTitle} 
                            linkImage={p.linkImage} 
                            linkDescription={p.linkDescription} 
                            postId={p.id} 
                            like_count={p.like_count} 
                            nameUser={userInfo.name} 
                            liked_by={p.liked_by}
                            commentsCount={p.commentsCount}
                            commentsData={p.commentsData}
                            following={following}
                            userId={p.userId} />)}
                    </Posts>
                </ContentContainer>
                <Trending />
            </TimelineContainer></>
    )
}


const ProfileContainer = styled.div`
    display: flex;
    height: 177px;
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
const UserContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 930px;
    @media(max-width:930px){
        width: 100vw;
    }
`

const ButtonFollow = styled.button`
    width: 112px;
    height: 31px;
    background: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    border: none;
    cursor: pointer;
    :disabled{
        opacity: 0.7;
        cursor:default;
    }
`

const ButtonUnfollow = styled.button`
    width: 112px;
    height: 31px;
    background: #FFFFFF;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #1877F2;
    border: none;
    cursor: pointer;
    :disabled{
        opacity: 0.7;
        cursor:default;
    }
`