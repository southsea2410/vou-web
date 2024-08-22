"use client";

import ReactTable from "@/components/global/ReactTable";
import { Separator } from "@/components/ui/separator";
import { Account, AccountRoles } from "@/services/admin/types";
import useGetAccounts from "@/services/admin/useGetAccounts";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import AdminNavbar from "../_components/AdminNavbar";

const accountColumnHelper = createColumnHelper<Account>();

const accountColumns = [
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
] as ColumnDef<Account>[];

export default function AdminAccountPage() {
  const { data: accounts } = useGetAccounts();

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <div className="container py-4">
        <h1 className="mb-2 text-3xl">Events Management</h1>
        <Separator className="mb-5" />
        <div>
          <ReactTable
            columns={accountColumns}
            data={accounts}
            filterOptions={{
              role: Array.from(AccountRoles),
            }}
          />
        </div>
      </div>
    </div>
  );
}
