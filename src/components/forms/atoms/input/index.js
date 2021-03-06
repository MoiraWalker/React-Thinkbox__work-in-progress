import React from 'react';
import './index.scss';

export const Input = ({ type, name, accept, id, fieldRef, value, onChange }) => (
    <input
        className="input"
        type={type}
        name={name}
        id={id || name}
        ref={fieldRef}
        value={value}
        onChange={onChange}
        accept={accept}
    />
);
