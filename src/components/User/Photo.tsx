import styled from "styled-components";

const Img = styled.div`
    height:31vw;
    max-height:245px;
    width:31vw;
    max-width:245px;
    background-color: #8b8b8b;
    border-radius:5px;
    overflow: hidden;
`;

function Photo() {
    return (
        <Img></Img>
    );
};

export default Photo;