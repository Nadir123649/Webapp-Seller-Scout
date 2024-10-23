import React from 'react'
import { BsCopy } from 'react-icons/bs';
import toast from "react-hot-toast";

interface CopyTextProps {
    value: any;
    show?: boolean;
}
const CopyText = ({ value, show }: CopyTextProps) => {

    const handleCopy = (text: any) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success('Text copied to clipboard:', text);
            })
            .catch((error) => {
                toast.error('Error copying text to clipboard:', error);
            });
    };

    return (
        <>
            {show &&
                (<span>
                    {value}
                </span>)
            }
            <BsCopy
                className="share-options"
                onClick={() => handleCopy(value)}
                style={{
                    transition: 'transform 0.2s ease',
                }}
            />
        </>
    )
}

export default CopyText