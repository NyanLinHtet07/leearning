import { useStudentData } from "@/context/StudentDataContext";
import { createContact, getContactByStudent } from "@/services/contactService";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, Send } from "lucide-react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function StudentContactPage() {
    const { studentData } = useStudentData();
    const studentId = studentData?.id;
    const [message, setMessage] = useState("");
    const queryClient = useQueryClient();
    const scrollRef = useRef<HTMLDivElement>(null);

    const { data: contacts = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['contacts'],
        queryFn: () => getContactByStudent(studentId as number),
        enabled: !!studentId,
    })

    const createMutation = useMutation({
        mutationFn: createContact,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['contacts'] });
            setMessage("");
            refetch();
        },
        onError: (e: any) => {
            toast.error(e?.message || "Failed to send message!");
        }
    })

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!studentId) {
            toast.error("Student ID is missing");
        }

        await createMutation.mutateAsync({
            sender_id: Number(studentId),
            message: message
        });
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [contacts])


    useEffect(() => {
        if (studentId) {
            refetch();
        }
    }, [studentId, refetch])

    if (isLoading)
        return (
            <div className='flex justify-center items-center h-80 text-gray-600'>
                <Loader2 className='w-6 h-6 text-primary animate-spin mr-2' />
                <span className='ml-2 text-gray-600'>Loading Messages ...</span>
            </div>
        );

    if (isError)
        return (
            <div className="text-center text-red-500 font-medium py-10">
                Failed to load message. Please try again later.
            </div>
        )

    return (
        <div className=" flex flex-col bg-white/60 min-h-9/12 backdrop-blur-xl rounded-2xl p-4 drop-shadow-xl">
            <div className="pb-2">
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <p className="mt-2 text-gray-600 text-sm">If you have any questions or need assistance, feel free to reach out to us. We&apos;re here to help!</p>
            </div>
            <div
                ref={scrollRef}
                className="flex flex-col gap-3 max-h-96 overflow-y-auto px-2 py-2 bg-gray-50 rounded-xl ">
                {
                    contacts.length === 0 ? (
                        <p className=" text-center text-gray-500 italic py-8">
                            No messages yet — feel free to send us a message!
                        </p>
                    ) : (
                        contacts.map((contact) => {
                            return (
                                <div key={contact.id}>
                                    <div
                                        className="flex flex-col items-end animate-in">
                                        <div className="max-w-[80%] p-3 rounded-2xl shadow-sm bg-primary text-white rounded-br-none">
                                            <p className=" text-sm leading-relaxed">{contact.message}</p>
                                            <span className="text-xs text-gray-50 mt-1">
                                                {moment(contact.created_at).fromNow()}
                                            </span>
                                        </div>
                                    </div>
                                    {contact.reply &&
                                        <div
                                            className="flex flex-col items-start animate-in">
                                            <div className="max-w-[80%] p-3 rounded-2xl shadow-sm bg-primary/90 text-white border border-gray-200 rounded-bl-none">
                                                <p className=" text-sm leading-relaxed">{contact.reply}</p>
                                                <span className="text-xs text-gray-50 mt-1">
                                                    {moment(contact.updated_at).fromNow()}
                                                </span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    )

                }
            </div>
            <form onSubmit={onSubmit} className="mt-4 flex items-center gap-3 border-t pt-3">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className=" flex-1 resize-none p-2.5 text-sm rounded-xl border border-gray-300 bg-white/40 focus:outline-none focus:ring-primary focus:border-transparent"
                    placeholder="Type a message..."
                    rows={2}
                    required
                ></textarea>
                <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className=" flex items-center justify-center bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary/90 transition disabled:opacity-50"
                >{
                        createMutation.isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className=" w-5 h-5" />
                        )
                    }

                </button>
            </form>

        </div >
    );
}
