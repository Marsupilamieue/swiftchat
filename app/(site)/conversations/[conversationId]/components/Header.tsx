'use client'

import Avatar from "@/app/components/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import Link from "next/link"
import { useMemo, useState } from "react"
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2"
import ProfileDrawer from "./ProfileDrawer"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { Button } from "@/components/ui/button";
import AvatarGroup from "@/app/components/AvatarGroup"
import useActiveList from "@/app/hooks/useActiveList"

interface HeaderProps {
    conversation : Conversation & {
        users : User[]
    }
}

const Header : React.FC<HeaderProps> = ({conversation}) => {
    const otherUser = useOtherUser(conversation)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { members } = useActiveList()
    const isActive = members.indexOf(otherUser?.email!) !== -1
    const statusText = useMemo(() => {
        if(conversation.isGroup){
            return `${conversation.users.length} members`
        }
        return  isActive ? 'Online': 'Offline'
    },[conversation, isActive])
  return (
    <>
        <Dialog>
            <DialogContent>
                <DialogHeader>
                <DialogDescription>
                    <ProfileDrawer 
                        data={conversation}
                    />
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        <div className="
        bg-white
        w-full
        flex
        border-b-[1px]
        sm:px-4
        py-3
        px-4
        lg:px-6
        justify-between
        items-center
        shadow-sm
    ">
        <div className="flex gap-3 items-center">
            <Link 
                className="
                    lg:hidden
                    block
                    text-neutral-800
                    hover:text-neutral-900
                    transition
                    cursor-pointer
                "
                href="/conversations">
                <HiChevronLeft size={32}/>
            </Link>
            {conversation.isGroup ? (
                <AvatarGroup users={conversation.users} />
            ) : (
                <Avatar user={otherUser}/>
            )}
            <div className="flex flex-col">
                <div>
                    {conversation.name || otherUser.name}
                </div>
                <div className="
                    text-sm
                    font-light
                    text-neutral-500
                ">
                    {statusText}
                </div>
            </div>
        </div>
        <DialogTrigger>
            <HiEllipsisHorizontal 
                size={32} 
                onClick={() => setDrawerOpen(true)}
                className="
                text-neutral-800
                cursor-pointer
                hover:text-neutral-900
                transition
                "
                />
        </DialogTrigger>
        </div>
        </Dialog>
    </>
  )
}

export default Header