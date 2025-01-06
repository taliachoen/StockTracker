import yahooFinance from "yahoo-finance2";

const keysToDisplay = [
  { key: "open", title: "Open" },
  { key: "dayHigh", title: "High" },
  { key: "dayLow", title: "Low" },
  { key: "volume", title: "Vol" , formatNumber:true},
  { key: "marketCap", title: "Mkt cap" , formatNumber:true },
  { key: "fiftyTwoWeekHigh", title: "52W High" },
  { key: "fiftyTwoWeekLow", title: "52W Low" },
  { key: "beta", title: "Beta" },
  { key: "previousClose", title: "Prev Close" },
];

type Props = {
  ticker: string;
};

export default async function FinanceSummary({ ticker }: Props) {
  const { summaryDetail } = await yahooFinance.quoteSummary(ticker, {
    modules: ["summaryDetail"],
  });

  if (!summaryDetail) return <div>Data Not Available</div>;

  return (
    <div className="grid grid-flow-col grid-rows-6 gap-4 md:grid-rows-3">
      {keysToDisplay.map((item) => {

       const value = item.formatNumber ?
        Number(summaryDetail[item.key]).toLocaleString("en-US")
         : summaryDetail[item.key];

       return <div
          className="flex flex-row items-center justify-between font-medium"
          key={item.key}
        >
          <span className="text-muted-foreground">{item.title}</span>
          <span>{value}</span>
        </div>
})}
    </div>
  );
}
