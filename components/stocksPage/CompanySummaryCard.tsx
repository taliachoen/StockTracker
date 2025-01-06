import yahooFinance from "yahoo-finance2";
import ReadMoreText from "./ReadMoreText";

type Props = {
  ticker: string;
};

export default async function CompanySummaryCard({ ticker }: Props) {
  const { summaryProfile } = await yahooFinance.quoteSummary(ticker, {
    modules: ["summaryProfile"],
  });

  if(!summaryProfile) return <div>No Details for This Stock!</div>

  const { country ,fullTimeEmployees , website , sector ,longBusinessSummary , industryDisp } = summaryProfile;

  return (
    <div className="group relative min-h-max overflow-hidden rounded-xl border bg-card text-card-foreground shadow">
      <div className="absolute z-0 h-full w-full bg-gradient-to-t from-neutral-50 via-neutral-200 to-neutral-50 bg-size-200 bg-pos-0 blur-2xl transition-all duration-500 group-hover:bg-pos-100 dark:from-black dark:via-blue-950 dark:to-black" />
      <div className="p-6 pt-12 z-50 flex h-full w-full flex-col items-start justify-center gap-6 py-10 text-sm lg:flex-row">
        <div className="z-50 max-w-2xl text-pretty font-medium">
            <div className="z-50 max-w-2xl text-pretty font-medium">
                <ReadMoreText text={longBusinessSummary} minText={500} />
            </div>
         {country && fullTimeEmployees &&  website &&  sector &&  industryDisp && (
            <div className="z-50 min-w-fit font-medium text-muted-foreground">
              <div>
                Sector:{" "}<span className="text-foreground">{sector}</span>
              </div>
              <div>
                Industry:{" "}<span className="text-foreground">{industryDisp}</span>
              </div>
              <div>
                Country:{" "}<span className="text-foreground">{country}</span>
              </div>
              <div>
                Employees:{" "}<span className="text-foreground">{fullTimeEmployees.toLocaleString("en-US")}</span>
              </div>
              <div>
                Website:{" "}<span className="text-foreground">{website}</span>
              </div>
            </div>
         )}

        </div>
      </div>
    </div>
  );
}
