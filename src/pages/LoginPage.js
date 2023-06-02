import { loginInput } from "../constants/inputs";
import { useNavigate } from "react-router-dom";
import { Background, Left, Right } from "../style/LoginStyle";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../ContextAPI/ContextUser";

export default function Login(){
    const navigate = useNavigate()
    const [user, setUser] = useState({email:"", password:""})
    const [disable, setDisable] = useState(false)
    const token = localStorage.getItem("token")
    const {userInfo, setUserInfo} = useContext(UserContext)
    useEffect(()=>{
        if(token){
            axios.post(process.env.REACT_APP_API_URL+"/token", {},{headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(res=>{
                navigate("/timeline")
                
            }).catch(err=>{
                alert(err.response.data)
            })
        }
    }, [])




    return (
        <Background>
            <Left>
                <h1>linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </Left>
            <Right>
                <form onSubmit={login}>
                    {loginInput.map((object) => <input disabled={disable} onChange={(e)=>{object === "e-mail"?setUser({...user, email:e.target.value}):setUser({...user, password:e.target.value})}
                    } type={object === "e-mail"?"email":"password"} placeholder={object}/>)}
                    <button disabled={disable} type="submit">Log In</button>
                    <button disabled={disable} type="button" onClick={()=>navigate("/sign-up")}>First time? Create an account!</button>
                </form>
            </Right>
        </Background>
    )

    function login(e){
        e.preventDefault()
        setDisable(true)
        if(user.email === ""|| user.password === "") {
            alert("Preencha todos os campos!")
            setDisable(false)
            return
        }
        
        axios.post(process.env.REACT_APP_API_URL+"/signin", user).then((res)=>{
            setUserInfo({...userInfo, name:res.data.name, email:res.data.email, picture:res.data.picture, token:res.data.token})
            localStorage.setItem("token", res.data.token)
            setDisable(false)
            navigate("/timeline")
        }).catch((err)=>{
            alert(err.response.data)
            setDisable(false)
        })
        
    }
}


