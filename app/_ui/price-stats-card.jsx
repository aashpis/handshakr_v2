export default function PriceStatsCard({ itemName, max, mean, median, min }) {
  return (
    <div className="bg-white p-6 text-sm rounded-lg shadow-md w-full max-w-md mx-auto">
      <div>
        <h2 className="text-primary text-xl font-bold mb-4">{itemName} Recent Sale Price Stats</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Average:</span>
            <span className="text-primary font-bold">{Number(mean).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Median:</span>
            <span className="text-primary font-bold">{Number(median).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Highest:</span>
            <span className="text-primary font-bold">{Number(max).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Lowest:</span>
            <span className="text-primary font-bold">{Number(min).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
