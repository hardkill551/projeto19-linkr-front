import { useContext, useEffect, useState } from "react";
import Header from "../componentes/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import Post from "../componentes/Post";
import { ThreeDots } from 'react-loader-spinner'
import { ContentContainer, ProfilePicture, TimelineContainer } from "../style/TimeLineStyle";
import axios from "axios";
import { UserContext } from "../ContextAPI/ContextUser";

export default function TimelinePage() {
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
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
        }

        const request = api.get("/posts",
            { headers: { Authorization: `Bearer ${token}` } }
        );

        request.then(response => { setPosts(response.data) });
        request.catch(err => {
            setError(true);
        });
    },[])


    if (error) {
        return (
            <>
                <Header />
                <TimelineContainer>
                    <ErrorContainer>
                        <h1>An error occurred while trying to fetch the posts, please refresh the page.</h1>
                    </ErrorContainer>
                </TimelineContainer>
            </>
        );
    }

    if (posts === null) {
        return (
            <><Header />
                <TimelineContainer>
                    <ContentContainer>
                        <h1>timeline</h1>
                        <PublishingContainer data-test="publish-box">
                            <ProfilePicture src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png" alt="profile-picture" />
                            <div>
                                <h2>What are you going to share today?</h2>
                                <form>
                                    <input data-test="link" placeholder="Link" />
                                    <input data-test="description" className="captionInput" placeholder="Caption" />
                                    <PublishButton data-test="publish-btn">Publish</PublishButton>
                                </form>

                            </div>
                        </PublishingContainer>
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
                    </ContentContainer>
                </TimelineContainer></>
        )
    }

    return (
        <TimelineContainer>
            <Header />

            <ContentContainer>
                <h1>timeline</h1>
                <PublishingContainer>
                    <ProfilePicture src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png" alt="profile-picture" />
                    <div>
                        <h2>What are you going to share today?</h2>
                        <form>
                            <input placeholder="Link" />
                            <input className="captionInput" placeholder="Caption" />
                            <PublishButton>Publish</PublishButton>
                        </form>

                    </div>
                </PublishingContainer>
                <Posts posts={posts}>
                    {posts.map(p => <Post key={p.id} message={p.message} name={p.name} picture={p.picture} link={p.link} linkTitle={p.linkTitle} linkImage={p.linkImage} linkDescription={p.linkDescription} />)}
                    <p data-test="message">There are no posts yet</p>
                </Posts>

            </ContentContainer>
        </TimelineContainer>
    )
}

const Loading = styled.div`
    width: 611px;
    height: 100vh;
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h2 {
        font-family: 'Oswald';
        font-weight: 400;
        font-size: 24px;
        line-height: 36px;
        color: #ffffff;
        margin-bottom: 5px;
        margin-top:5px;
    }
`

const Posts = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
p{
    margin-top:30px;
    display:${(props) => (props.posts.length !== 0 ? "none" : "flex")};
    font-family: 'Oswald';
    font-weight: 400;
    font-size: 24px;
    line-height: 36px;
    color: #ffffff;
}
`

const PublishingContainer = styled.div`
    width: 611px;
    height: 209px;
    background-color: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0px, 4px rgba(0, 0, 0, 0.25);
    margin-top:43px;
    margin-bottom:29px;
    padding: 16px 22px;
    display: flex;
    justify-content: space-between;
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
    input {
        width: 503px;
        height: 30px;
        background-color: #EFEFEF;
        border:none;
        border-radius: 5px;
        margin-bottom: 5px;
        &::placeholder{
            color:#949494;
            font-size:15px;
            line-height:18px;
            padding:8px 12px;
            }
    }
    .captionInput {
        height: 66px;
    }
    form{
    display: flex;
    flex-direction: column;
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
`




const ErrorContainer = styled.div`
    width: 611px;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
`

