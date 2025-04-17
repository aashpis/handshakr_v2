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
  const [itemName, setItemName] = useState('');

  async function handleSubmit(inputItemName: string) {
    setLoading(true);
    setError('');
    setItemName(inputItemName);
    setPriceData(null);
    setHistogramUrl('');
    setMedianGraphUrl('');

    try {
      const [statsRes, histRes, medianRes] = await Promise.all([
        fetchPriceStats(inputItemName),
        fetchPriceHistogram(inputItemName),
        fetchMedianPriceGraph(inputItemName),
      ]);

      // Check if all requests were successful
      if (!statsRes.success || !histRes.success || !medianRes.success) {
        const errorMessage = statsRes.error || histRes.error || medianRes.error || 'One or more requests failed';
        throw new Error(errorMessage);
      }


      console.log("[statsRes.data]", statsRes.data);
      const [itemName, stats] = statsRes.data;
      
      console.log("itemName" , itemName);
      console.log("stats.max" ,stats.max);
      console.log("stats.mean" ,stats.mean);
      console.log("stats.median" ,stats.median);
      console.log("stats.min" ,stats.min);

      setItemName(itemName);
      setPriceData({
        max: stats.max,
        mean: stats.mean,
        median: stats.median,
        min: stats.min,
      });

      // Set graph URLs
      setHistogramUrl(histRes.data || '');
      setMedianGraphUrl(medianRes.data || '');

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to fetch analysis. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
      <PriceInputForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <p className="text-warning text-center mt-4 font-semibold">
          {error}
        </p>
      )}

      {priceData && (
        <PriceStatsCard
          itemName={itemName}
          max={priceData.max}
          mean={priceData.mean}
          median={priceData.median}
          min={priceData.min}
        />
      )}

      <PriceGraphs
        histogramUrl={histogramUrl}
        medianGraphUrl={medianGraphUrl}
      />
    </div>
  );
}