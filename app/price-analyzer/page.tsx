'use client';

import { useState } from 'react';
import { fetchPriceStats, fetchMedianPriceGraph, fetchPriceHistogram } from '@/_lib/dal';
import PriceInputForm from '@/_ui/price-input-form';
import PriceStatsCard from '@/_ui/price-stats-card';
import PriceGraphs from '@/_ui/price-graphs';
import { PriceStats } from '@/_lib/definitions';

export default function Page() {
    const [priceData, setPriceData] = useState<PriceStats | null>(null);
    const [histogramUrl, setHistogramUrl] = useState('');
    const [medianGraphUrl, setMedianGraphUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [itemName , setItemName] = useState('');

    async function handleSubmit(itemName: string) {
        setLoading(true);
        setError('');
        setPriceData(null);
        setItemName(itemName);
        try {
            const [statsRes, histRes, medianRes] = await Promise.all([
                fetchPriceStats(itemName),
                fetchPriceHistogram(itemName),
                fetchMedianPriceGraph(itemName),
            ]);

            if (!statsRes.success || !histRes.success || !medianRes.success) {
                throw new Error('One or more requests failed');
            }


            const [name, stats] = statsRes.data; //unpack array

            setItemName(name);
            setPriceData({
              max: stats.max,
              mean: stats.mean,
              median: stats.median,
              min: stats.min,
            });

            setHistogramUrl(histRes.data || '');
            setMedianGraphUrl(medianRes.data || '');
        } catch (err) {
            console.error(err);
            setError('Failed to fetch analysis.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
            <PriceInputForm onSubmit={handleSubmit} loading={loading} />
            {error && <p className="text-warning text-center mt-4">{error}</p>}
            {priceData && (
                <PriceStatsCard
                    itemName={itemName}
                    max={priceData.max}
                    mean={priceData.mean}
                    median={priceData.median}
                    min={priceData.min}
                />
            )}
            <PriceGraphs histogramUrl={histogramUrl} medianGraphUrl={medianGraphUrl} />
        </div>
    );
}