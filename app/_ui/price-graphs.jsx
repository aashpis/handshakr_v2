export default function PriceGraphs({ histogramUrl, medianGraphUrl }) {
    if (!histogramUrl && !medianGraphUrl) return null;
  
    return (
      <div className="mt-6 flex flex-col gap-4">
        {histogramUrl && (
          <img src={histogramUrl} alt="Price Histogram" className="rounded shadow" />
        )}
        {medianGraphUrl && (
          <img src={medianGraphUrl} alt="Median Weekly Prices" className="rounded shadow" />
        )}
      </div>
    );
  }
  