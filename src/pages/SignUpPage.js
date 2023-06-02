import { useNavigate } from "react-router-dom";
import { signUpInput, signUpInputType } from "../constants/inputs";
import { Background, Left, Right } from "../style/LoginStyle";
import { useState } from "react";
import axios from "axios";

export default function SignUp(){
    const navigate = useNavigate()
    const [user, setUser] = useState({email:"", password:"", name: "", picture:""})
    const [disable, setDisable] = useState(false)
    return (
        <Background>
            <Left>
                <h1>linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </Left>
            <Right forms={true}>
                <form onSubmit={sign}>
                    {signUpInput.map((object, i) => <input disabled={disable} type={signUpInputType[i]} onChange={(e)=>{
                        if(object === "e-mail") setUser({...user, email:e.target.value})
                        else if(object === "password") setUser({...user, password:e.target.value})
                        else if(object === "username") setUser({...user, name:e.target.value})
                        else setUser({...user, picture:e.target.value})
                        }} placeholder={object}/>)}
                    <button disabled={disable} type="submit">Sign Up</button>
                    <button disabled={disable} type="button" onClick={()=>navigate("/")}>Switch back to log in</button>
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


}