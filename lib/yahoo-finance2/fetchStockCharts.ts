import { Interval } from "@/types/yahoo-finance";
import yahooFinance from "yahoo-finance2";

export async function fetchChartData(
  ticker: string,
  range: string,
  interval: Interval
) {
  try {
    const currentDate = new Date();
    let form;
    currentDate.setDate(currentDate.getDate() - 1);
    form = currentDate.toISOString().split("T")[0];

    const queryOptions = { period1: form, interval: interval };

    const chartData = await yahooFinance.chart(ticker, queryOptions);

    return chartData;
  } catch (error) {
    throw new Error("Failed to fetch chart data");
  }
}
