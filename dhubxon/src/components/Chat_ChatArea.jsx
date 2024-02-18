
  import React from 'react';
import { IoIosSend } from 'react-icons/io';
import { Button, TextField } from '@mui/material';

const ChatArea = () => {
    const dummyMessages = [
        { id: 1, user: 'John', text: 'Hello, how are you?' },
        { id: 2, user: 'ME', text: 'I am fine, thanks! And you?' },
        { id: 3, user: 'John', text: 'Great! Working on the new project.' },
        { id: 4, user: 'ME', text: `That sounds exciting! What's the project about?` },
        { id: 5, user: 'John', text: 'We are developing a new website for a client.' },
        { id: 6, user: 'ME', text: 'Nice! Do you need any help with the development?' },
        { id: 7, user: 'John', text: 'Actually, we could use an extra hand. Are you available?' },
        { id: 8, user: 'ME', text: `Sure, I'd love to help. When do you need me to start?` },
        { id: 9, user: 'John', text: 'As soon as possible. Can we meet tomorrow to discuss the details?' },
        { id: 10, user: 'ME', text: 'Absolutely! What time works for you?' },
        { id: 11, user: 'John', text: 'How about 2:00 PM? Does that work for you?' },
        { id: 12, user: 'ME', text: "Perfect! Let's meet at 2:00 PM tomorrow." },
      ];

  return (
    <div className="flex-1 p-4 flex flex-col bg-white">
      <div className="bg-gray-50 flex-1 mb-4 overflow-y-auto p-3 custom-scrollbar">
        {dummyMessages.map((message) => (
          <div key={message.id} className={`flex ${
            message.user === 'ME' ? 'justify-end' : 'justify-start'
          }`}>
            <div className={`max-w-2/3 p-3 my-1 rounded-lg shadow ${
              message.user === 'ME' ? 'bg-blue-200' : 'bg-green-200'
            }`}>
              <strong className="block font-medium">{message.user}</strong>
              <p className="text-gray-800">{message.text}</p>
              <span className="text-xs text-gray-500 block text-right">10:30 AM</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-gray-300 pt-2">
        <TextField
          label="Type a message"
          className="flex-grow mr-2"
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<IoIosSend />}
          className="shrink-0"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatArea;
