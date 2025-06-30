import { useEffect, useLayoutEffect, useRef, useState } from "react"
import styles from './Chat.module.scss';

const replies = ['Reply', 'Another reply', 'Yet another reply'];
let replyTimeoutId = 0;

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const messagesRef = useRef(null);

    function send() {
        const currentMessages = [...messages];
        if (!userMessage) { return; }
        window.clearInterval(replyTimeoutId);
        currentMessages.push({ text: userMessage, sender: 'user' });
        setMessages(currentMessages);
        setUserMessage('');
    }

    function reply() {
        window.clearTimeout(replyTimeoutId);
        const replyIndex = Math.floor(Math.random() * (replies.length));
        replyTimeoutId = window.setTimeout(() => {
            setMessages(currentMessages => currentMessages.concat([{ text: replies[replyIndex], sender: 'bot' }]));
        }, 1500);
    }

    useEffect(() => {
        if (messages?.[messages.length - 1]?.sender === 'user') {
            reply();
        }
        return () => window.clearTimeout(replyTimeoutId);
    }, [messages.length]);

    useLayoutEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight + 20;
    }, [messages.length]);

    return (
        <div className={styles.Chat}>
            <div className={styles.Chat__messages} ref={messagesRef}>
                {messages.map((message, index) => {
                    let messageClass = styles.Chat__message;
                    let cloudClass = styles.Chat__messageCloud;
                    if (message.sender === 'user') {
                        messageClass += ` ${styles.Chat__message_out}`;
                        cloudClass += ` ${styles.Chat__messageCloud_out}`;
                    }
                    return (
                        <div key={index} className={messageClass}>
                            <div className={cloudClass}>
                                {message.text}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={styles.Chat__bottom}>
                <textarea
                    onChange={(e) => { setUserMessage(e.target.value ?? '') }}
                    rows={4}
                    value={userMessage}
                    onKeyDown={(e => {
                        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                            send();
                        }
                    })}
                />
                <button onClick={e => send()}>Send</button>
            </div>
        </div>
    )
}