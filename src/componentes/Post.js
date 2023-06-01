import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Post({ message, name, picture, link, linkTitle, linkImage, linkDescription, id }) {
    const navigate = useNavigate();
    function redirectToUrl(link) {
        window.open(link);
    }
    console.log(linkImage)
    function goToUserPage(id){
        navigate("/user/"+id)
    }
    return (
        <PostContainer data-test="post">
            <ProfilePicture src={picture} alt="profile-picture" />
            <div>
                <h2 onClick={()=>goToUserPage(id)}>{name}</h2>
                <h3>{message}</h3>
                <LinkContainer onClick={() => redirectToUrl(link)}>
                    <div>
                        <h4>
                            {linkTitle}
                        </h4>
                        <p>{linkDescription}</p>
                        <a href={link}>{link}</a>
                    </div>
                    <img src={linkImage} alt="urlImage"></img>
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
    cursor:pointer;
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
        cursor: pointer;
    }
    h3 {
        font-family: 'Lato';
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        margin-bottom: 12px;
        max-height: 52px;
    }
    div{
        width:502px;
    }
`

const ProfilePicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    background-color: #EFEFEF;
`