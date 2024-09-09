"use client";

import ReactTable from "@/components/global/ReactTable";
import { Separator } from "@/components/ui/separator";
import useGetAllUsers from "@/services/admin/useGetAccounts";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdminNavbar from "../_components/AdminNavbar";
import {
  AccountRoleType,
  AccountRoles,
  BrandProfile,
  DialogState,
  GeneralProfileType,
  PlayerProfile,
} from "@/services/types";
import LoadingBlock from "@/components/global/LoadingBlock";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectOptionType } from "@/components/global/Select";
import { Label } from "@/components/ui/label";
import useUpdateProfile, { UpdateProfileRequest } from "@/services/identity/useUpdateProfile";
import { toast } from "@/components/ui/use-toast";
import { Edit2, Eye, EyeOff, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import UpdateBrandDialog from "../_components/UpdateBrandDialog";
import UpdatePlayerDialog, { UpdatePlayerForm } from "../_components/UpdatePlayerDialog";
import useDeleteProfile from "@/services/identity/useDeleteProfile";
import CreateAccountDialog from "../_components/CreateAccountDialog";

const accountColumnHelper = createColumnHelper<GeneralProfileType & { id: string }>();

export default function AdminAccountPage() {
  const accountColumns = [
    accountColumnHelper.accessor("id", {
      header: "ID",
      size: 120,
    }),
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
        return (
          <div className="flex items-center justify-between">
            <span>{status ? "Active" : "Disabled"}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setEditDialog({ open: true, item: props.row.original })}
            >
              {props.row.original.status ? <Eye /> : <EyeOff />}
            </Button>
          </div>
        );
      },
    }),
    accountColumnHelper.display({
      header: "Actions",
      size: 100,
      cell(props) {
        return (
          <div className="flex justify-between">
            <Button
              size="icon"
              className="aspect-square"
              variant="ghost"
              onClick={() => {
                const role = props.row.original.role;

                role == "brand" &&
                  setUpdateBrandDialog({
                    open: true,
                    item: props.row.original as UpdateProfileRequest<BrandProfile>["newProfile"],
                  });

                role == "player" &&
                  setUpdatePlayerDialog({
                    open: true,
                    item: props.row.original as UpdatePlayerForm,
                  });
              }}
            >
              <Edit2 />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setDeleteDialog({ open: true, item: props.row.original })}
            >
              <Trash />
            </Button>
          </div>
        );
      },
    }),
  ] as ColumnDef<GeneralProfileType>[];

  const queryClient = useQueryClient();

  const { data: accounts } = useGetAllUsers();

  const { mutate: updateProfile } = useUpdateProfile({
    onMutate: () => toast({ title: "Updating Brand...", description: "Updating brand status" }),
    onSuccess(data, variables, context) {
      toast({ title: "Success", description: "Brand status updated" });
      setEditDialog({ open: false });
      queryClient.invalidateQueries({ queryKey: ["admin_all_accounts"] });
    },
  });

  const [editDialog, setEditDialog] = useState<DialogState<GeneralProfileType & { id: string }>>({
    open: false,
  });

  const [updateBrandDialog, setUpdateBrandDialog] = useState<
    DialogState<UpdateProfileRequest<BrandProfile>["newProfile"]>
  >({
    open: false,
  });

  const [updatePlayerDialog, setUpdatePlayerDialog] = useState<DialogState<UpdatePlayerForm>>({
    open: false,
  });

  const selectData: SelectOptionType[] = [
    {
      value: "1",
      label: "Active",
    },
    {
      value: "0",
      label: "Disabled",
    },
  ];

  const [status, setStatus] = useState(editDialog.item?.status ? "1" : "0");

  useEffect(() => setStatus(editDialog.item?.status ? "1" : "0"), [editDialog]);

  const handleChangeStatus = (value: string) => {
    setStatus(value);
  };

  const handleSubmitNewStatus = () => {
    if (!editDialog.item)
      toast({ title: "Error", description: "No account selected", variant: "destructive" });
    else {
      if (editDialog.item.role === "brand")
        updateProfile({
          userId: editDialog.item?.id,
          newProfile: {
            ...editDialog.item,
            status: status === "1",
          } as BrandProfile & { id: string; role: AccountRoleType },
        });
    }
  };

  const [deleteDialog, setDeleteDialog] = useState<
    DialogState<GeneralProfileType & { id: string }>
  >({
    open: false,
  });
  // Delete logics
  const { mutate: deleteProfile } = useDeleteProfile({
    onSuccess: (_, variables) => {
      toast({
        title: "Profile deleted",
        description: "Profile has been deleted successfully",
      });
      setDeleteDialog({ open: false });
    },
    onError: (error) => {
      toast({
        title: "Error deleting profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    const item = deleteDialog.item;
    if (!item) return;
    deleteProfile(item.id);
  };

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-3xl">Accounts Management</h1>
          <CreateAccountDialog />
        </div>
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

        {/* Update Dialogs */}
        <UpdateBrandDialog {...updateBrandDialog} setState={setUpdateBrandDialog} />
        <UpdatePlayerDialog {...updatePlayerDialog} setState={setUpdatePlayerDialog} />

        {/* Edit Status Dialog */}
        <Dialog open={editDialog.open} onOpenChange={(s) => !s && setEditDialog({ open: s })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Account Status?</DialogTitle>
              <DialogDescription>
                Change account status for{" "}
                <span className="font-medium">{editDialog.item?.fullName}</span>
              </DialogDescription>
            </DialogHeader>
            <Label>Status</Label>
            <Select data={selectData} defaultValue={status} onChange={handleChangeStatus} />
            <DialogFooter>
              <Button variant="ghost" onClick={() => setEditDialog({ open: false })}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleSubmitNewStatus}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Profile Dialog */}
        <Dialog open={deleteDialog.open} onOpenChange={(s) => !s && setDeleteDialog({ open: s })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete {deleteDialog.item?.fullName}?</DialogTitle>
              <DialogDescription>You will no longer see this item anymore!</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDeleteDialog({ open: false })}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
