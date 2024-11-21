import React from 'react';
import { Form, Badge } from 'react-bootstrap';

interface ActiveStatusProps {
    isActive: boolean;
    onToggle: () => void;
}

const ActiveStatus: React.FC<ActiveStatusProps> = ({ isActive, onToggle }) => {
    return (
        <div>
            <Form.Switch
                id="active-status-switch"
                label={isActive ? 'Active' : 'Inactive'}
                checked={isActive}
                onChange={onToggle}
            />
            <Badge pill bg={isActive ? 'success' : 'secondary'} className="mt-2">
                {isActive ? 'Active' : 'Inactive'}
            </Badge>
        </div>
    );
};

export default ActiveStatus;
