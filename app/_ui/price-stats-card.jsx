export default function PriceStatsCard({ itemName, averagePrice, meanPrice, highSale, lowSale }) {
    return (
      <div className="bg-white p-6 text-sm rounded-lg shadow-md w-full max-w-md mx-auto">
        <div>
          <h2 className="text-primary text-xl font-bold mb-4">{itemName} Sale Prices</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Average:</span>
              <span className="text-primary font-bold">{averagePrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Median:</span>
              <span className="text-primary font-bold">{meanPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Highest:</span>
              <span className="text-primary font-bold">{highSale}</span>
            </div>
            <div className="flex justify-between">
              <span>Lowest:</span>
              <span className="text-primary font-bold">{lowSale}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  