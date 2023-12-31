'use client'

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo } from "react";
import { Dialog, Transition } from '@headlessui/react' 
import { Button } from "@/components/ui/button";

interface ProfileDrawerProps{
    isOpen?: boolean;
    onClose: ()=>void;
    data : Conversation & {
        users : User[]
    }
}

const ProfileDrawer:React.FC<ProfileDrawerProps> = ({isOpen, onClose, data}) => {
    const otherUser = useOtherUser(data)

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt])

    const title = useMemo(() => {
        return data.name || otherUser.name
    },[data.name, otherUser.name])

    const statusText = useMemo(() => {
        if(data.isGroup){
            return `${data.users.length} members`
        }
        return 'Online'
    },[data])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
            <Transition.Child 
                as = {Fragment}
                enter = "ease-out duration-500"
                enterFrom = "opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="
                    fixed
                    inset-0
                    bg-black
                    bg-opacity-40
                "/>
            </Transition.Child>
            <div className="
                fixed
                inset-0
                overflow-hidden
            ">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="
                        pointer-events-none
                        fixed
                        inset-y-0
                        right-0
                        flex
                        max-w-full
                        pl-10
                    ">
                        <Transition.Child 
                        as={Fragment}
                        enter="transfrom transition ease-in-out duration-500"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transfrom transition ease-in-out duration-500"
                        leaveTo="translate-x-full"
                        >
                            <Dialog.Panel
                                className="
                                    pointer-events-auto
                                    w-screen
                                    max-w-md
                                "
                            >
                                <div className="
                                    flex
                                    h-full
                                    flex-col
                                    overflow-y-scroll
                                    bg-white
                                    py-6
                                    shadow-xl
                                ">
                                    <div className="
                                        px-4
                                        sm:px-6
                                    ">
                                        <div className="
                                            flex
                                            justify-end
                                            items-start
                                        ">
                                            <div className="
                                                ml-3 
                                                flex h-7 
                                                items-center
                                            ">
                                                <Button></Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </div>
        </Dialog>
    </Transition.Root>
  )
}

export default ProfileDrawer