import { useState, useEffect } from "react";

const useViewport = (): number => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowResize = (): void => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return width;
};
export default useViewport;
