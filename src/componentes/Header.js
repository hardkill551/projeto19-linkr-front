import styled from "styled-components";
import { FaGreaterThan } from "react-icons/fa";
import { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { DebounceInput } from "react-debounce-input";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../ContextAPI/ContextUser";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LogoutContext } from "../ContextAPI/ContextLogout";
import api from "../axios";

export default function Header() {
    const [findActive, setFindActive] = useState(false)
    const [search, setSearch] = useState("")
    const {logoutBox, setLogoutBox} = useContext(LogoutContext)
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [users, setUsers]= useState([])
    const { userInfo, setUserInfo } = useContext(UserContext);
    console.log(users)
    console.log(search)

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
    function goToUserPage(id){
        setSearch("")
        setFindActive(false)
        navigate("/user/"+id)
    }
    
    return (
        <>
        <HeaderContainer>
            <Logo>
                linkr
            </Logo>
            <InputContainer onClick={() => setLogoutBox(false)}>
                <StyledInput
                    placeholder="Search for people"
                    value={search}
                    minLength={3}
                    debounceTimeout={300}
                    onChange={SearchUsers}
                    />
                <Icon/>
            </InputContainer>
            <FindUsers onClick={() => setLogoutBox(false)} findActive={findActive}>
                {users.map((user) => (
                    <User onClick={()=>goToUserPage(user.id)} key={user.id}>
                        <img src={user.picture} alt="user-picture" />
                        <p>{user.name}</p>
                    </User>
                ))}
            </FindUsers>
            <MyContent onClick={() => setLogoutBox(!logoutBox)}>
        {logoutBox ? (
          <motion.section
            animate={{ rotateZ: 0 }}
            onClick={() => setLogoutBox(!logoutBox)}
            transition={{ duration: 0.5 }}
          >
            <Menu />
          </motion.section>
        ) : (
          <motion.section
            initial={{ rotateZ: 180 }}
            onClick={() => setLogoutBox(!logoutBox)}
            transition={{ duration: 0.3 }}
          >
            <Menu />
          </motion.section>
        )}

        <ProfilePicture
          src="https://www.gov.br/cdn/sso-status-bar/src/image/user.png"
          alt="profile-picture"
        />
      </MyContent>

      
    </HeaderContainer>
    {logoutBox && (
        <Centralizer>
          <motion.div
            animate={{ y: 0 }}
            initial={{ y: -60 }}
            exit={{ y: -60 }}
            transition={{ duration: 0.5, type: "tween" }}
          >
            <Logout onClick={() => logout()}>
              <p>Logout</p>
            </Logout>
          </motion.div>
        </Centralizer>
      )}
      </>
  );

    function logout() {
      localStorage.clear();
      setUserInfo({ ...userInfo, name: "", email: "", picture: "", token: "" });
      navigate("/");
    }
}

const Centralizer = styled.div`
  position: absolute;
  right: 0px;
  top: 72px;
`;
const Logout = styled.div`
  font-size: 20px;
  color: white;
  background-color: #171717;
  width: 150px;
  height: 47px;
  border-bottom-left-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  p{
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: inline-block;
`;
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
  margin-left: -6px;
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
  background-image: url("path/to/search-icon.png");
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  color: #c6c6c6;
  margin-right: 15px;
`;
const FindUsers = styled.ul`
  width: 563px;
  border-radius: 8px;
  background-color: #e7e7e7;
  margin-top: 60px;
  position: fixed;
  left: 50%;
  top: -46px;
  transform: translateX(-50%);
  padding-top: 43px;
  padding-bottom: 23px;
  padding-left: 17px;
  display: ${({ findActive }) => (findActive ? "block" : "none")};
`;

const User = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  font-family: "Lato";
  color: #515151;
  margin-top: 15px;
  align-items: center;
  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
    margin-right: 12px;
  }
`;
const MyContent = styled.div`
  gap: 17px;
  display: flex;
  align-items: center;
`;
const HeaderContainer = styled.div`
  height: 72px;
  width: 100%;
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 28px;
  position:relative;
  z-index:1;
`;
const Logo = styled.div`
  font-family: "Passion One";
  font-size: 49px;
  font-weight: 700;
  line-height: 54px;
  color: #ffffff;
`;

const Menu = styled(FaGreaterThan)`
  color: #ffffff;
  transform: rotate(90deg);
  height: 22px;
  width: 20px;
  cursor: pointer
`;

const ProfilePicture = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 26.5px;
  object-fit: cover;
  background-color: #ffffff;
`;
