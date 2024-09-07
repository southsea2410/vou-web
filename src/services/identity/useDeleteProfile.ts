import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient from "../httpClient";
import { toast } from "@/components/ui/use-toast";

async function deleteProfile(userId: string) {
  const res = await httpClient.delete("/users/all-users/" + userId);
  return res.data;
}

async function deleteAccount(accountId: string) {
  const res = await httpClient.delete("/users/" + accountId);
  return res.data;
}

export default function useDeleteProfile(
  opts?: Omit<UseMutationOptions<unknown, Error, string>, "mutationFn">,
) {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, string>({
    onSuccess(data, variables, context) {
      toast({
        title: "Profile deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["admin_all_accounts"] });
    },
    onError(error, variables, context) {
      toast({
        title: "Failed to delete profile",
        variant: "destructive",
        description: error.message,
      });
    },
    ...opts,
    mutationFn: deleteProfile,
  });
}
