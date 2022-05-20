import { useState } from 'react';
import { useQuery } from 'react-query';
import logoImg from '../../image/logo2.png';
import { InnerTitle, LogoBox, LogoImg } from "./LoginForm";

function Logo() {
    const [width, setWidth] = useState(window.innerWidth);
    const getWidth = () => {
        setWidth(window.innerWidth);
    };
    useQuery(
        "windowSize",
        () => getWidth(),
        {
            refetchInterval: 100,
        }
    );
    return (
        <>
            {
                width > 900 ?
                    <LogoBox>
                        <InnerTitle>Inspacegram</InnerTitle>
                        <LogoImg src={logoImg} alt=" " />
                    </LogoBox>
                    : null
            }
        </>
    );
}

export default Logo;