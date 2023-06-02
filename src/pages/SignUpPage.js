import { useNavigate } from "react-router-dom";
import { signUpInput, signUpInputType } from "../constants/inputs";
import { Background, Left, Right } from "../style/LoginStyle";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SignUp(){
    const navigate = useNavigate()
    const [user, setUser] = useState({email:"", password:"", name: "", picture:""})
    const [disable, setDisable] = useState(false)
    const token = localStorage.getItem("token")
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
            <Right forms={true}>
                <form onSubmit={sign}>
                    {signUpInput.map((object, i) => <input data-test={data(object)} disabled={disable} type={signUpInputType[i]} onChange={(e)=>{
                        if(object === "e-mail") setUser({...user, email:e.target.value})
                        else if(object === "password") setUser({...user, password:e.target.value})
                        else if(object === "username") setUser({...user, name:e.target.value})
                        else setUser({...user, picture:e.target.value})
                        }} placeholder={object}/>)}
                    <button disabled={disable} data-test="sign-up-btn" type="submit">Sign Up</button>
                    <button disabled={disable} data-test="login-link" type="button" onClick={()=>navigate("/")}>Switch back to log in</button>
                </form>
            </Right>
    </Background>
    )
    function sign(e){
        e.preventDefault()
        setDisable(true)
        if(user.email === ""|| user.password === ""|| user.name === ""|| user.picture === "") {
            alert("Preencha todos os campos!")
            setDisable(false)
            return
        }

        axios.post(process.env.REACT_APP_API_URL+"/signup", user).then((res)=>{
            setDisable(false)
            navigate("/")
        }).catch((err)=>{
            alert(err.response.data)
            setDisable(false)
        })
    }
    function data(object){
        if(object === "e-mail") return "email"
        else if(object === "password") return "password"
        else if(object === "username") return "username"
        else return "picture-url"
        
    }

}
