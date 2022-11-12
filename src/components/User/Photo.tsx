import styled from "styled-components";

const Img = styled.div`
    height:31vw;
    max-height:245px;
    width:31vw;
    max-width:245px;
    background-color: #8b8b8b;
    border-radius:5px;
    overflow: hidden;
    img{
        height:100%;
        width:100%;
        object-fit: cover;
    }
`;
interface iPhoto {
    id?: number;
    file?: string;
    caption?: string;
    username?: string;
};

function Photo({ id, file, caption, username }: iPhoto) {
    return (
        <Img><img src={file} /></Img>
    );
};

export default Photo;