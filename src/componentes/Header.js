import styled from "styled-components";
import { FaGreaterThan } from 'react-icons/fa';

export default function Header() {
    return (
        <HeaderContainer>
            <Logo>
                linkr
            </Logo>
            <div>
                <Menu />
                <ProfilePicture src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png" alt="profile-picture" />
            </div>
        </HeaderContainer>
    )
}

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