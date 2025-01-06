import yahooFinance from "yahoo-finance2";
import type { Interval } from "../../types/yahoo-finance";
import { fetchChartData } from "@/lib/yahoo-finance2/fetchStockCharts";
import AreaClosedChart from "./AreaClosedChart";

type Props = {
  ticker: string;
  range: string;
  interval: Interval;
};

// ticker , Period
export default async function MarketsChart({ interval, range, ticker }: Props) {
  const chartData = await fetchChartData(ticker, range, interval);
  const quoteData = await yahooFinance.quote(ticker);

  const [chart, quote] = await Promise.all([chartData, quoteData]);

  const stockQuotes = chart.quotes
    ? chart.quotes.map((quote) => ({ date: quote.date, close: quote.close }))
    : [];

  return (
    <div>
      <div className="mb-0.5 font-medium">
        {quote.shortName} {quote.symbol}{" "}
        {quote.regularMarketPrice?.toLocaleString(undefined, {
          style: "currency",
          currency: quote.currency,
        })}
      </div>
      {chart.quotes.length > 0 ? (
        <AreaClosedChart chartQuotes={stockQuotes} range={range} />
      ) : (
        <div> No Data Avaliable</div>
      )}
    </div>
  );
}
