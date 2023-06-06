import { DeleteContainer,TabDelete,ButtonDelete ,TextDelete} from "./style";
export default function Delete({setShowDelete}) {


        function DeletePoster(){
            alert("ainda vai ter req para deletas espera e verás")
            setShowDelete(false)
        }

    return(
        <DeleteContainer>
            <TabDelete>
                <TextDelete>
                Are you sure you want to delete this post?
                </TextDelete>
                <div>
                <ButtonDelete backcolor={"#1877F2"}
                 letterColor={"#FFFFFF"}
                  onClick={()=>setShowDelete(false)}
                  >No, go back
                  </ButtonDelete>
                <ButtonDelete
                 backcolor ={"#FFFFFF"}
                 letterColor={"#1877F2"}
                 onClick={DeletePoster}
                 >
                    Yes, delete it 
                 </ButtonDelete>
                </div>
                
            </TabDelete>

            
        </DeleteContainer>
    )
}