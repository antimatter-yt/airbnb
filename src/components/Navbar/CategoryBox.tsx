"use client"
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  selected?: boolean;
  icon: IconType;
}
export const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  selected,
  icon: Icon,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery : any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [router, params, label]);
  return (
    <div
    onClick={handleClick}
      className={`
    flex flex-col items-center gap-1 p-2 border-b-2
    hover:text-neutral-800 transition cursor-pointer
    ${selected ? "border-b-neutral-800" : "border-transparent"}
    ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
    >
      <Icon size={22} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};
