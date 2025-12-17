"use client"
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from './_components/AppSidebar';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react'
import App from 'next/app';
import React, { use, useEffect, useState } from 'react'

function WorkspaceProvider({ children }) {
    const newUserMutation=useMutation(api.users.CreateNewUser);
    const {user} = useUser();
    const [userDetail, setUserDetail] = useState();

    useEffect(()=>{
        user && CreateNewUser();
    },[user]);

    const CreateNewUser=async()=>{
        const result = await newUserMutation({
            name:user?.fullName,
            email:user?.primaryEmailAddress?.emailAddress,
            picture:user?.imageUrl
        });
        console.log(result);
        setUserDetail(result);
    }
    return (
        <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
            <SidebarProvider>
                <AppSidebar />
                <div>
                    <SidebarTrigger />
                    {children}
                </div>
            </SidebarProvider>
        </UserDetailContext.Provider>
  )
}

export default WorkspaceProvider
