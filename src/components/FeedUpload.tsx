import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import UserName from "./User/FindMe";

const Full = styled.div`
    height: 100vh;
    width:100vw;
    background:${props => props.theme.textColor};
    opacity: 50%;
    position:fixed;
    top:0;
    left:0;
    z-index: 1;
`;
const Container = styled.div`
    width:100vw;
    height:100%;
    display:flex;
    position:fixed;
    top:120px;
    justify-content: center;
    align-items: center;
    z-index: 2;
    padding-bottom:200px;
`;
interface iInnerContainer {
    maxHeight?: string;
    height?: string;
    maxWidth?: string;
    width?: string;
}
const InnerContainer = styled.div<iInnerContainer>`
    max-height: 700px;
    height: 75vw;
    max-width:700px;
    width:65%;

    max-height: ${props => props.maxHeight};
    height: ${props => props.height};
    max-width:${props => props.maxWidth};
    width:${props => props.width};

    border-radius:3%;
    background:${props => props.theme.bgColor};
    z-index: 3;
    justify-self:center;
    display:flex;
    flex-direction:column;
    align-items: center;
    overflow: hidden;
`;
const Span = styled.span`
    color:${props => props.theme.textColor};
    width:100%;
    padding-bottom:10px;
    margin-top:10px;
    font-size:18px;
    border-bottom:1px solid rgba(138, 124, 124, 0.562);
    text-align: center;
`;
const Box = styled.div`
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;    
`;

const SecondBox = styled.div`
    height:100%;
    width:100%;
    display:grid;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 1fr;
    overflow: hidden;
`;

const FlexBox = styled.div`
    display:flex;
    flex-direction:column;
`;

const Btn = styled.button`
    background-color: ${props => props.theme.accentColor};
    height: 30px;
    width:100px;
    color: ${props => props.theme.bgColor};
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

function FeedUpload() {
    const myname = UserName();
    const fileRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        fileRef.current?.click();
    };
    const [submit, setSubmit] = useState(false);
    const [formState, setFormState] = useState<iForm>();
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }
        setFormState(formData => ({
            ...formData,
            files: event.target.files
        }));
        setSubmit(true);
    }
    const onChangeTextarea = (event: { target: { value: any; }; }) => {
        var word = "";
        for (var i = 1; i < event.target.value.length; i++) {
            if (event.target.value[i - 1] === "#") {
                for (var j = 0; event.target.value[i + j] !== " " && i + j < event.target.value.length; j++) {
                    word += event.target.value[i + j];
                }
            }
        }
        console.log(word);
    }
    useEffect(() => {
        console.log(formState);
    }, [formState]);
    return (
        <>
            <Full></Full>
            <Container>
                {submit ?
                    <InnerContainer
                        maxHeight="500px"
                        height="75vw"
                        maxWidth="800px"
                        width="85%">
                        <Span>새 게시물 만들기</Span>
                        <SecondBox>
                            <Img />
                            <FlexBox>
                                <NameTage>{myname}</NameTage>
                                <TextArea
                                    placeholder="문구 입력..."
                                    onChange={onChangeTextarea} />
                            </FlexBox>
                        </SecondBox>
                    </InnerContainer> :
                    <InnerContainer>
                        <Span>새 게시물 만들기</Span>
                        <Box>
                            <input
                                ref={fileRef}
                                style={{ display: "none" }}
                                type="file"
                                accept=".png, .jpeg, .jpg"
                                onChange={onChangeInput} />
                            <Btn onClick={onClick}>파일 선택</Btn>
                        </Box>
                    </InnerContainer>
                }
            </Container>
        </>
    );
};

export default FeedUpload;