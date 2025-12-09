"use client"

import { getMe } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export default function AuthProvider({children}: Props) {

    useQuery({
        queryKey: ["authUser"],
        queryFn: getMe,
        staleTime: 1000 * 60 * 5
    });

    return (
        <>
        {children}
        </>
    );
}