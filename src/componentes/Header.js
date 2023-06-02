import styled from "styled-components";
import { FaGreaterThan } from 'react-icons/fa';
import { useState } from "react";
import { BiSearch } from "react-icons/bi" 
import { DebounceInput } from "react-debounce-input";
import api from "../axios";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [findActive, setFindActive] = useState(false)
    const [search, setSearch] = useState("")
    const token = localStorage.getItem("token");
    const [users, setUsers]= useState([])
    const navigate = useNavigate();
    console.log(users)

    function goToUserPage(id){
        navigate("/user/"+id)
    }
    function SearchUsers(e){
        setFindActive(true)
        setSearch(e.target.value)
    
        if(e.target.value.length > 0){
            const request = api.get("/users/" + e.target.value,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            request.then(response => { setUsers(response.data) });
            request.catch(err => console.log(err))
        }else{
            setFindActive(false)
        }
    }
    return (
        <HeaderContainer>
            <Logo>
                linkr
            </Logo>
            <InputContainer>
                <StyledInput
                    placeholder="Search for people"
                    value={search}
                    minLength={3}
                    debounceTimeout={300}
                    onChange={SearchUsers}
                    />
                <Icon/>
            </InputContainer>
            <FindUsers findActive={findActive}>
            {users.map((user) => (
                <User onClick={()=>goToUserPage(user.id)} key={user.id}>
                    <img src={user.picture} alt="user-picture" />
                    <p>{user.name}</p>
                </User>
            ))}
            </FindUsers>
            <MyContent>
                <Menu />
                <ProfilePicture src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png" alt="profile-picture" />
            </MyContent>
        </HeaderContainer>
    )
}

const InputContainer = styled.div`
    position: relative;
    display: inline-block;
`
const StyledInput = styled(DebounceInput)`
    width: 563px;
    height: 45px;
    padding-right: 25px;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: #fff;
    font-size: 16px;
    position: relative;
    z-index: 1;
    font-size: 19px;
    line-height: 23px;
    font-weight: 400;
    padding-left: 14px;
    margin-left:-6px;
    ::placeholder {
        color: #c6c6c6;
    }
`;
const Icon = styled(BiSearch)`
    position: absolute;
    z-index: 2;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    width: 21px;
    height: 21px;
    background-image: url('path/to/search-icon.png');
    background-size: cover;
    background-repeat: no-repeat;
    cursor: pointer;
    color: #C6C6C6;
    margin-right: 15px;
`
const FindUsers = styled.ul`
    width: 563px;
    border-radius: 8px;
    background-color: #E7E7E7;
    margin-top: 60px;
    position: fixed;
    left: 50%;
    top: -46px;
    transform: translateX(-50%);
    padding-top: 43px;
    padding-bottom: 23px;
    padding-left: 17px;
    display: ${({findActive}) => findActive?"block":"none"};
`

const User = styled.div`
    display: flex;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    font-family:"Lato";
    color: #515151;
    margin-top: 15px;
    align-items: center;
    img{
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-right: 12px;
    }
`
const MyContent = styled.div`
    gap:17px;
    display:flex;
    align-items: center;
`
const HeaderContainer = styled.div`
    height: 72px;
    width: 100%;
    background-color: #151515;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 28px;
`
const Logo = styled.div`
    font-family: 'Passion One';
    font-size: 49px;
    font-weight: 700;
    line-height: 54px;
    color: #FFFFFF;
`

const Menu = styled(FaGreaterThan)`
    color: #FFFFFF;
    transform: rotate(90deg);
    height: 22px;
    width: 20px;
`

const ProfilePicture = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 26.5px;
    object-fit: cover;
    background-color: #FFFFFF;
`