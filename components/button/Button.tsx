"use client"

import Loader, { TYPE } from "./Loader";

interface ButtonProps {
    lable: string;
    action?: any;
    buttonStyle?: string;
    wraperStyle?: string;
    loading?: boolean;
}

function Button({ lable, action, buttonStyle, wraperStyle, loading }: ButtonProps) {

    return (
        <div className={`${wraperStyle || ''}`}>
            <button
                disabled={loading}
                className={`${buttonStyle || ''} h-12  `}
                onClick={() => {
                    action()
                }}
            >
                {loading && <Loader type={TYPE.WHITE} />}
                {!loading && lable}
            </button>
        </div>
    )
}

export default Button