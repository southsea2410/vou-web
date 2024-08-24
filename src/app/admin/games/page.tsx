"use client";

import useGetAllGames from "@/services/admin/useGetAllGames";
import { DialogState, Game, GameTypes } from "@/services/types";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import AdminNavbar from "../_components/AdminNavbar";
import { Separator } from "@/components/ui/separator";
import ReactTable from "@/components/global/ReactTable";
import LoadingBlock from "@/components/global/LoadingBlock";
import CreateGameDialog from "../_components/CreateGameDialog";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import UpdateGameDialog from "../_components/UpdateGameDialog";
import { useAuth } from "@/providers/ClientAuthProvider";

const gameColumnHelper = createColumnHelper<Game>();

export default function GamePage() {
  const { isAuthenticated, accountId } = useAuth();

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated, accountId);
  }, [isAuthenticated, accountId]);

  const { data: games } = useGetAllGames();

  const [editDialog, setEditDialog] = useState<DialogState<Game>>({
    open: false,
  });

  const gameColumns = [
    gameColumnHelper.accessor("name", { header: "Name" }),
    gameColumnHelper.accessor("type", { header: "Type" }),
    gameColumnHelper.accessor("image", { header: "Image" }),
    gameColumnHelper.accessor("instruction", { header: "Instruction" }),
    gameColumnHelper.display({
      header: "Actions",
      cell(props) {
        return (
          <Button
            size="icon"
            variant="outline"
            onClick={() =>
              setEditDialog({
                open: true,
                item: props.row.original,
              })
            }
          >
            <Edit2 />
          </Button>
        );
      },
    }),
  ] as ColumnDef<Game>[];

  return (
    <main>
      <AdminNavbar />
      <div className="w-104 container overflow-auto py-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-3xl">Games Management</h1>
          <CreateGameDialog />
        </div>
        <Separator className="mb-5" />
        {games ? (
          <ReactTable
            columns={gameColumns}
            filterOptions={{
              unitValue: Array.from(GameTypes),
            }}
            data={games}
          />
        ) : (
          <LoadingBlock />
        )}
        {!!editDialog.item && (
          <UpdateGameDialog
            open={editDialog.open}
            game={editDialog.item}
            setState={setEditDialog}
          />
        )}
      </div>
    </main>
  );
}
