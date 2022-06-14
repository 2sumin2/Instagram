import styled from "styled-components";

const Img = styled.div`
    height:32vw;
    max-height:250px;
    width:32vw;
    max-width:250px;
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