import type { HeaderConfig } from "./uiSlice";

export const HEADER_CONFIG_BY_ROUTE: Record<string, HeaderConfig> = {
  "/": { showSearch: true, showNavbar: true, showBreadcrumbs: false, showCart: true, showLogin: true },
  "/categories": { showSearch: true, showNavbar: false, showBreadcrumbs: true, showCart: true, showLogin: true },
  "/products": { showSearch: true, showNavbar: false, showBreadcrumbs: true, showCart: true, showLogin: true  },
  "/cart": { showSearch: true, showNavbar: false, showBreadcrumbs: false, showCart: true, showLogin: true  },
  "/checkout": { showSearch: false, showNavbar: false, showBreadcrumbs: false, showCart: false, showLogin: false },
  "/login": { showSearch: false, showNavbar: false, showBreadcrumbs: false, showCart: false, showLogin: true },
};

export function getHeaderConfig(pathname: string): HeaderConfig {

  if (pathname.startsWith("/products")) {
    return HEADER_CONFIG_BY_ROUTE["/products"];
  }

  if (pathname.startsWith("/categories")) {
    return HEADER_CONFIG_BY_ROUTE["/categories"];
  }

  if (pathname.startsWith("/cart")) {
    return HEADER_CONFIG_BY_ROUTE["/cart"];
  }

  if (pathname.startsWith("/checkout")) {
    return HEADER_CONFIG_BY_ROUTE["/checkout"];
  }

  if (pathname.startsWith("/login")) {
    return HEADER_CONFIG_BY_ROUTE["/login"];
  }

  return HEADER_CONFIG_BY_ROUTE["/"];
}