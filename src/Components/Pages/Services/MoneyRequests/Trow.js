import React from 'react';

const Trow = ({ propkey, value }) => {
    return (
        <tr>
            <td>{propkey}</td>
            <td>{value}</td>
        </tr>
    );
};

export default Trow;