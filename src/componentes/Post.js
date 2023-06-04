import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ContextAPI/ContextUser";

export default function Post({ message, name, picture, link, linkTitle, linkImage, linkDescription, id, like_count, postId, nameUser }) {
    const navigate = useNavigate();
    const {userInfo} = useContext(UserContext)
    const [likeOn, setLikeOn] = useState(false)
    const [count, setCount] = useState(Number(like_count))
    const [showTooltip, setShowTooltip] = useState(false);
    const [showWhoLike, setShowWhoLike] = useState("")

    useEffect(()=>{
        axios.post(process.env.REACT_APP_API_URL+"/likesCheck", {postId}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        } ).then(res=>{
            if(res.data) setLikeOn(true)
            
        }).catch(err=>{
            console.log(err.response.data)
        })

        axios.get(process.env.REACT_APP_API_URL+"/likes/"+postId, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }).then(res=>{
            const user = res.data.some(obj => obj.name === nameUser)
            const newArray = res.data.filter(obj => obj.name !== nameUser)
            if(user){
                if(res.data.length === 1){
                    setShowWhoLike("Você")
                }else if(res.data.length === 2){
                setShowWhoLike("Você" + " e " + newArray[1].name)
                }else if(res.data.length > 2){
                setShowWhoLike("Você" + ", " + newArray[1].name + " e outras " + (Number(res.data.length)-2) + " " + " pessoas")
                }
            }else{
                if(res.data.length === 1){
                    setShowWhoLike(res.data[0].name)
                }else if(res.data.length === 2){
                setShowWhoLike(res.data[0].name + " e " + res.data[1].name)
                }else if(res.data.length > 2){
                setShowWhoLike(res.data[0].name + ", " + res.data[1].name + " e outras " + (Number(res.data.length)-2) + " " + " pessoas")
                }
            }
            
        }).catch(err=>{
            console.log(err.response.data)
        })
    },[showTooltip])

    function redirectToUrl(link) {
        window.open(link);
    }

    function goToUserPage(id){
        navigate("/user/"+id)
    }

    function handleMouseEnter(){
        setShowTooltip(true);
    }

    function handleMouseLeave(){
        setShowTooltip(false);
    } 

    function renderMessageWithHashtags() {
        const hashtagRegex = /#(\w+)/g;
        const hashtags = message.match(hashtagRegex);

        if (hashtags) {
            const messageParts = message.split(hashtagRegex);

            return messageParts.map((part, index) => {
                if (hashtags.includes(`#${part}`)) {
                    const hashtag = part.replace("#", "");
                    return (
                        <HashtagLink key={index} to={`/hashtag/${hashtag}`}>
                            <strong>{`#${part}`}</strong>
                        </HashtagLink>
                    );
                }

                return part;
            });
        }

        return message;
    }


    return (
        <PostContainer data-test="post">
            <Likes like={likeOn}>
                <ProfilePicture src={picture} alt="profile-picture" />
                {likeOn?<AiFillHeart onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-test="like-btn" onClick={()=>deslike()}/>:<AiOutlineHeart onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-test="like-btn" onClick={()=>giveLike()}/>}
                <h5 data-test="counter">{Number(count)} likes</h5>
                <Tooltip data-test="tooltip" showTooltip={showTooltip}>
                    <p>{showWhoLike}</p>
                </Tooltip>
            </Likes>
            <div>
                <h2 data-test="username" onClick={()=>goToUserPage(id)}>{name}</h2>
                <h3 data-test="description">{renderMessageWithHashtags()}</h3>
                <LinkContainer onClick={() => redirectToUrl(link)}>
                    <div>
                        <h4>{linkTitle}</h4>
                        <p>{linkDescription}</p>
                        <a data-test="link" href={link}>{link}</a>
                    </div>
                    <img src={linkImage} alt="urlImage"></img>
                </LinkContainer>
            </div>
        </PostContainer>
    );

    function deslike(){
        axios.delete(process.env.REACT_APP_API_URL+"/likes", {
            headers: {
              Authorization: userInfo.token
            },
            data: {
              postId
            }
          } ).then(res=>{
            setLikeOn(false)
            setCount(Number(count-1))
        }).catch(err=>{
            console.log(err.response.data)
        })
    }
    function giveLike(){
        axios.post(process.env.REACT_APP_API_URL+"/likes", {postId}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        } ).then(res=>{
            setLikeOn(true)
            setCount(Number(count+1))
        }).catch(err=>{
            console.log(err.response.data)
        })
    }

}
const Tooltip = styled.div`
    display: ${({showTooltip})=> showTooltip?'flex':'none'};
    width: auto;
    /* min-width: 169px; */
    height: 24px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    position: absolute;
    top: 130px;
    z-index: 999;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin: 0;
    p{
        color: #505050;
        display: ${({showTooltip})=> showTooltip?'flex':'none'};
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 11px;
        line-height: 13px;
        top:-17px;
        white-space: nowrap;
        position: relative;
    }
    ::before {
        content: '';
        position: absolute;
        top: -24px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 12px;
        border-style: solid;
        border-color: transparent transparent rgba(255, 255, 255, 0.9) transparent;
  }
`
const HashtagLink = styled(Link)`
    color: #CECECE;
    font-weight: bold;
    text-decoration: none;
`;
const Likes = styled.div`
position: relative;
display:flex;
flex-direction:column;
align-items:center;
color:white;
svg{
    font-size:30px;
    margin-top:15px;
    margin-bottom:5px;
    color:${(props) => props.like ? "#AC0000" : "white"};
    cursor: pointer;
}
h5{
    color:white;
    font-size:14px;

    font-family: 'Lato';
}

`
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
    @media (max-width:611px){
        min-width: 100%;
        img{
            width:30%;
        }
        div{
            width:70%;
            padding:10px;
            overflow: hidden;
        }
    }

    @media (max-width:530px){
              
        img{
            min-width:95px;
        }
        div{
            max-width:(100% - 95px);
        }
        
    }
    @media (max-width:375px){
        h4{
            font-size: 11px;
            line-height: 13px;
        }
        p{
            font-size: 9px;
            line-height: 10px;
        }
        a{
            font-size: 9px;
            line-height: 10px;
            margin-top:1px;
        }
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
    justify-content: flex-start;
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

    @media (max-width:611px){
        width:100%;
        border-radius: 0px;
        padding: 16px 10px;
        gap:18px;
    }

    @media (max-width:580px){
        div{
        max-width:85%;
        } 
    }
`

const ProfilePicture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    object-fit: cover;
    background-color: #EFEFEF;

    @media (max-width:611px){
    width: 40px;
    height: 40px;
    }
`