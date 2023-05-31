import { useEffect, useState } from "react";
import Header from "../componentes/Header";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import Post from "../componentes/Post";
import { ThreeDots } from 'react-loader-spinner'

export default function TimelinePage() {
    const token = localStorage.getItem("token");
    const [posts, setPosts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        // if (!token) {
        //     navigate("/");
        //   } else {

        const request = api.get("/posts",
            { headers: { Authorization: `Bearer ${token}` } }
        );

        request.then(response => { setPosts(response.data) });
        request.catch(err => {
            console.log("An error occured while trying to fetch the posts, please refresh the page")
        });

        //   }
    }, []);

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
                    {posts.map(p => <Post key={p.id} link={p.link} message={p.message} name={p.name} picture={p.picture} />)}
                    <p data-test="message">There are no posts yet</p>
                </Posts>

            </ContentContainer>
        </TimelineContainer>
    )
}

const Loading = styled.div`
    width: 611px;
    height: 109px;
    display:flex;
    flex-direction: column;
    justify-content: center;
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

const TimelineContainer = styled.div`
    background-color: #4D4D4D;
    width: 100%;
    height: auto;
    
    h1{
        font-family: 'Oswald';
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
        padding-top: 70px;
    }
`

const ContentContainer = styled.div`
    width: 611px;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
`

const ProfilePicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    background-color: #EFEFEF;
`