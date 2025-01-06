"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Quote } from "@/node_modules/yahoo-finance2/dist/esm/src/modules/quote";
import Link from "next/link";

export const columns: ColumnDef<Quote>[] = [
  {
    header: "Title",
    accessorKey: "shortName",
    cell: (props) => {
      const { row } = props;
      const title = row.getValue("shortName") as string;
      //  const symbol = row.original.symbol;

      return (
        <Link href={"/"} className="font-medium">
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "regularMarketPrice",
    header: "Price",
    cell: (props) => {
      const { row } = props;
      const price = row.getValue("regularMarketPrice") as number;
      return <div className="text-right">{price.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "regularMarketChange",
    header: "$ Change",
    cell: (props) => {
      const { row } = props;
      const change = row.getValue("regularMarketChange") as number;
      return (
        <div className={`${change < 0 ? "text-red-500" : "text-green-500"}`}>
          {change.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "regularMarketChangePercent",
    header: "$ Change",
    cell: (props) => {
      const { row } = props;
      const changePercent = row.getValue("regularMarketChangePercent") as number;
      return <div className="text-right">{changePercent.toFixed(2)}</div>;
    },
  },
];
