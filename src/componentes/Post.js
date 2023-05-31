import styled from "styled-components";

export default function Post({ link, message, name, picture }) {


    // urlMetadata(link)
    //     .then((metadata) => {
    //         console.log(metadata)
    //         // do stuff with the metadata
    //     },
    //         (err) => {
    //             console.log(err)
    //         })
    return (
        <PostContainer data-test="post">
            <ProfilePicture src={picture} alt="profile-picture" />
            <div>
                <h2>{name}</h2>
                <h3>{message}</h3>
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
    margin-bottom:29px;
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

const ProfilePicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    background-color: #EFEFEF;
`