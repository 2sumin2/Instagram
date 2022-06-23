import { useQuery } from "react-query";
import NavigationBar from "../NavigationBar";
import styled from "styled-components";
import { ContainerBox } from "./UserStyles";
import EditUser from "./EditUser";

interface iContainer {
    columns: string;
    rows: string;
}

export const Container = styled.div<iContainer>`
    border: 2px solid ${props => props.theme.textColor};
    border-radius:20px;
    margin-top: 50px;
    min-height: 80vh;
    height:max-content;
    max-width: 960px;
    width: 100vw;
    display:grid;
    overflow: hidden;
    grid-template-columns: ${props => props.columns};
    grid-template-rows: ${props => props.rows};
    grid-gap: 2px;
    background: ${props => props.theme.textColor};
`;

function EditUserBox() {
    const getWidth = () => {
        return window.innerWidth;
    };
    const { data: width } = useQuery(
        "windowSizes",
        () => getWidth(),
        {
            refetchInterval: 100,
        }
    );
    return (
        <>
            <NavigationBar />
            <ContainerBox>
                {
                    width ?
                        width > 800 ?
                            <Container columns="1fr 3fr" rows="auto">
                                <EditUser />
                            </Container>
                            :
                            <Container rows="100px 3fr" columns="auto">
                                <EditUser />
                            </Container>
                        : <Container columns="1fr 3fr" rows="auto">
                            <EditUser />
                        </Container>
                }
            </ContainerBox>
        </>
    );
};

export default EditUserBox;