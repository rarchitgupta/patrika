"use client";
import { PiFilePdf, PiFileCsv } from "react-icons/pi";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteContext } from "./delete-context";
export type Source = {
  id: number;
  source_name: string;
  source_type: "pdf" | "csv";
};

function getSourceIcon(sourceType: string) {
  switch (sourceType) {
    case "PDF":
      return <PiFilePdf className="text-red-500" size={24} />;
    case "CSV":
      return <PiFileCsv className="text-green-500" size={24} />;
  }
}

export const columns: ColumnDef<Source>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return null;
    },
  },
  {
    accessorKey: "source_name",
    header: "Name",
    cell: ({ row }) => {
      const sourceType = String(row.getValue("source_type")).toUpperCase();
      return (
        <div className="font-medium flex flex-row items-center gap-2">
          <div>{getSourceIcon(sourceType)}</div>
          <div>{row.getValue("source_name")}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "source_type",
    header: () => <div className="font-medium">Type</div>,
    cell: ({ row }) => {
      const sourceType = String(row.getValue("source_type")).toUpperCase();

      return <div>{sourceType}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <DeleteContext row={row} />;
    },
  },
];
