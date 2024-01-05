"use client"

import useRoutes from "@/app/hooks/useRoute"
import { useState } from "react"
import DesktopItem from "./DesktopItem"
import { User } from "@prisma/client"
import Avatar from "../Avatar"
import {
    Dialog,
    DialogTrigger,
  } from "@/components/ui/dialog"
import ProfileModal from "./ProfileModal"

interface DesktopSidebarProps{
    currentUser : User
}

const DesktopSidebar : React.FC<DesktopSidebarProps> = ({currentUser}) => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Dialog>
            <ProfileModal data={currentUser}/>
            <div className="
        hidden
        h-screen
        lg:fixed
        lg:inset-y0
        lg:left-0
        lg:z-40
        lg:w-20
        xl:px-6
        lg:overflow-y-auto
        lg:bg-white
        lg:border-r-[1px]
        lg:pb-4
        lg:flex
        lg:flex-col
        justify-between
        ">
            <nav className="mt-4 flex flex-col justify-between">
                <ul role="list" className="flex flex-col items-center space-y-1">
                    {routes.map((item) => (
                        <DesktopItem
                            key = {item.label}
                            href = {item.href}
                            label = {item.label}
                            icon = {item.icon}
                            active = {item.active}
                            onClick = {item.onClick}
                        />
                    ))}
                </ul>
            </nav>
            <nav className="mt-4 flex flex-col justify-between items-center">
                <DialogTrigger asChild>
                    <div className="cursor-pointer hover:opacity-75 transition">
                        <Avatar user={currentUser}/>
                    </div>
                </DialogTrigger>
            </nav>
        </div>
        </Dialog>
        </>
    )
}

export default DesktopSidebar