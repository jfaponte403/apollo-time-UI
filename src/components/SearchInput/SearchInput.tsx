import React from 'react';
import { Form } from 'react-bootstrap';

interface SearchInputProps {
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = "Search..." }) => {
    return (
        <Form.Group controlId="search-input">
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                aria-label="Search input"
            />
        </Form.Group>
    );
};

export default SearchInput;
