'use client';

import { useState } from 'react';
import { fetchPriceStats, fetchPriceStatsTest, fetchMedianPriceGraph, fetchPriceHistogram } from '@/_lib/dal';
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
            // Execute API calls individually for easier debugging
            const statsRes = await fetchPriceStatsTest(itemName);
            console.log("Stats response:", statsRes);
            
            const histRes = await fetchPriceHistogram(itemName);
            console.log("Histogram response:", histRes);
            
            const medianRes = await fetchMedianPriceGraph(itemName);
            console.log("Median response:", medianRes);
    
            if (!statsRes.success) {
                throw new Error(`Stats request failed: ${statsRes.error}`);
            }
            
            if (!histRes.success) {
                throw new Error(`Histogram request failed: ${histRes.error}`);
            }
            
            if (!medianRes.success) {
                throw new Error(`Median graph request failed: ${medianRes.error}`);
            }
    
            // Add checks to ensure data exists and has the expected format
            if (!statsRes.data || !Array.isArray(statsRes.data) || statsRes.data.length < 2) {
                throw new Error('Invalid price stats data format');
            }
    
            const [name, stats] = statsRes.data;
            
            // Verify stats object has required properties
            if (!stats || typeof stats !== 'object' || 
                !('max' in stats) || !('mean' in stats) || 
                !('median' in stats) || !('min' in stats)) {
                throw new Error('Invalid price stats data structure');
            }
    
            setItemName(name);
            setPriceData({
                max: stats.max,
                mean: stats.mean,
                median: stats.median,
                min: stats.min,
            });
    
            // Check if histogram and median graph data exists
            if (histRes.data) {
                setHistogramUrl(histRes.data);
            } else {
                console.warn('Histogram URL is empty');
            }
    
            if (medianRes.data) {
                setMedianGraphUrl(medianRes.data);
            } else {
                console.warn('Median graph URL is empty');
            }
        } catch (err) {
            console.error("Error details:", err);
            setError('Failed to fetch analysis: ' + (err instanceof Error ? err.message : String(err)));
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