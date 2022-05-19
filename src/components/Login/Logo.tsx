import logoImg from '../../image/logo2.png';
import { InnerTitle, LogoBox, LogoImg } from "./LoginForm";

function Logo() {
    return (
        <LogoBox>
            <InnerTitle>Inspacegram</InnerTitle>
            <LogoImg src={logoImg} alt=" " />
        </LogoBox>
    );
}

export default Logo;