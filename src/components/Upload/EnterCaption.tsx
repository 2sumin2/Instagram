import { useEffect, useState } from "react";
import styled from "styled-components";
import UserName from "../User/FindMe";

interface iFlexBox {
    flexDirection?: string;
}
const FlexBox = styled.div<iFlexBox>`
    display:flex;
    flex-direction:column;
    flex-direction: ${props => props.flexDirection};
`;
const SecondBox = styled.div`
    height:100%;
    width:100%;
    display:grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr;
    overflow: hidden;
`;
interface iForm {
    files?: FileList | null;
}
const Img = styled.img`
    height:100%;
    width:100%;
    background-color:#788cc2;
`;
const NameTage = styled.span`
    color:${props => props.theme.textColor};
    padding:10px;
`;
const TextArea = styled.textarea`
    border:0;
    background:${props => props.theme.bgColor};
    height:100%;
    padding:10px;
    resize:none;
    :focus{
        outline:none;
    }
`;
const TagSearch = styled.div`
    background:${props => props.theme.bgColor};
    border-top:1px solid rgba(138, 124, 124, 0.562);
    height:100%;
    padding:10px;
    overflow: auto;
    display:flex;
    flex-direction:column;
`;


function EnterCaption() {
    const myname = UserName();
    const [formState, setFormState] = useState<iForm>();
    var [word, setWord] = useState("");
    const onChange = (event: { target: { value: any; }; }) => {
        var localWord = "";
        for (var i = 1; i < event.target.value.length; i++) {
            if (event.target.value[i - 1] === "#") {
                localWord = "";
                for (var j = 0; event.target.value[i + j] !== " " && i + j < event.target.value.length; j++) {
                    localWord += event.target.value[i + j];
                }
                console.log(localWord);
                setWord(localWord);
            }
            if (event.target.value[i - 1] === " ") {
                setWord("");
            }
        }
    }
    useEffect(() => {
        console.log(formState);
    }, [formState]);
    return (
        <SecondBox>
            <Img />
            <FlexBox>
                <NameTage>{myname}</NameTage>
                <TextArea
                    placeholder="문구 입력..."
                    onChange={onChange} />
                {word !== "" ? <TagSearch>{word}</TagSearch> : null}
            </FlexBox>
        </SecondBox>
    );
};

export default EnterCaption;