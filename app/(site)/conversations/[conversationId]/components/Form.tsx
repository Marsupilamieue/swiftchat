'use client'

import useConversation from "@/app/hooks/useConversation"
import axios from "axios"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"
import MessageInput from "./MessageInput"
import { Button } from "@/components/ui/button"
import { CldUploadButton } from "next-cloudinary"

const Form = () => {
    const { conversationId } = useConversation()
    const {
        register,
        handleSubmit,
        setValue,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            message : ''
        }
    })

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate:true })
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }
  return (
    <div className="
        p-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
    ">
        <CldUploadButton
            options={{maxFiles : 1}}
            onUpload={handleUpload}
            uploadPreset="oqwjg1cw"
            >
            <HiPhoto size ={30} className='text-neutral-800'/>
        </CldUploadButton>
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="
                flex
                items-center
                gap-2
                lg:gap-4
                w-full
            ">
            <MessageInput 
                id="message" 
                register={register}  
                errors={errors}
                required
                placeholder="Write a message"
            />
            <Button type="submit" variant="secondary" className="rounded-full">
                <HiPaperAirplane size={18}/>
            </Button>
        </form>
    </div>
  )
}

export default Form