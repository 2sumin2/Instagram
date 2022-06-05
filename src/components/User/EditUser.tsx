import NavigationBar from "../NavigationBar";
import styled from "styled-components";

const ContainerBox = styled.div`
    display:flex;
    justify-content:center;
`;

const Container = styled.div`
    border:1px solid ${props => props.theme.textColor}};
    height:90vh;
    max-width:960px;
    width:100vw;
`;

function EditUser() {
    return (
        <>
            <NavigationBar />
            <ContainerBox>
                <Container></Container>
            </ContainerBox>
        </>
    );
};

export default EditUser;