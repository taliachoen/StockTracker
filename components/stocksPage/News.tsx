import fetchStockSearch from "@/lib/yahoo-finance2/fetchStockSearch";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

function timeAgo(publishTime: Date) {
    const publishDate = new Date(publishTime).getTime();
    const now = new Date().getTime();
    
    const diffInMinutes = differenceInMinutes(now,publishDate);
    const diffInHours = differenceInHours(now,publishDate);
    const diffInDays = differenceInDays(now,publishDate);


    if(diffInMinutes < 60){
        return `${diffInMinutes} minutes ago`
    }
    else if(diffInHours < 24){
        return `${diffInHours} hours ago`
    }
    else {
        return `${diffInDays} days ago`
    }
}

type Props = {
  ticker: string;
};
export default async function News({ ticker }: Props) {
  const newsData = await fetchStockSearch(ticker);
  const url = `https://finance.yahoo.com/quote/${ticker}`;

  return (
    <div className="w-4/5">
      {!newsData.news.length && (
        <div className="py-4 text-center text-sm font-medium text-muted-foreground">
          No Recent Stories
        </div>
      )}

      {newsData.news.length > 0 && (
        <>
          <Link
            href={url}
            className="group flex w-fit flex-row items-center gap-2 pb-4 text-sm font-medium text-blue-500"
          >
            See More Data From Yahoo Finance
            <ChevronRightIcon className="transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex flex-col gap-4">
            {newsData.news.map((article) => (
              <Link
                key={article.uuid}
                href={article.link}
                className="flex flex-col gap-1"
              >
                <span className="text-sm font-medium text-muted-foreground">
                {article.publisher}{" "}{timeAgo(article.providerPublishTime)}
                </span>
                <span className="font-semibold">{article.title}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
