import styled from "styled-components";

const Img = styled.div`
    height:30vw;
    max-height:250px;
    width:30vw;
    max-width:250px;
    background-color: #8b8b8b;
`;

function Photo() {
    return (
        <Img></Img>
    );
};

export default Photo;