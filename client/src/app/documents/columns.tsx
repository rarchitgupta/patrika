"use client";
import { ColumnDef } from "@tanstack/react-table";
import { EditDocument } from "@/components/custom/edit-document";

export type Document = {
  id: number;
  name: string;
  date: Date;
  last_modified: Date;
};

export const columns: ColumnDef<Document>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "",
    cell: ({ row }) => {
      return null;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <h3 className="font-medium">{row.getValue("name")}</h3>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleDateString();
    },
  },
  {
    accessorKey: "last_modified",
    header: "Last Modified",
    cell: ({ row }) => {
      const date = new Date(row.getValue("last_modified")).toLocaleDateString();
      const time = new Date(row.getValue("last_modified")).toLocaleTimeString();

      return `${date}, ${time}`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const documentId = row.getValue("id");
      return (
        <EditDocument
          documentId={typeof documentId == "number" ? documentId : 0}
        />
      );
    },
  },
];
