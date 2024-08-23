"use client";

import ReactTable from "@/components/global/ReactTable";
import { Separator } from "@/components/ui/separator";
import useGetAllUsers from "@/services/admin/useGetAccounts";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import AdminNavbar from "../_components/AdminNavbar";
import { AccountRoles, GeneralProfileType } from "@/services/types";
import LoadingBlock from "@/components/global/LoadingBlock";

const accountColumnHelper = createColumnHelper<GeneralProfileType>();

const accountColumns = [
  accountColumnHelper.accessor("accountId", {
    header: "Account ID",
    size: 120,
  }),
  accountColumnHelper.accessor("fullName", {
    header: "Full Name",
  }),
  accountColumnHelper.accessor("username", {
    header: "Username",
  }),
  accountColumnHelper.accessor("email", {
    header: "Email",
  }),
  accountColumnHelper.accessor("role", {
    header: "Role",
    filterFn: "arrIncludesSome",
    cell(props) {
      const name = props.getValue();
      return <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>;
    },
  }),
  accountColumnHelper.accessor("phone", {
    header: "Phone",
  }),
  accountColumnHelper.accessor("status", {
    header: "Status",
    cell(props) {
      const status = props.getValue();
      return <span>{status ? "Active" : "Inactive"}</span>;
    },
  }),
] as ColumnDef<GeneralProfileType>[];

export default function AdminAccountPage() {
  const { data: accounts } = useGetAllUsers();

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <div className="container py-4">
        <h1 className="mb-2 text-3xl">Events Management</h1>
        <Separator className="mb-5" />
        <div>
          {!accounts ? (
            <LoadingBlock />
          ) : (
            <ReactTable
              columns={accountColumns}
              data={accounts}
              filterOptions={{
                role: Array.from(AccountRoles),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
