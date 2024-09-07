import { UseMutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import httpClient, { BasicResponse } from "../httpClient";
import { GetAccountInfoResponse } from "./useGetMyInfo";
import { BrandProfile, PlayerProfile } from "../types";
import { toast } from "@/components/ui/use-toast";

export type UpdateProfileRequest<T extends BrandProfile | PlayerProfile> = {
  userId: string;
  newProfile: T & { id: string };
};

async function updateProfile<T extends BrandProfile | PlayerProfile>({
  userId,
  newProfile,
}: UpdateProfileRequest<T>) {
  const res = await httpClient.patch("users/all-users/" + userId, newProfile);
  return res.data;
}

export default function useUpdateProfile<T extends BrandProfile | PlayerProfile>(
  opts?: UseMutationOptions<BasicResponse<GetAccountInfoResponse>, Error, UpdateProfileRequest<T>>,
) {
  const queryClient = useQueryClient();
  return useMutation<BasicResponse<GetAccountInfoResponse>, Error, UpdateProfileRequest<T>>({
    onSuccess(data, variables, context) {
      toast({
        title: "Profile updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["admin_all_accounts"] });
    },
    onError(error, variables, context) {
      toast({
        title: "Failed to update profile",
        variant: "destructive",
        description: error.message,
      });
    },
    ...opts,
    mutationFn: updateProfile,
  });
}
