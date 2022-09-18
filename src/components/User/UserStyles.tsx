import styled from "styled-components";

export const ContainerBox = styled.div`
    display:flex;
    justify-content:center;
    padding: 60px 0;
`;

export const GridBox = styled.div`
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: minmax(max-content, 70px);
    gap:20px;
    margin-bottom:10px;
`;

export const Menu = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: start;
    background: ${props => props.theme.bgColor};
    min-height:max-content;
`;

export const Content = styled.div`
    height: 100%;
    padding:50px;
    padding-right:70px;
    background: ${props => props.theme.bgColor};
`;

export const UserImg = styled.img`
    border-right: 1px solid gray;
    background: lightgray;
    border-radius:50%;
    height: 50px;
    width:50px;
    justify-self: right;
`;

export const EditImg = styled.button`
    margin-left:10px;
    height:40px;
    color: ${props => props.theme.accentColor};
    background:inherit;
    font-weight:600;
    border:0;
`;

export const Form = styled.form`
    display:grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: repeat(5, minmax(max-content, 50px));
    gap:20px;
`;
interface iItemSpan {
    fontsize?: string;
}
export const ItemSpan = styled.span<iItemSpan>`
    text-align: right;
    height:40px;
    align-self: center;
    min-width:max-content;
    font-size:${props => props.fontsize};
`;

export const ItemInput = styled.input`
    height:max-content;
    padding:10px;
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.textColor};
`;

export const ItemInputDisabled = styled(ItemInput)`
    opacity: 50%;
`;

export const Textarea = styled.textarea`
    min-height:40px;
    resize: vertical;
    color: ${props => props.theme.textColor};
    background: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.textColor};
    padding:10px;
`;
//width:45vw;
//max - width: 450px;
export const Submit = styled.button`
    background: ${props => props.theme.accentColor};
    margin-top:50px;
    height:35px;
    width:100px;
    color: ${props => props.theme.bgColor};
    justify-self: right;
    font-weight:600;
`;