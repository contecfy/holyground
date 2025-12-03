'use client';

import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import Input from './input';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (value: string) => void;
    className?: string;
}

const SearchBar = ({
    placeholder = "Search verses, topics, or users...",
    value: controlledValue,
    onChange,
    onSearch,
    className = ""
}: SearchBarProps) => {
    const [internalValue, setInternalValue] = useState('');
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch && value) {
            onSearch(value);
        }
    };

    const handleSearch = () => {
        if (onSearch && value) {
            onSearch(value);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                leftIcon={<Search size={18} className="text-[#6b5d4a]" />}
                variant="filled"
                className="pr-12"
            />
            {value && (
                <button
                    onClick={handleSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b6f47] hover:text-[#5d4a2f] transition-colors"
                >
                    <ArrowRight size={18} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;

