import { useState, useRef } from "react";
import plusIcon from "../../image/plus.png";
import { Icon } from "../NavigationBar";
import styled from "styled-components";
import EnterCaption from "./EnterCaption";

const CloseBtn = styled.button`
    color:white;
    background:inherit;
    border:0;
    position:fixed;
    top:80px;
    right:15px;
    font-size:30px;
    z-index: 2;
`;

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
    left:0px;
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
interface iFlexBox {
    flexDirection?: string;
}
const FlexBox = styled.div<iFlexBox>`
    display:flex;
    flex-direction:column;
    flex-direction: ${props => props.flexDirection};
`;
const TopBox = styled(FlexBox)`
    color:inherit;
    width:100%;
    border-bottom:1px solid rgba(138, 124, 124, 0.562);
    text-align: center;
`;
interface iSpan {
    marginLeft?: string;
}
const Span = styled.span<iSpan>`
    color:${props => props.theme.textColor};
    width:100%;
    padding-bottom:10px;
    margin-top:10px;
    margin-left:${props => props.marginLeft};
    font-size:18px;
    text-align: center;
`;
const UploadBtn = styled.button`
    background:inherit;
    color: ${props => props.theme.accentColor};
    border:0;
    font-weight:600;
    width:80px;
`;
const Btn = styled.button`
    background-color: ${props => props.theme.accentColor};
    height: 30px;
    width:100px;
    color: ${props => props.theme.bgColor};
    font-weight:600;
`;
const Box = styled.div`
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;    
`;
interface iForm {
    files?: FileList | null;
};

function Upload() {
    const [uploadbox, setUploadbox] = useState(false);
    const toggleUploadBox = () => {
        setUploadbox(!uploadbox);
    };
    const [submit, setSubmit] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);
    const onClick = () => {
        fileRef.current?.click();
    };
    const [formState, setFormState] = useState<iForm>();
    const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.length) {
            return;
        }
        setFormState((formData: any) => ({
            ...formData,
            files: event.target.files
        }));
        setSubmit(true);
    }
    const postUpload = () => {
        setUploadbox(!uploadbox);
        setSubmit(false);
    };
    return (
        <>
            <Icon src={plusIcon} onClick={toggleUploadBox} />
            {
                uploadbox ? (
                    <>
                        <CloseBtn onClick={toggleUploadBox}>X</CloseBtn>
                        <Full></Full>
                        <Container>
                            {!submit ?
                                <InnerContainer>
                                    <TopBox flexDirection="row">
                                        <Span>새 게시물 만들기</Span>
                                    </TopBox>
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
                                :
                                <InnerContainer
                                    maxHeight="500px"
                                    height="75vw"
                                    maxWidth="800px"
                                    width="85%">
                                    <TopBox flexDirection="row">
                                        <Span marginLeft="80px">새 게시물 만들기</Span>
                                        <UploadBtn onClick={postUpload}>업로드</UploadBtn>
                                    </TopBox>
                                    <EnterCaption />
                                </InnerContainer>
                            }
                        </Container>
                    </>
                ) : null
            }
        </>
    );
};

export default Upload;