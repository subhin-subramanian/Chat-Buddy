import { logOut } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation";

function useLogout() {
 
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: logOut,
        onSuccess:()=>{
            queryClient.removeQueries({
                predicate: q => Array.isArray(q.queryKey) && q.queryKey[0] === 'auth'
            });
            router.push("/auth/login")
        }
    });
}

export default useLogout
