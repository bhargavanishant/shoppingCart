import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHeaderConfig, resetHeaderConfig, type HeaderConfig } from "./uiSlice";

type HeaderConfigOverrides = Partial<HeaderConfig>;

// Lets any page declaratively enable/disable header elements, e.g.
//   useHeaderConfig({ showSearch: false, showNavbar: false });
// Reverts to the default header config when the page unmounts.
export function useHeaderConfig(overrides: HeaderConfigOverrides) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setHeaderConfig(overrides));
        return () => {
            dispatch(resetHeaderConfig());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
