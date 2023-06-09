import axios from "axios";
import { DeleteContainer, TabDelete, ButtonDelete, TextDelete } from "./style";
import { useContext, useState } from "react";
import { UserContext } from "../../ContextAPI/ContextUser";
import { ThreeDots } from "react-loader-spinner";
export default function Delete({ setActiveDelete, postId, setCt, ct}) {
    const { userInfo } = useContext(UserContext)
    const [disable, setDisable] = useState(false)
    function DeletePoster() {
        setDisable(true)
        axios.delete(process.env.REACT_APP_API_URL + "/posts", {
            headers: {
                Authorization: userInfo.token
            },
            data: {
                postId
            }
        }).then(res => {
            setActiveDelete(false)
            setDisable(false)
            setCt(ct+1)
        }).catch(err => {
            setActiveDelete(false)
            setDisable(false)
            alert(err.response.data)
        })
    }

    return (
        <DeleteContainer>
            <TabDelete>
                <TextDelete>
                    Are you sure you want to delete this post?
                </TextDelete>
                <div>
                    <ButtonDelete backcolor={"#1877F2"}
                        letterColor={"#FFFFFF"}
                        data-test="cancel"
                        disabled={disable}
                        onClick={() => setActiveDelete(false)}
                    >{disable ? <ThreeDots color="white" /> : "No, go back"}
                    </ButtonDelete>
                    <ButtonDelete
                        data-test="confirm"
                        disabled={disable}
                        backcolor={"#FFFFFF"}
                        letterColor={"#1877F2"}
                        onClick={() => DeletePoster()}
                    >
                        {disable ? <ThreeDots color="#1555FF" /> : "Yes, delete it "}

                    </ButtonDelete>
                </div>

            </TabDelete>


        </DeleteContainer>
    )
}