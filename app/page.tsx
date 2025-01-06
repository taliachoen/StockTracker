import SectorPerformance from "@/components/stock/SectorPerformance";
import { columns } from "@/components/table/Columns";
import DataTable from "@/components/table/DataTable";
import MarketsChart from "@/components/ui/MarketsChart";
import { getMarketSentiment, tickerAfterOpen } from "@/constant";
import fetchStockSearch from "@/lib/yahoo-finance2/fetchStockSearch";
import Link from "next/link";
import { Suspense } from "react";
import yahooFinance from "yahoo-finance2";
import { Range } from "@/types/yahoo-finance";
import { DEFAULT_RANGE ,  VALID_RANGES } from "@/lib/yahoo-finance2/constants";

export const validateRange = (range: string): Range =>
  VALID_RANGES.includes(range as Range) ? (range as Range) : DEFAULT_RANGE

export default async function Home() {
  const tickers = tickerAfterOpen;

  const ticker = tickers[0].symbol;
  const range = validateRange(DEFAULT_RANGE);
    const interval = "1m"

  const news = await fetchStockSearch("^DJI", 1);

  const promises = tickers.map(({ symbol }) =>
    yahooFinance.quoteCombine(symbol)
  );

  const results = await Promise.all(promises);

  const resultsWithTitles = results.map((result, index) => ({
    ...result,
    shortName: tickers[index].shortName,
  }));

  const marketSentiment = getMarketSentiment(
    resultsWithTitles[2].regularMarketChangePercent
  );

  const sentimentColor =
    marketSentiment === "bullish"
      ? "text-green-500"
      : marketSentiment === "bearish"
      ? "text-red-500"
      : "text-neutral-500";

  const sentimentBackground =
    marketSentiment === "bullish"
      ? "bg-green-500/10"
      : marketSentiment === "bearish"
      ? "bg-red-300/50 dark:bg-red-950/50"
      : "bg-neutral-500/10";

  return (
    <main>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div
              className={`rounded-xl border bg-card text-card-foreground shadow
                relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden`}
            >
              {/* News Data From Search API */}
              <div className={"flex flex-col space-y-1.5 p-6"}>
                <h3
                  className={`font-semibold leading-none tracking-tight
                    "z-50 w-fit rounded-full px-4  py-2 dark:bg-neutral-100/5`}
                >
                  The Market are{" "}
                  <strong className={sentimentColor}>{marketSentiment}</strong>
                </h3>
              </div>
              {news.news[0] && (
                <div className="flex p-6 pt-0 flex-col items-start">
                  <p className="mb-2 text-sm font-semibold text-neutral-500 dark:text-neutral-500">
                    What you need to know today
                  </p>
                  <Link
                    className="text-lg font-extrabold"
                    href={news.news[0].link}
                  >
                    {news.news[0].title}
                  </Link>
                </div>
              )}
              <div
                className={`pointer-events-none absolute inset-0 z-0 h-[65%] w-[65%] -translate-x-[10%] -translate-y-[30%] rounded-full blur-3xl ${sentimentBackground}`}
              />
            </div>
          </div>
          {/* Scetor Performance */}
          <div className="w-full lg-w-1/2">
            <div className="rounded-xl border bg-card text-card-foreground shadow">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight text-lg">
                  Sector Performance
                </h3>
              </div>
              <div className="p-6 pt-0">
                {/* Sector Component */}
                <Suspense fallback={<div>Loading...</div>}>
                  <SectorPerformance />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div>
          <h2 className="py-4 text-xl font-medium">Markets</h2>
          <div
            className={`rounded-xl border bg-card text-card-foreground shadow
              flex flex-col gap-4 p-6 lg:flex-row`}
          >
            {/* DataTable */}
            <div className="w-full lg:w-1/2">
              <DataTable data={resultsWithTitles} />
            </div>

            {/* DataTable */}
            <div className="w-full lg:w-1/2">
            <Suspense fallback={<div>Loading...</div>}>
              <MarketsChart interval={interval} range={range} ticker={ticker} />
            </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
