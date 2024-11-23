import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input, Button, Card, List, Popover, Tooltip } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import io from "socket.io-client";
import { MdOutlineSupportAgent } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import TextArea from 'antd/es/input/TextArea';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'  // Import emoji picker



//const socket = io("http://localhost:5000/chatHub",{
//     query: { userID } cần user id chưa làm xong!
// });


const Chat = () => {
    const [visible, setVisible] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [emojiVisible, setEmojiVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const messageEndRef = useRef(null);

    const handleVisibleChange = (visible) => {
        setVisible(visible);
      };

    const sampleQuestions = [
        "How do I reset my password?",
        "What are your working hours?",
        "Can I track my order?",
    ];



    useEffect(() => {
        const fakeMessages = [
            { user: 'Bot', message: 'Hello! How can I help you today?' },
            { user: 'Bot', message: 'If you have any questions, feel free to ask.' },
            { user: 'Bot', message: 'I’m here to assist you anytime.' },
        ];
    
        
        let currentMessageIndex = 0;
        const interval = setInterval(() => {
            if (currentMessageIndex < fakeMessages.length) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    fakeMessages[currentMessageIndex],
                ]);
                currentMessageIndex += 1;
            } else {
                clearInterval(interval); 
            }
        }, 3000);
    
        return () => clearInterval(interval);

        // Receive messages from the server
        // socket.on("ReceiveMessage", (userId, message) => {
        //     setMessages((prevMessages) => [...prevMessages, { userId, message }]);
        // });

        // return () => {
        //     socket.off("ReceiveMessage");
        // };
    }, []);
    useEffect(() => {
        // Scroll to the latest message whenever messages change
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const questionHandle = () => {
        setOpen(!open);
    }

    const handleSend = () => {
        // if (input.trim()) {
        //     // Emit message to the server
        //     socket.emit("SendMessage", userId, input);
        //     setInput(""); // Clear input
        // }
        if (input.trim()) {
            setMessages([...messages, { user: 'You', message: input }]);
            setInput('');
          }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            handleSend();
          }
    };

    const handleEmojiClick = (emoji) => {
     
        setInput(input + emoji.native);  
      
        setEmojiVisible(false);  
        setVisible(true);
        
      };
      const handleSampleQuestionClick = (question) => {
        setMessages([...messages, { user: 'You', message: question }]);

        // Simulate bot's automatic response based on the question
        setTimeout(() => {
            let botResponse = '';

            // Predefined responses based on question
            switch (question) {
                case "How do I reset my password?":
                    botResponse = "To reset your password, click 'Forgot Password' on the login page.";
                    break;
                case "What are your working hours?":
                    botResponse = "Our working hours are Monday to Friday, 9:00 AM to 6:00 PM.";
                    break;
                case "Can I track my order?":
                    botResponse = "Yes, you can track your order by entering your tracking number on the tracking page.";
                    break;
                default:
                    botResponse = "Sorry, I didn't understand that. Please try again.";
            }

            setMessages((prevMessages) => [
                ...prevMessages,
                { user: 'Bot', message: botResponse },
            ]);
        }, 1000);
    };


    const chatContent = (
        
        <Card style={{ width: 400, margin: 'auto' }}>
         
            <List
                dataSource={messages}
                renderItem={(msg) => (
                    <List.Item
                    
                        style={{
                            justifyContent: msg.user === 'You' ? 'flex-end' : 'flex-start',
                            border: 'none',
                            padding: '5px 0'
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: msg.user === 'You' ? '#007bff' : '#e5e5ea',
                                color: msg.user === 'You' ? '#fff' : '#000',
                                padding: '8px 12px',
                                borderRadius: '15px',
                                maxWidth: '67%',
                                textAlign: msg.user === 'You' ? 'left' : 'left',
                                wordBreak: 'break-word',
                            }}
                        >
                             {msg.message}
                        </div>
                    </List.Item>
                )}
                style={{ maxHeight: '300px', overflowY: 'scroll' }}
            />
            {/* Scroll to Latest Message */}
            <div ref={messageEndRef} />
               {/* Sample Questions */}
            <div style={{ marginTop: '10px' }}>
            <strong className='d-flex' onClick={() => questionHandle()} style={{ cursor: 'pointer' }}>
                    Choose a question: <p style={{textAlign: 'end'}}>{open ? '↓' : '↑'}</p>
                </strong>
                {open ? (
                    <List
                        dataSource={sampleQuestions}
                        renderItem={(question) => (
                            <List.Item style={{ padding: '5px 0' }}>
                                <Button
                                    type="link"
                                    onClick={() => handleSampleQuestionClick(question)}
                                >
                                    {question}
                                </Button>
                            </List.Item>
                        )}
                    />

                ) : ('')}
            </div>
            <Input.Group compact style={{ display: 'flex', marginTop: '6px' }}>
                <TextArea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message"
                    onKeyDown={handleKeyPress}
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    style={{ flex: 1 }}
                />
                  <Tooltip title="Choose an emoji">
                    <Popover
                        content={<Picker data={data} onEmojiSelect={handleEmojiClick} />}
                        trigger="click"
                        visible={emojiVisible}
                        onVisibleChange={setEmojiVisible}
                    >
                        <Button type="default" style={{ marginRight: '8px' }}>
                        😀 {/* Đây là ví dụ với biểu tượng emoji mặc định */}
                        </Button>
                    </Popover>
                    </Tooltip>
                <Tooltip title="Send message">
                    <Button type="primary" onClick={handleSend} ><IoIosSend fontSize={20}/></Button>
                </Tooltip>
            </Input.Group>
        </Card>
      );

  

    return (
    <div className='chat-container' style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: '10' }}>
        <Popover
      content={chatContent}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      placement="topRight"
      title="Chat to support"
    >
        <Tooltip title="Chat to support">
            <MdOutlineSupportAgent
                className='chat-icon'
                style={{ background : visible? '#007BFF' : '', color : visible? '#fff' : '' }}
            />
        </Tooltip>
    </Popover>
    </div>
    );
};

export default Chat;
