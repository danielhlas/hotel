import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";


export function useEditSettings() {
    const queryClient = useQueryClient();
  
    const { mutate: editSettings, isLoading: isEditing } = useMutation({
      mutationFn: updateSetting,
      onSuccess: () => {
        toast.success("Setting successfully edited");
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      },
      onError: (err) => {
        if (err instanceof Error){
          alert(err.message)
        }
      }
    });
  
    return { isEditing, editSettings };
  }
  