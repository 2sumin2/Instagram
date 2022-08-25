import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Full = styled.div`
    height: 100vh;
    width:100vw;
    background:black;
    opacity: 80%;
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
    background:white;
    z-index: 3;
    justify-self:center;
    display:flex;
    flex-direction:column;
    align-items: center;
    overflow: hidden;
`;
const Span = styled.span`
    width:100%;
    padding-bottom:5px;
    margin-top:10px;
    font-size:18px;
    border-bottom:1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    color: black;
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

const Btn = styled.button`
    background-color: ${props => props.theme.accentColor};
    height: 30px;
    width:100px;
    color: ${props => props.theme.bgColor};
`;
interface iForm {
    files?: FileList | null;
}
const Img = styled.image`
    height:100%;
    width:100%;
    background-color:gray;
`;
const TextArea = styled.textarea`
    border:0;
`;

function FeedUpload() {
    const fileRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        fileRef.current?.click();
    };
    const [submit, setSubmit] = useState(false);
    const [formState, setFormState] = useState<iForm>();
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }
        setFormState(formData => ({
            ...formData,
            files: event.target.files
        }));
        setSubmit(true);
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
                            <TextArea></TextArea>
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
                                onChange={onChange} />
                            <Btn onClick={onClick}>파일 선택</Btn>
                        </Box>
                    </InnerContainer>
                }
            </Container>
        </>
    );
};

export default FeedUpload;