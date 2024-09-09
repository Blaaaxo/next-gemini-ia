"use client"
import { useChat } from 'ai/react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {marked} from 'marked';

export default function Chat() {

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat'
    })

    const convertToHTML = (text) => {
        return { __html: marked(text) };
    };

    return (
        <>
            <div className='p-4 w-full max-w-2xl'>
                <div className='flex items-center justify-center'>
                    <h1 className='text-3xl font-bold text-white py-4'>Chat Gemini IA</h1>
                </div>
                <div className='bg-gray-800 p-4 rounded-lg text-white overflow-y-auto h-[80vh]'>
                    <div className='mt-4'>
                        <div className='flex items-center'>
                            <ul>
                                <TransitionGroup>
                                    {messages.length != 0 ? (messages.map((message, index) => (
                                        <CSSTransition
                                            key={index}
                                            timeout={500}
                                            classNames='message'
                                        >
                                            <li className='mt-2'>
                                                <p>
                                                    <span className='text-medium'>{message.role === 'user' ? 'User: ' : 'AI: '}</span>
                                                    <span dangerouslySetInnerHTML={convertToHTML(message.content)} />
                                                </p>
                                            </li>
                                        </CSSTransition>
                                    ))) : (
                                        <CSSTransition
                                            key='default'
                                            timeout={500}
                                            classNames='message'
                                        >
                                            <li className='mt-2'>
                                                <p>
                                                    <span className='text-medium'>AI: </span>
                                                    <span>Hola, soy Gemini IA, ¿En que puedo ayudarte?</span>
                                                </p>
                                            </li>
                                        </CSSTransition>
                                    )}
                                </TransitionGroup>
                            </ul>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='flex gap-4 mt-4'>
                    <input
                        type='text'
                        value={input} onChange={handleInputChange}
                        className='p-2 rounded-lg w-full text-black'
                        placeholder='Escribe tu mensaje...'
                    />
                    <button

                        className=' p-2 bg-blue-500 rounded-lg text-white'
                    >
                        Enviar
                    </button>
                </form>
            </div>

            <style jsx>{`
            .message-enter {
                opacity: 0;
                transform: translateY(-20px);
            }
            .message-enter-active {
                opacity: 1;
                transform: translateY(0);
                transition: opacity 500ms, transform 500ms;
            }
            .message-exit {
                opacity: 1;
                transform: translateY(0);
            }
            .message-exit-active {
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 500ms, transform 500ms;
            }
            `}</style>
        </>
    );
}