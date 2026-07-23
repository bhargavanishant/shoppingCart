import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

export default function Navbar() {
    const activeCategory = useSelector((state: RootState) => state.ui.activeCategory);

    const categoriesPath = activeCategory ? `/categories/${activeCategory}` : '/categories';

    return (
        <nav className="nav-bar">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
            <NavLink
                to={categoriesPath}
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                Categories</NavLink>
        </nav>
    );
}