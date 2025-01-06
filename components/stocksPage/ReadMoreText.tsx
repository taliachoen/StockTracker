"use client";
import React, { useState } from "react";

export default function ReadMoreText({
  text,
  minText,
}: {
  text: string | undefined;
  minText: number;
}) {
  const [isReadMore, setIsReadMore] = useState<boolean>(false);
  const oparators = text && text.length > minText ? "..." : ""
  const truncateText = text?.slice(0, minText) + oparators;
  console.log(truncateText)

  return (
    <>
      <p>{isReadMore ? text : truncateText}</p>
      {text && text.length > minText && (
        <button
          onClick={() => setIsReadMore((prev) => !prev)}
          className="text-blue-600 dark:text-blue-500"
        >
          {isReadMore ? "Show Less" : "Read More"}
        </button>
      )}
    </>
  );
}
