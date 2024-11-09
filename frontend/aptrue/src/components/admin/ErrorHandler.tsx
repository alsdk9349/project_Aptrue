"use client";

import ErrorModal from './ErrorModal';
import { useState, useEffect } from 'react';

interface ErrorHandlerProps {
    message: string;
}

export default function ErrorHandler({ message }: ErrorHandlerProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (message) {
            setIsOpen(true);
        }
    }, [message]);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <ErrorModal 
            message={message} 
            isOpen={isOpen} 
            onClose={handleClose} 
        />
    )
}
