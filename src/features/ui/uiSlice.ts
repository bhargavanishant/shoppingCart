import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/categories";

export interface Breadcrumb {
    label: string;
    path?: string;
}

export interface HeaderConfig {
    showSearch: boolean;
    showNavbar: boolean;
    showBreadcrumbs: boolean;
    showCart: boolean;
}

interface UiState {
    activeCategory: string | null;
    activeProduct: Product | null;
    breadcrumbs: Breadcrumb[];
    header: HeaderConfig;
}

const defaultHeaderConfig: HeaderConfig = {
    showSearch: true,
    showNavbar: true,
    showBreadcrumbs: true,
    showCart: true
};

const initialState: UiState = {
    activeCategory: null,
    activeProduct: null,
    breadcrumbs: [],
    header: defaultHeaderConfig,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setActiveCategory(state, action: PayloadAction<string | null>) {
            state.activeCategory = action.payload;
        },

        setActiveProduct(state, action: PayloadAction<Product | null>) {
            state.activeProduct = action.payload;
        },

        setBreadcrumbs(state, action: PayloadAction<Breadcrumb[]>) {
            state.breadcrumbs = action.payload;
        },

        setHeaderConfig(state, action: PayloadAction<Partial<HeaderConfig>>) {
            state.header = { ...state.header, ...action.payload };
        },

        resetHeaderConfig(state) {
            state.header = defaultHeaderConfig;
        },
    },
});

export const {
    setActiveCategory,
    setActiveProduct,
    setBreadcrumbs,
    setHeaderConfig,
    resetHeaderConfig,
} = uiSlice.actions;

export default uiSlice.reducer;
