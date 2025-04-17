'use client'

import { useState } from 'react';
import PriceStatsCard from './price-stats-card';
import { fetchPriceStats, fetchMedianPriceGraph, fetchPriceHistogram } from '@/_lib/dal';

export default function PriceChecker() {
    const [itemName, setItemName] = useState('');
    const [pending, setPending] = useState(false);
    const [error, setError] = useState < string | null > (null);
    const [stats, setStats] = useState < any | null > (null);
    const [histogramUrl, setHistogramUrl] = useState < string | null > (null);
    const [medianGraphUrl, setMedianGraphUrl] = useState < string | null > (null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        setError(null);
        setStats(null);
        setHistogramUrl(null);
        setMedianGraphUrl(null);

        try {
            const [statsRes, histogramRes, medianRes] = await Promise.all([
                fetchPriceStats(itemName),
                fetchPriceHistogram(itemName),
                fetchMedianPriceGraph(itemName)
            ]);

            if (!statsRes.success || !histogramRes.success || !medianRes.success) {
                setError("Failed to retrieve some price data.");
                return;
            }

            setStats(statsRes.data);
            setHistogramUrl(histogramRes.data);
            setMedianGraphUrl(medianRes.data);
        } catch (err) {
            setError("An unexpected error occurred.");
            console.error(err);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl font-semibold text-center mb-6">Get Price Analysis</h2>

                <div className="mb-4">
                    <label htmlFor="itemName" className="block text-sm font-medium mb-2">
                        Item Name
                    </label>
                    <input
                        id="itemName"
                        name="itemName"
                        required
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full px-4 py-2 border border-neutral-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
                    />
                </div>

                <button
                    className="w-full bg-primary text-white py-3 font-bold text-sm rounded hover:bg-primary-dark"
                    disabled={pending}
                >
                    {pending ? 'Getting Analysis...' : 'Get Price Analysis'}
                </button>

                {error && (
                    <p className="text-warning italic mt-3 text-center">{error}</p>
                )}
                {stats && (
                    <p className="text-success text-center font-semibold my-3">
                        Price Analysis Complete!
                    </p>
                )}
            </form>

            {/* Price Stats Card */}
            {stats && (
                <div className="mt-6">
                    <PriceStatsCard
                        itemName={itemName}
                        averagePrice={stats.averagePrice}
                        meanPrice={stats.medianPrice}
                        highSale={stats.highestPrice}
                        lowSale={stats.lowestPrice}
                    />
                </div>
            )}

            {/* Images */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {histogramUrl && (
                    <img
                        src={histogramUrl}
                        alt="Price Histogram"
                        className="rounded shadow w-full h-auto"
                    />
                )}
                {medianGraphUrl && (
                    <img
                        src={medianGraphUrl}
                        alt="Median Weekly Sales"
                        className="rounded shadow w-full h-auto"
                    />
                )}
            </div>
        </div>
    );
}
