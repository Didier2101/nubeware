'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import { Bot, User, Send, X } from 'lucide-react';
import { marked } from 'marked';

// Tipo para un mensaje en el chat
type Message = {
    sender: 'user' | 'bot';
    text: string;
};

// Componente principal del chatbot
const NubeBot = ({ onClose }: { onClose: () => void }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Variantes de animación para el contenedor del chat
    const chatContainerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } },
        exit: { opacity: 0, scale: 0.8, y: 50 },
    };

    // Efecto para hacer scroll al final de los mensajes cuando se añade uno nuevo
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Función que ahora consume la API de tu backend de Python
    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (input.trim() === '' || isLoading) return;

        const userMessage = input.trim();
        setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
        setInput('');
        setIsLoading(true);

        try {
            // Reemplazamos la llamada de prueba con una solicitud POST a tu API
            const response = await fetch("http://192.168.2.47:5001/api/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                // Manejar errores HTTP, por ejemplo, 404, 500, etc.
                throw new Error(`Error en el servidor: ${response.status}`);
            }

            const data = await response.json();
            setMessages((prev) => [...prev, { sender: 'bot', text: data.message }]);
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            setMessages((prev) => [...prev, { sender: 'bot', text: 'Lo siento, hubo un error al conectar con el servidor. Por favor, revisa la consola para más detalles.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Renderiza el contenido del chat en formato Markdown
    const renderMessageText = (text: string) => {
        return <div dangerouslySetInnerHTML={{ __html: marked.parse(text) }} />;
    };

    return (
        <motion.div
            variants={chatContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-24 right-6 md:right-10 z-[60] bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col w-[90vw] max-w-sm h-[70vh] max-h-[600px] border border-gray-200 dark:border-gray-700 font-montserrat"
        >
            {/* Encabezado del chat */}
            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-t-xl border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-blue-500 text-white">
                        <Bot size={20} />
                    </div>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">NubeBot</span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-400 transition-colors"
                    aria-label="Cerrar chat"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Contenedor de mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 dark:text-gray-500">
                        <Bot size={48} className="mb-2" />
                        <p>¡Hola! Soy NubeBot, tu asistente virtual de Nubeware.ai. ¿En qué puedo ayudarte?</p>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`flex items-start gap-2 max-w-[80%] rounded-xl p-3 shadow-sm ${msg.sender === 'user'
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                                }`}
                        >
                            {msg.sender === 'bot' && (
                                <Bot size={20} className="mt-1 flex-shrink-0 text-blue-500" />
                            )}
                            <div className="flex-1">
                                {renderMessageText(msg.text)}
                                {isLoading && msg.sender === 'bot' && (
                                    <div className="flex items-center justify-center space-x-2 mt-2">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75"></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                                    </div>
                                )}
                            </div>
                            {msg.sender === 'user' && (
                                <User size={20} className="mt-1 flex-shrink-0" />
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-center gap-2 max-w-[80%] rounded-xl p-3 shadow-sm bg-gray-100 dark:bg-gray-700">
                            <Bot size={20} className="mt-1 flex-shrink-0 text-blue-500" />
                            <div className="flex items-center space-x-1">
                                <span className="w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse delay-75"></span>
                                <span className="w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse delay-150"></span>
                                <span className="w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse delay-300"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Formulario de entrada */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 rounded-full p-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    disabled={isLoading}
                />
                <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full text-white transition-colors duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    disabled={isLoading}
                    aria-label="Enviar mensaje"
                >
                    <Send size={24} />
                </motion.button>
            </form>
        </motion.div>
    );
};

export default NubeBot;