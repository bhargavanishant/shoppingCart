import "./Breadcrumbs.css";
import {useMemo} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { Breadcrumb } from "../../features/ui/uiSlice";

export default function Breadcrumbs() {
    const breadcrumbs = useSelector((state: RootState) => state.ui.breadcrumbs);
    const showBreadcrumbs = useSelector((state: RootState) => state.ui.header.showBreadcrumbs);

    if (!showBreadcrumbs || breadcrumbs.length === 0) {
        return null;
    }

    function useCategoryBreadcrumbs(category?: string): Breadcrumb[] {
        return useMemo(
            () => (category ? [{ label: "Home", path: "/" }, { label: category, path: `/categories/${category}` }] : []),
            [category]
        );
    }

    return (
        <nav aria-label="breadcrumb" className='breadcrumbs-container'>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '8px' }}>
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                        <li key={`${crumb.label}-${index}`} style={{ display: 'flex', gap: '8px', textTransform: "capitalize" }}>
                            {!isLast && crumb.path ? (
                                <Link to={crumb.path}>{crumb.label}</Link>
                            ) : (
                                <span aria-current={isLast ? 'page' : undefined}>{crumb.label}</span>
                            )}
                            {!isLast && <span aria-hidden="true">&gt;</span>}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}