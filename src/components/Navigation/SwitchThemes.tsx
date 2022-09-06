import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isLightAtom } from "../../atoms";
import Switch from "react-switch";

const SwitchBox = styled.div`
    display:flex;
    justify-content: right;
    align-items: center;
    margin-left: 5px;
`;

function SwitchThemes() {
    const [isLight, setLightAtom] = useRecoilState(isLightAtom);
    const onChange = () => {
        setLightAtom((props) => !props);
    };
    return (
        <SwitchBox>
            <Switch
                onChange={onChange}
                checked={isLight}
                handleDiameter={13}
                height={18}
                width={40}
                onColor={"#fcedee"}
                offColor={"#341941"}
                uncheckedIcon={false}
                checkedIcon={false}
                onHandleColor={"#341941"}
                offHandleColor={"#fcedee"}
            />
        </SwitchBox>
    );
}

export default SwitchThemes;