import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { CloudFog } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import Logo from "../../logo.png";
import useToken from "../../utils/hook/useToken";
import useUser from "../../utils/hook/useUser";
import { useViewport } from "../../utils/hook/useViewport";
import User from "../../utils/types/User";
import "./header.css";
import HeaderMenuDesktop from "./HeaderMenuDesktop";
import HeaderMenuMobile from "./HeaderMenuMobile";

const Header = () => {
    const { token, setToken } = useToken();
    const { isDesktop } = useViewport();
    // const [user, setUser] = useState<User>();
    const { user, isLoading, error } = token
        ? useUser(token)
        : { user: null, isLoading: false, error: true };

    const onLogOut = () => {
        setToken("");
        signOut(auth);
        window.location.reload();
    };

    return (
        <header>
            <div className="header is-flex is-justify-content-space-between is-align-items-stretch px-6">
                <div className="is-size-1 has-text-weight-bold is-uppercase">
                    <Link to="/" className="header-logo is-unselectable">
                        <figure className="image is-2by1">
                            <img src={Logo} alt="" />
                        </figure>
                    </Link>
                </div>
                {isDesktop ? (
                    <HeaderMenuDesktop user={user} onLogOut={onLogOut} />
                ) : (
                    <HeaderMenuMobile user={user} onLogOut={onLogOut} />
                )}
            </div>
        </header>
    );
};

export default Header;
