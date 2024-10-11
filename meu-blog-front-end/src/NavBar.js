import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Início</Link>
                </li>
                <li>
                    <Link to="/about">Sobre</Link>
                </li>
                <li>
                    <Link to="/articlelist">Artigos</Link>
                </li>
                <li>
                    <Link to="/newarticle">Cadastrar Artigo</Link>
                </li>

            </ul>
        </nav>
    )
}
export default NavBar;