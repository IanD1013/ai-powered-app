import { useEffect, useRef, type ClipboardEvent } from 'react';
import ReactMarkDown from 'react-markdown';

export type Message = {
   content: string;
   role: 'user' | 'bot';
};

type Props = {
   messages: Message[];
};

const onCopyMessage = (e: ClipboardEvent) => {
   const selection = window.getSelection()?.toString().trim();
   if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
   }
};

const ChatMessages = ({ messages }: Props) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   return (
      <div className="flex flex-col gap-3">
         {messages.map((message, index) => (
            <div
               key={index}
               onCopy={onCopyMessage}
               ref={index === messages.length - 1 ? lastMessageRef : null}
               className={`px-3 py-1 rounded-xl ${
                  message.role === 'user'
                     ? 'bg-blue-600 text-white self-end'
                     : 'bg-gray-100 text-black self-start'
               }`}
            >
               <ReactMarkDown>{message.content}</ReactMarkDown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
