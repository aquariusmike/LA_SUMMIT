import React, { Children, useState } from 'react'
import Image from 'next/image'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import { Description } from '@radix-ui/react-dialog'
import { useToast } from "@/hooks/use-toast"
import { Textarea } from './textarea'
import ReactDatePicker from 'react-datepicker';
import { Input } from '@/components/ui/input'

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] =
        useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast()


    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if (!values.dateTime) {
                toast({
                    title: "Please Select Day and Time!",
                })
                return;
            }
            const id = crypto.randomUUID();
            const call = client?.call('default', id);
            if (!call) throw new Error('Failed to create call')
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || ' Instant meeting ';
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);
            if (!values.description)
                router.push(`/meeting/${call.id}`)
            toast({
                title: "Meeting created successfully",
            })
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to create a meeting",
            })
        }
    }
            const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

    return (

        <section className='grid grid-cols-1 gap-3 md:grid-flow-col-2 xl:grid-cols-4'>
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start a new instant meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className="bg-orange-1"
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Schedule a new meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-blue-1"
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Check out your Recordings"
                handleClick={() => router.push("/recordings")}
                className="bg-purple-1"
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Personal Room"
                description="Via invitation link"
                handleClick={() => setMeetingState("isJoiningMeeting")}
                className="bg-yellow-1"
            />
            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    className='text-center transition-all'
                    //buttonText="Start Meeting"
                    handleClick={createMeeting}>
                    <div className="flex flex-col gap-2.5 ">
                        <label className="text-base text-normal leading-[22px] text-sky-2 ">
                            Add a description</label>
                        <Textarea className='border-none bg-dark-3 focus-visible:ring-0
                                    focus-visible:ring-offset-0'
                            onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }} />

                    </div>
                    <div className='flex w-full flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Select Date and Time
                        </label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            timeCaption='time'
                            dateFormat="MMMM d, yyyy: h:mm aa"
                            className='w-full rounded bg-dark-3 p-2 focus:outline-none'
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Created"
                    className='text-center'
                    children
                    //buttonText="Start Meeting"
                    handleClick={() => {
                         navigator.clipboard.writeText(meetingLink);
                        toast({ title: 'link copied' })

                    }}
                    image="icons/checked.svg"
                    buttonIcon='icons/copy.svg'
                    buttonText="Copy Meeting Link"

                />
            )}
            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start a new instant Meeting"
                children
                buttonText="Start Meeting"
                handleClick={createMeeting}

            />
             <MeetingModal
                isOpen={meetingState === "isJoiningMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start a new instant Meeting"
                buttonText="Start Meeting"
                handleClick={() => router.push(values.link)}>
                    <Input className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={(e) => setValues({...values, link:e.target.value })} />
                </MeetingModal>

            
        </section>
    )
}

export default MeetingTypeList