import styled from "styled-components";
import { FaGreaterThan } from 'react-icons/fa';

export default function Header() {
    return (
        <HeaderContainer>
            <Logo>
                linkr
            </Logo>
            <SearchContainer>
                <input placeholder="Search for people"/>
                <FindUsers>
                    <User>
                        <img src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png" alt="user-picture"/>
                        <p>name</p>
                    </User>
                </FindUsers>
            </SearchContainer>
            <div>
                <Menu />
                <ProfilePicture src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png" alt="profile-picture" />
            </div>
        </HeaderContainer>
    )
}
const FindUsers = styled.div`
    width: 563px;
    background: #E7E7E7;
    border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50;
    transform: translateX(-50%);
    min-height: 20px;
    padding-top:43px;
    display: none;
`

const User = styled.div`
    display: flex;
    img{
        width: 39px;
        height: 39px;
    }
`
const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`
const HeaderContainer = styled.div`
    height: 72px;
    width: 100%;
    background-color: #151515;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 28px;
    div{
        gap:17px;
        display:flex;
        align-items: center;
    }
    input{
        width: 563px;
        height: 43px;
        border-radius: 8px;
        font-size: 19px;
        line-height: 23px;
        font-weight: 400;
        padding-left: 14px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        border: none;
        outline: none;
        position: absolute;
        ::placeholder{
            color: #C6C6C6;
        }
    }
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