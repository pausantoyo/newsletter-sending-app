/**
 * The `StatisticsCard` function displays a title and value in a styled card
 * format.
 */

import React from 'react';

function StatisticsCard({ title, value }) {
    return (
        <div className="statistics-card">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
}

export default StatisticsCard;
