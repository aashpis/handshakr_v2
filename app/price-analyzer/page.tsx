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
      // Fetch price stats
    //   const statsRes = await fetchPriceStats(inputItemName);
    //   if (!statsRes.success || !Array.isArray(statsRes.data)) {
    //     throw new Error(statsRes.error || 'Failed to fetch price stats.');
    //   }
  
    //   const [resolvedName, stats] = statsRes.data;
    //   if (!stats || typeof stats !== 'object') {
    //     throw new Error('Malformed stats object.');
    //   }
  
    //   setItemName(resolvedName);
    //   setPriceData({
    //     max: stats.max,
    //     mean: stats.mean,
    //     median: stats.median,
    //     min: stats.min,
    //   });
  
      // Fetch histogram
      const histRes = await fetchPriceHistogram(inputItemName);
      if (!histRes.success) {
        throw new Error(histRes.error || 'Failed to fetch histogram graph.');
      }
      setHistogramUrl(histRes.data || '');
  
      // Fetch median price graph
      const medianRes = await fetchMedianPriceGraph(inputItemName);
      if (!medianRes.success) {
        throw new Error(medianRes.error || 'Failed to fetch median graph.');
      }
      setMedianGraphUrl(medianRes.data || '');
  
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to fetch analysis.');
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