import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

async function fetchSectorPerformance() {
  const url = `https://financialmodelingprep.com/api/v3/sector-performance?apikey=${process.env.FMP_API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) {
    const errorMessage = await res.text(); // Log the response message for debugging
    console.error("Error fetching sector performance:", errorMessage);
    throw new Error("Failed to fetch sector performance");
}  // await new Promise(resolve => setTimeout(() => {},5000))

  return res.json();
}

interface Sector {
  sector: string;
  changesPercentage: string;
}

export default async function SectorPerformance() {
  const data: Sector[] = await fetchSectorPerformance();
  // const session = await getServerSession(authOptions);
  // console.log(session)

  if (!data) {
    return null;
  }

  // Give the Average for All Sector
 const totalChangePercentage = data.reduce((total,sector) => total + (parseFloat(sector.changesPercentage)),0);

 const averageChangePrecentage = (totalChangePercentage / data.length).toFixed(2) + "%";

 data.unshift({
  changesPercentage:averageChangePrecentage,
  sector:"All Sector"
 })

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data.map((sector: Sector) => (
        <div
          key={sector.sector}
          className="flex w-full flex-row items-center justify-between text-sm"
        >
          <span className="font-medium">{sector.sector}</span>
          <span
            className={`w-[4rem] min-w-fit rounded-md px-2 py-0.5 text-right transition-colors
             ${
               parseFloat(sector.changesPercentage) > 0
                 ? "bg-gradient-to-l from-green-300 text-green-800 dark:from-green-950 dark:text-green-400"
                 : "bg-gradient-to-l from-red-300 text-red-800 dark:from-red-950 dark:text-red-500"
             }
             `}
          >
            {parseFloat(sector.changesPercentage).toFixed(2) + "%"}
          </span>
        </div>
      ))}
    </div>
  );
}
