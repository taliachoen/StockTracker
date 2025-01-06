import CompanySummaryCard from "@/components/stocksPage/CompanySummaryCard";
import FinanceSummary from "@/components/stocksPage/FinanceSummary";
import News from "@/components/stocksPage/News";
import { Suspense } from "react";

export default function StocksPage({ params }: { params: { ticker: string } }) {
  const ticker = params.ticker;
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 space-y-10 pt-6 lg:px-40 lg:py-14">
      <Suspense
          fallback={
            <div className="flex h-[20rem] items-center justify-center text-muted-foreground ">
              Loading...
            </div>
          }
        >
          <FinanceSummary ticker={ticker} />
        </Suspense>
        <Suspense
          fallback={
            <div className="flex h-[20rem] items-center justify-center text-muted-foreground ">
              Loading...
            </div>
          }
        >
          <CompanySummaryCard ticker={ticker} />
        </Suspense>
        <Suspense
          fallback={
            <div className="flex h-[20rem] items-center justify-center text-muted-foreground ">
              Loading...
            </div>
          }
        >
          <News ticker={ticker} />
        </Suspense>
      </div>
    </div>
  );
}
