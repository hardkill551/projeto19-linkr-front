import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsSend, BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../ContextAPI/ContextUser";
import { BiTrashAlt } from "react-icons/bi";
import Delete from "../pages/Delete/Delete";
import api from "../axios";

export default function Post({ message, name, picture, link, linkTitle, linkImage, linkDescription, id, like_count, postId, nameUser, liked_by, commentsCount, commentsData, following, userId }) {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext)
    const [likeOn, setLikeOn] = useState(false)
    const [count, setCount] = useState(Number(like_count))
    const [showTooltip, setShowTooltip] = useState(false);
    const [showWhoLike, setShowWhoLike] = useState("");
    const [notShowTooltip, setNotShowToolTip] = useState(false)
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    const token = localStorage.getItem("token")
    const [activeDelete, setActiveDelete] = useState(false)
    const [activeUpdate, setActiveUpdate] = useState(false)
    const [description, setDescription] = useState(message)
    const inputEl = useRef(null);
    const [disable, setDisable] = useState(false)


    useEffect(() => {
        setShowWhoLike("")
        const user = liked_by.some(obj => obj === nameUser)
        const newArray = liked_by.filter(obj => obj !== nameUser);

        if (liked_by.length === 0) {
            setNotShowToolTip(true)
        } else if (liked_by.length === 1 && user) { //caso em que o unico like é meu
            setShowWhoLike("Você")
        } else if (liked_by.length === 1 && !user) { //caso em q o unico like q tem nao fui eu quem dei
            setShowWhoLike(liked_by[0])
        } else if (liked_by.length === 2 && user) { //caso em qque tem 2 likes e um é meu
            setShowWhoLike(`Você e ${newArray[0]}`)
        } else if (liked_by.length === 2 && !user) { //caso em que tem dois likes e nenhum é meu
            setShowWhoLike(`${liked_by[0]} e ${liked_by[1]}`)
        } else if (liked_by.length >= 3 && user) {
            setShowWhoLike(`Você, ${liked_by[0]} e outras ${liked_by.length - 2} pessoas`)//caso em que tem mais de dois likes e um é meu
        } else if (liked_by.length >= 3 && !user) {
            setShowWhoLike(`${liked_by[0]}, ${liked_by[1]} e outras ${liked_by.length - 2} pessoas`)
        }

        axios.post(process.env.REACT_APP_API_URL + "/likesCheck", { postId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data) setLikeOn(true)
        }).catch(err => {
            console.log(err.response.data)
        })
        if(activeUpdate){
            inputEl.current.focus()
            setDescription(message)
        }
    }, [activeUpdate, setActiveUpdate])

    function handleKeyPress(event){
        event.preventDefault()
        
         document.onkeydown = function(e) {
            if(e.key==="Escape" || e.key === "Enter") setDisable(true)
            else return
            
            if(e.key === 'Escape') {
                
                setDisable(false)
                return setActiveUpdate(false)
            }
            if(e.key==="Enter") {
                if (description.length > 120) {
                    
                    setDisable(false);
                    return alert("Caption can not be longer than 120 characters.");
                }
    
            const obj = {
                id:postId,
                description
            }
    
            const request = api.put("/posts", obj, { headers: { Authorization: `Bearer ${token}` } });
    
            request.then(() => {
                setDisable(false)
                window.location.reload(true);
            });
    
            request.catch(err => {
                alert("There was an error editing your link");
                setDisable(false);
            })
            }
          }
        
        setDescription(event.target.value)
    }

    function redirectToUrl(link) {
        window.open(link);
    }

    function goToUserPage(id) {
        navigate("/user/" + id)
    }

    function handleMouseEnter() {
        if (notShowTooltip) {
            setShowTooltip(false);
            return;
        }
        setShowTooltip(true);
    }

    function handleMouseLeave() {
        if (notShowTooltip) {
            return;
        }
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
    
    function showCommentsContainer() {
        if (showComments) {
            setShowComments(false);
        } else {
            setShowComments(true);
        }
    }

    function createComment(postId) {
        if (comment.length > 120) {
            return alert("Comment can not be longer than 120 characters.");
        }

        const obj = {
            comment,
            postId
        }

        axios.post(process.env.REACT_APP_API_URL + "/comments", obj, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setComment("");
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    return (
        <Container showComments={showComments}>
            {activeDelete?<Delete setActiveDelete={setActiveDelete}  postId={postId}/>:<></>}
            <PostContainer data-test="post">
                <Icons like={likeOn}>
                    <ProfilePicture src={picture} alt="profile-picture" />
                    {likeOn ? <AiFillHeart onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-test="like-btn" className="like" onClick={() => deslike()} /> : <AiOutlineHeart onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} data-test="like-btn" onClick={() => giveLike()} />}
                    <h5 data-test="counter">{Number(count)} likes</h5>
                    <Tooltip data-test="tooltip" showTooltip={showTooltip}>
                        <p className='tooltip-text'>{showWhoLike}</p>
                    </Tooltip>
                    <AiOutlineComment data-test="comment-btn" onClick={showCommentsContainer} />
                    <h5 data-test="comment-counter">{commentsCount} comments</h5>
                </Icons>
                <div>
                    <Infos activeUpdate={activeUpdate}>
                        <div>
                            <h2 data-test="username" onClick={() => goToUserPage(id)}>{name}</h2>
                            <h3  data-test="description">{renderMessageWithHashtags()}</h3>
                            <textarea disabled={disable} onChange={(event) => handleKeyPress(event)} ref={inputEl} placeholder={description} value={description}></textarea>
                        </div>
                        
                        {userId===userInfo.id?<div><BsFillPencilFill onClick={()=>{setActiveUpdate(!activeUpdate);}}/>
                        <BiTrashAlt onClick={()=>setActiveDelete(!activeDelete)}/></div>:<></>}
                        
                        
                        
                        
                    </Infos>
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
            <CommentsContainer showComments={showComments} data-test="comment-box">
                <Comments>
                    {commentsData && commentsData.map(c => (

                        <Comment data-test="comment">
                            <img src={c.pictureAuthor} />
                            <div className="comment-content">
                                <div className="comment-author">
                                    <h2>{c.commentAuthor}</h2>
                                    <h3>{c.commentAuthorId === userId ? "• post's author" : (following.some(obj => obj.followedId === c.commentAuthorId) ? "• following" : "")}</h3>
                                </div>
                                <h4>{c.comment}</h4>
                            </div>
                        </Comment>
                    ))}
                </Comments>
                <CommentInput>
                    <img src={userInfo.picture} />
                    <input data-test="comment-input" type="text" placeholder="write a comment..." value={comment} onChange={e => setComment(e.target.value)}></input>
                    <BsSend data-test="comment-submit" onClick={() => createComment(postId)} />
                </CommentInput>
            </CommentsContainer>
        </Container>
    );

    function deslike() {
        axios.delete(process.env.REACT_APP_API_URL + "/likes", {
            headers: {
                Authorization: userInfo.token
            },
            data: {
                postId
            }
        }).then(res => {
            setLikeOn(false)
            setCount(Number(count - 1))
            if (Number(count - 1) === 0) {
                setNotShowToolTip(true)
                setShowWhoLike("")
            } else if (Number(count - 1) === 1) {
                setShowWhoLike(liked_by[0])
            } else if (Number(count - 1) === 2) {
                setShowWhoLike(`${liked_by[0]} e ${liked_by[1]}`)
            } else if (Number(count - 1) >= 3) {
                setShowWhoLike(`${liked_by[0]}, ${liked_by[1]} e outras ${liked_by.length - 2} pessoas`)
            }

        }).catch(err => {
            console.log(err.response.data)
        })
    }
    function giveLike() {
        axios.post(process.env.REACT_APP_API_URL + "/likes", { postId }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }).then(res => {
            setLikeOn(true)
            setCount(Number(count + 1))
            if (Number(count + 1) === 1) {
                setNotShowToolTip(false) //não tinha like e agora tem e o unico q tem é seu! Então pode mostrar
                setShowWhoLike("Você")
            } else if ((Number(count + 1) === 2)) {
                setShowWhoLike(`Você e ${liked_by[0]}`)
            } else if ((Number(count + 1) >= 3)) {
                setShowWhoLike(`Você, ${liked_by[0]} e outras ${liked_by.length - 1} pessoas`)
            }
        }).catch(err => {
            console.log(err)
        })
    }

}


const Infos = styled.div`
width:100%;
display:flex;
max-width:100% !important;
div{
    width:100%
}div:nth-child(2){
    width:14%
}
svg:first-child{
    font-size:17px;
}
svg{
    color:white;
    font-size:20px;
    margin-left:8px;
    cursor:pointer;
}
h3{
    display:${(props)=>props.activeUpdate?"none":"flex"};
}
textarea{
    display:${(props)=>props.activeUpdate?"flex":"none"};
    width:100%;
    border-radius:5px;
    border:0px;
    flex-wrap:wrap;
    padding:3px;
    height:40px;
    margin-bottom:10px;
    font-size:14px;
    font-family:"Lato";
    font-weight:400;
    resize: none
}
`


const CommentInput = styled.div`
        display:flex;
        gap:18px;
        padding: 14px 0px;
        position: relative;
    img{
        width:39px;
        height: 39px;
        border-radius: 26.5px;
        object-fit: cover;
        background-color: #EFEFEF;
    }
    input{
        width: 510px;
        height: 39px;
        background-color: #252525;
        color:#ACACAC;
        border:none;
        border-radius: 8px;
        
        &::placeholder{
            font-family: 'Lato';
            font-style: italic;
            color:#575757;
            font-size:14px;
            line-height:17px;
            padding:8px 12px;
            }
    }
    svg{
    font-size:15px;
    cursor: pointer;
    color: #ffffff;
    position:absolute;
    right: 5%;
    bottom:38%;
}
`
const Comments = styled.div`
    max-height: 240px;
    overflow-y: hidden;
    overflow-y: scroll;

 `
const Comment = styled.div`
        font-family: 'Lato';
        font-size: 14px;
        line-height: 17px;
        display:flex;
        justify-content: flex-start;
        align-items: center;
        gap:18px;
        border-bottom: 1px solid #353535;
        padding: 12px 0px;
    img{
        width:39px;
        height: 39px;
        border-radius: 26.5px;
        object-fit: cover;
        background-color: #EFEFEF;
    }
    h2{
        font-weight: 700;
        color: #F3F3F3;
        margin-right: 4px;
    }
    h3{
        font-weight: 400;
        color: #565656;
    }
    h4{
        font-weight: 400;
        color: #ACACAC;
        height: 34px;
    }
    .comment-author{
        display:flex;
        margin-bottom:3px;
    }
`
const Container = styled.div`
   margin-bottom:29px;
   height: ${({ showComments }) => showComments ? '595px' : '100%'};
   display:flex;
   flex-direction: column;
   position: relative;
   @media (max-width:611px){
        width:100%;
    }
`

const CommentsContainer = styled.div`
    display: ${({ showComments }) => showComments ? 'flex' : 'none'};
    flex-direction: column;
    width:611px;
    max-height: 375px;
    background-color: #1E1E1E;
    border-radius: 16px;
    position: absolute;
    left: auto;
    top:220px;
    padding: 50px 14px 16px 14px;
    @media (max-width:611px){
        width:100%;
        border-radius: 0px;
        padding: 16px 10px;
    }
`

const Tooltip = styled.div`
    display: ${({ showTooltip }) => showTooltip ? 'flex' : 'none'};
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
    
    .tooltip-text {
    color: #505050;
    display: ${({ showTooltip }) => (showTooltip ? 'flex' : 'none')};
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 11px;
    line-height: 13px;
    top: -17px;
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
const Icons = styled.div`
position: relative;
display:flex;
flex-direction:column;
align-items:center;
color:white;
svg{
    font-size:30px;
    margin-top:15px;
    margin-bottom:5px;
    cursor: pointer;
}
.like{
    color:${(props) => props.like ? "#AC0000" : "white"};
}
h5{
    color:white;
    font-size:11px;

    font-family: 'Lato';
    text-align: center;
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
        overflow: hidden;
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
    padding: 16px 14px;
    display: flex;
    justify-content: flex-start;
    gap:14px;
    z-index:1;
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
