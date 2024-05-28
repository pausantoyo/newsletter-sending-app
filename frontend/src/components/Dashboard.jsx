/* The `Dashboard` displays newsletter statistics. */

import React, { useEffect, useState } from 'react';
import StatisticsCard from './StatisticsCard';
import { getStatistics } from '../services/StatisticsService';
import '../styles/Dashboard.css';

function Dashboard() {
    const [statistics, setStatistics] = useState({
        totalNewsletters: 0,
        totalRecipients: 0,
        totalUnsubscriptions: 0,
        mostUnsubscribedType: '',
    });

    useEffect(() => {
        async function fetchStatistics() {
            try {
                const data = await getStatistics();
                setStatistics(data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        }
        fetchStatistics();
    }, []);

    return (
        <div className="dashboard">
            <h2>Newsletter Statistics</h2>
            <div className="statistics-cards">
                <StatisticsCard title="Newsletters Sent" value={statistics.totalNewsletters} />
                <StatisticsCard title="Subscribed Recipients" value={statistics.totalRecipients} />
                <StatisticsCard title="Unsubscriptions" value={statistics.totalUnsubscriptions} />
                <StatisticsCard title="Most Unsubscribed Type" value={statistics.mostUnsubscribedType} />
            </div>
        </div>
    );
}

export default Dashboard;
