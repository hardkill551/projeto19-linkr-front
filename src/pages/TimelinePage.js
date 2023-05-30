import Header from "../componentes/Header";
import styled from "styled-components";

export default function TimelinePage() {
    return (
        <><Header />
            <TimelineContainer>
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
                    <PostContainer>
                        <ProfilePicture src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png" alt="profile-picture" />
                        <div>
                            <h2>Juvenal Juvêncio</h2>
                            <h3>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</h3>
                            <LinkContainer>
                                <div>
                                    <h4>
                                        Como aplicar o Material UI em um Projeto React
                                    </h4>
                                    <p>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</p>
                                    <a href="www.com.br">https://www.com</a>
                                </div>
                                <img src="https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"></img>
                            </LinkContainer>
                        </div>
                    </PostContainer>
                </ContentContainer>
            </TimelineContainer></>
    )
}

const LinkContainer = styled.div`
    width:503px;
    height: 155px;
    border-radius: 11px;
    border: 1px solid #4D4D4D;
    display:flex;
    font-family: 'Lato';
    font-weight: 400;
    div{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
    }
    img{
        width:153px;
        height: 100%;
        object-fit: cover;
        border-radius: 11px;
    }
    h4{
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
    }
    p{
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
    }
    a{
        font-size: 11px;
        line-height: 13px;
        color: #CECECE;
        text-decoration: none;
        margin-top:5px;
    }

`

const PostContainer = styled.div`
    width: 611px;
    height: 276px;
    background-color: #171717;
    border-radius: 16px;
    margin-top:29px;
    padding: 16px 22px;
    display: flex;
    justify-content: space-between;
    gap:18px;
    h2 {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
        margin-bottom: 7px;
    }
    h3 {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        margin-bottom: 7px;
    }
`

const PublishingContainer = styled.div`
    width: 611px;
    height: 209px;
    background-color: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0px, 4px rgba(0, 0, 0, 0.25);
    margin-top:43px;
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
    height: 100%;
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
    height: 100vh;
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