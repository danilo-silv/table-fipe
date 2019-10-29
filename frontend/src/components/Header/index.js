import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./style.css";

const Header = ({ history, model }) => {

    return (
        <header id="main-header">
            <nav id="menu">
                <ul>
                    <li>
                        <p onClick={() => { model({ 'modelo': "carros" }) }}>
                            <Link
                                activeClass="active"
                                to="brands"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={800}>
                                carros
                            </Link>

                        </p>
                    </li>
                    <li> <p onClick={() => { model({ 'modelo': "motos" }) }}>
                        <Link
                            activeClass="active"
                            to="brands"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={800}>
                            motos
                            </Link>
                    </p>
                    </li>
                    <li> <p onClick={() => { model({ 'modelo': "caminhoes" }) }}>
                        <Link
                            activeClass="active"
                            to="brands"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={800}>
                            caminhões
                            </Link>
                    </p>
                    </li>
                    <li> <p onClick={() => { history.push('/favoritos') }}>Favoritos</p></li>
                </ul>
            </nav>
            <div className="logo-laborit">

            </div>
        </header>
    )

};

export default Header;