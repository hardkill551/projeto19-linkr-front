import { useContext, useEffect, useState } from "react";
import Header from "../componentes/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import Post from "../componentes/Post";
import { ThreeDots } from 'react-loader-spinner'
import { ContentContainer, Loading, Posts, ProfilePicture, TimelineContainer } from "../style/TimeLineStyle";
import axios from "axios";
import { UserContext } from "../ContextAPI/ContextUser";
import { LogoutContext } from "../ContextAPI/ContextLogout";
import Trending from "../componentes/Trending";
import useInterval from 'use-interval'
import { TfiReload } from "react-icons/tfi";
import InfiniteScroll from 'react-infinite-scroller';
import LoadingPosts from "../componentes/LoadingPage";

export default function TimelinePage() {
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [link, setLink] = useState("");
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [buttonText, setButtonText] = useState("Publishing");
    const { userInfo, setUserInfo } = useContext(UserContext);
    const { logoutBox, setLogoutBox } = useContext(LogoutContext);
    const [haveFollowers, setHaveFollowers] = useState(false);
    const [following, setFollowing] = useState([]);
    const [count, setCount] = useState(0)
    const [ct, setCt] = useState(0)
    const [loadCount, setLoadCount] = useState(10)
    const [quantity, setQuantity] = useState(true)
    useInterval(()=>{
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
      
            const request = api.get("/posts/0" ,config);
                    request.then(response => {
                        if(response.data.length > 0) {
                            if(response.data[0].id!==posts[0].id) {
                                let newCount = 0
                                for(let i = 0; i<response.data.length;i++){
                                    
                                    if(response.data[i].id!==posts[0].id) {
                                        newCount += 1
                                    }
                                    else if(response.data[i].id===posts[0].id) {
                                        setCount(newCount)
                                        break
                                    }
                                }
                                
                            }
                        }
                    });
                    request.catch(err => {
                        setError(true);
                    });
                
    }, 1000)
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
        
        if(count === 0){
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            axios.get(process.env.REACT_APP_API_URL + "/followers", config)
                .then((res) => {
                       
                        setHaveFollowers(true)
                        setFollowing(res.data);
                        
                    
            }).catch(err => {
                console.log(err.message);
            });
            const request = api.get("/posts/0" ,config);
            request.then(response => {
                setPosts(response.data)
                if (response.data.length<10) setQuantity(false)
            });
            request.catch(err => {
                setError(true);
            });
        }
}, [ct, count])

    if (error) {
        return (
            <>
                <Header />
                <TimelineContainer onClick={() => setLogoutBox(false)}>
                    <ErrorContainer>
                        <h1>An error occurred while trying to fetch the posts, please refresh the page.</h1>
                    </ErrorContainer>
                </TimelineContainer>
            </>
        );
    }

    function createPost(e) {
        e.preventDefault();

        if (message.length > 120) {
            return alert("Caption can not be longer than 120 characters.");
        }

        setDisabled(true);
        setButtonText("Publishing...");

        const obj = {
            link,
            message
        }

        const request = api.post("/posts", obj, { headers: { Authorization: `Bearer ${token}` } });

        request.then(() => {
            setDisabled(false);
            setButtonText("Publishing");
            setLink("");
            setMessage("");
            setCt(ct+1)
        });

        request.catch(err => {
            alert("There was an error publishing your link");
            setDisabled(false);
            setButtonText("Publishing");
        })

    }
    function loadMore(){
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };
        

                    const request = api.get("/posts/"+String(loadCount) ,config);
                    request.then(response => {
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

                    });
                    request.catch(err => {
                        setError(true);
                    });
                }
           
           
    if (posts === null) {
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

        <><Header />
            <TimelineContainer>
                <ContentContainer onClick={() => setLogoutBox(false)}>
                    <h1>timeline</h1>
                    <PublishingContainer data-test="publish-box">
                        <ProfilePicture src={userInfo.picture} alt="profile-picture" />
                        <div>
                            <h2>What are you going to share today?</h2>
                            <form disabled={disabled} onSubmit={createPost}>
                                <input data-test="link" disabled={disabled} type="url" required placeholder="Link" value={link} onChange={e => setLink(e.target.value)} />
                                <textarea data-test="description" className="captionInput" disabled={disabled} type="text" placeholder="Caption" value={message} onChange={e => setMessage(e.target.value)} />
                                <PublishButton data-test="publish-btn" disabled={disabled} type="submit">{buttonText}</PublishButton>
                            </form>
                        </div>
                    </PublishingContainer>
                    {count>0?<NewPosts data-test="load-btn" onClick={()=>{setCount(0); setQuantity(true)}}>
                        <p>{count} new posts, load more!</p>
                        <TfiReload/>
                    </NewPosts>:<></>}
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={()=>loadMore()}
                        hasMore={quantity}
                        loader={<LoadingPosts/>}
                        >
                        

                    <Posts posts={posts}>
                        {posts.map((p,i) => <Post 
                            i={i}
                            loadCount={loadCount}
                            key={p.id}
                            ct={ct}
                            setCt={setCt}
                            repost={p.repost}
                            repostBy={p.repostBy}
                            like_count={p.like_count}
                            message={p.message}
                            name={p.name}
                            picture={p.picture}
                            link={p.link}
                            linkTitle={p.linkTitle}
                            linkImage={p.linkImage}
                            postId={p.id}
                            linkDescription={p.linkDescription}
                            id={p.userId}
                            nameUser={userInfo.name}
                            liked_by={p.liked_by}
                            commentsCount={p.commentsCount}
                            commentsData={p.commentsData}
                            following={following}
                            userId={p.userId}
                        />)}
                        {haveFollowers ? <p data-test="message">No posts found from your friends</p> : <p data-test="message">You don't follow anyone yet. Search for new friends!</p>}
                    </Posts>
                    </InfiniteScroll>
                </ContentContainer>
                <Trending ct={ct} posts={posts} />
            </TimelineContainer>
        </>
    )
}


const NewPosts = styled.button`
background-color:#1877F2;
width: 611px;
height: 61px;
border-radius:16px;
display:flex;
align-items:center;
justify-content:center;
color:white;
font-weight:400;
font-family:'Lato';
font-size:16px;
margin-bottom:25px;
border:0;
cursor: pointer;
:hover{
    background-color:#1555FF;
}
svg{
    margin-left:10px;
}
`
const PublishingContainer = styled.div`
    width: 611px;
    height: 209px;
    background-color: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0px, 4px rgba(0, 0, 0, 0.25);
    margin-bottom:29px;
    padding: 16px 22px;
    display: flex;
    justify-content: flex-start;
    gap:18px;
    h2 {
        font-family: 'Lato';
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-bottom: 15px;
        margin-top:5px;
    }
    input, textarea {
        width: 503px;
        height: 30px;
        background-color: #EFEFEF;
        border:none;
        border-radius: 5px;
        margin-bottom: 5px;
        &::placeholder{
            font-family: 'Lato';
            color:#949494;
            font-size:15px;
            line-height:18px;
            padding:8px 12px;
            }
    }
    .captionInput {
        height: 66px;
        vertical-align: top;
    }
    form{
    display: flex;
    flex-direction: column;
    }
    @media (max-width:611px){
        width:100%;
        border-radius: 0px;
        div, input, textarea{
            width:100%;
        }

    }
    @media(max-width:415px){
        div{
            width:100%;
        }
        h2 {
            text-align: center;
        }
    }
`
const PublishButton = styled.button`
        width: 112px;
        height: 31px;
        border-radius: 5px;
        color: #FFFFFF;
        background-color: #1877F2;
        border:none;
        align-self: flex-end;
        font-family: 'Lato';
        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        cursor:pointer;
`




const ErrorContainer = styled.div`
    width: 611px;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
`

