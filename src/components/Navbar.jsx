import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/Theme.context";
import { useContext } from "react";

const Navbar = () => {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return <nav className={`Navbar ${theme}`}>
        <ul>
            <NavLink className={({isActive}) => (isActive ? 'selected' : '')} to="/">Home</NavLink>
            <NavLink className={({isActive}) => (isActive ? 'selected' : '')} to="/livros">Livros</NavLink>
            <NavLink className={({isActive}) => (isActive ? 'selected' : '')} to="/comunidade">Comunidade</NavLink>
            <NavLink className={({isActive}) => (isActive ? 'selected' : '')} to="/projects">Projects</NavLink>
        </ul>
        
        <button onClick={toggleTheme}>
        {theme === 'light' ? 'dark' : 'light'}
        </button>
    </nav>
};

export default Navbar;
