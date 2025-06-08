import React, { useState } from "react";
import Star from "./Star";
import styles from "./StarRating.module.css";

type Props = {
    maxRating?: number;
    defaultRating?: number;
    color?: string;
    size?: number;
    messages?: string[];
    className?: string;
    onSetRating?: (rating: number) => void;
};

const StarRating = ({
    maxRating = 5,
    color = "#fcc419",
    size = 48,
    className = "",
    messages = [],
    defaultRating = 0,
    onSetRating,
}: Props) => {
    const [rating, setRating] = useState<number>(defaultRating);
    const [tempRating, setTempRating] = useState<number>(0);

    function handleRating(rating: number) {
        setRating(rating);
        if (onSetRating) onSetRating(rating);
    }

    return (
        <div className={`${styles.containerStyle} ${className}`}>
            <div className={`${styles.starContainerStyle}`}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                        full={
                            tempRating ? tempRating >= i + 1 : rating >= i + 1
                        }
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            <p
                style={{
                    lineHeight: "1",
                    margin: "0",
                    color,
                    fontSize: `${size / 1.5}px`,
                }}
            >
                {messages.length === maxRating
                    ? messages[tempRating ? tempRating - 1 : rating - 1]
                    : tempRating || rating || ""}
            </p>
        </div>
    );
};

export default StarRating;
