import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import "./style.css";

const Header = ({ history, model }) => {
    return (
        <header id="main-header">
            <nav id="menu">
                <ul>
                    <li>
                        <Link
                            activeClass="active"
                            to="brands"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={800}
                            onClick={() => { model({ 'modelo': "carros" }) }}>
                            carros
                            </Link>
                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="brands"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={800}
                            onClick={() => { model({ 'modelo': "motos" }) }}>
                            motos
                            </Link>

                    </li>
                    <li>
                        <Link
                            activeClass="active"
                            to="brands"
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={800}
                            onClick={() => { model({ 'modelo': "caminhoes" }) }}>
                            caminhões
                            </Link>
                    </li>
                    <li> <a onClick={() => { history.push('/favoritos') }}>Favoritos</a></li>
                </ul>
            </nav>
            <div className="logo-laborit">

            </div>
        </header>
    )

};

export default Header;