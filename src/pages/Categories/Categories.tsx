import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Categories.css';
import ProductCard from '../ProductCard/ProductCard';
import { setActiveCategory, setBreadcrumbs } from '../../features/ui/uiSlice';
import Header from '../../components/Header/Header';
import { useGetCategoriesQuery, useGetProductsByCategoryQuery } from '../../services/productApi';

export default function Categories() {
    // The URL param is the single source of truth for which category is
    // selected, so any page (Navbar, Home, ProductCard...) can deep-link
    // straight into a category via `/categories/:category`.
    const { category: selectedCategory } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: categoryList = [], isLoading: isCategoriesLoading } = useGetCategoriesQuery();
    const { data, isLoading: isProductLoading } = useGetProductsByCategoryQuery(
        selectedCategory!,
        { skip: !selectedCategory }
    );
    const productList = data?.products ?? [];
    const selectedProductCount = data?.total ?? 0;

    // If we land on /categories with no category chosen (e.g. via Navbar),
    // default to the first category. Deep links from Home that already
    // specify a category are left untouched.
    useEffect(() => {
        if (!selectedCategory && categoryList.length > 0) {
            navigate(`/categories/${categoryList[0]}`, { replace: true });
        }
    }, [selectedCategory, categoryList, navigate]);

    // Publish the active category + breadcrumb trail to the shared ui slice
    // so Header/Navbar/Breadcrumbs (and any future consumer) stay in sync.
    useEffect(() => {
        dispatch(setActiveCategory(selectedCategory ?? null));
        dispatch(setBreadcrumbs(
            selectedCategory
                ? [
                    { label: "Home", path: "/" },
                    { label: selectedCategory, path: `/categories/${selectedCategory}` },
                ]
                : []
        ));
    }, [selectedCategory, dispatch]);

    const selectCategory = (value: string) => {
        if (!value || value === selectedCategory) return;
        navigate(`/categories/${value}`);
    };

    return (<>
        <Header />
        <section className="categories-page">
            <aside>
                <>
                <h2 className='category-header'>Categories</h2>
                {isCategoriesLoading ? (
                    <p className='loading-categories'>Loading Categories...</p>
                ) : (
                    <ul className="category-list">
                        {categoryList.map((category, index: number) => (
                            <li
                                id={category}
                                key={index}
                                className={`category-item ${category === selectedCategory ? 'active' : ''}`}
                                onClick={() => selectCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                )}
                </>
                <>
                <h2 className='category-header'>Price</h2>
                </>
            </aside>
            <aside>
                <div className="product-category-row">
                    <div>
                        <h3 className="product-category-title">{selectedCategory}</h3>
                        <div className="product-category-count">{selectedProductCount} products found</div>
                    </div>
                    <div className="product-sort-filters-container">
                        <span className="sort-by">Sort by</span>
                        <select className='sort-by-dropdown'>
                            <option value="popularity">Popularity</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
                {isProductLoading ? (
                    <h2>Loading Products...</h2>
                ) : (
                    <div className="product-display">
                        {productList.map((product) =>
                            <ProductCard key={product.id} {...product} />
                        )}
                    </div>)}
            </aside>
        </section>
    </>
    );
}
