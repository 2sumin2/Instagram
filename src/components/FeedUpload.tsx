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
const InnerContainer = styled.div`
    max-height: 700px;
    height: 75vw;
    max-width:700px;
    width:65%;
    border-radius:5%;
    background:white;
    z-index: 3;
    justify-self:center;
    display:flex;
    flex-direction:column;
    align-items: center;
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

const Btn = styled.button`
    background-color: ${props => props.theme.accentColor};
    height: 30px;
    width:100px;
    color: ${props => props.theme.bgColor};
`;

function FeedUpload() {
    return (
        <>
            <Full></Full>
            <Container>
                <InnerContainer>
                    <Span>새 게시물 만들기</Span>
                    <Box>
                        <Btn>파일 선택</Btn>
                    </Box>
                </InnerContainer>
            </Container>
        </>
    );
};

export default FeedUpload;