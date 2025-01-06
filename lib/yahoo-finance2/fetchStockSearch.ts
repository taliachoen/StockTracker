import yahooFinance from "yahoo-finance2";

export default async function fetchStockSearch(
  ticker: string,
  newsCount: number = 5
) {
  try {
   const response = await yahooFinance.search(ticker, {
      quotesCount: 1,
      newsCount: newsCount,
      enableFuzzyQuery: true,
    });

    return response;
  } catch (error) {
    console.log("Failed to fetch stock Search", error);
    throw new Error("Failed To Fetch stock Search");
  }
}
