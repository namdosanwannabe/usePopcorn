import { useEffect } from "react";

export default function useKey(key: string, action: () => void) {
    useEffect(() => {
        const callback = (e: KeyboardEvent) => {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action?.();
            }
        };

        document.addEventListener("keydown", callback);

        return () => {
            document.removeEventListener("keydown", callback);
        };
    }, [key, action]);
}
