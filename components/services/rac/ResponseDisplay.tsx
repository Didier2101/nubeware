'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { ResponseDisplayProps } from './types';
import { JSX } from 'react';

export default function ResponseDisplay({ data, isError = false }: ResponseDisplayProps) {
    if (!data) return null;

    if (isError || data.status === 'error') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
                <div className="flex items-center text-red-700 font-semibold mb-2">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    ERROR
                </div>
                <pre className="text-sm text-red-800 whitespace-pre-wrap overflow-auto">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </motion.div>
        );
    } else {
        let content: JSX.Element;

        if (data.answer) {
            content = (
                <>
                    <div className="flex items-center text-green-700 font-semibold mb-2">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        RESPUESTA
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap p-3 bg-white rounded border-l-4 border-green-500">
                        {data.answer}
                    </div>
                </>
            );
        } else if (data.message) {
            content = (
                <>
                    <div className="flex items-center text-blue-700 font-semibold mb-2">
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        MENSAJE
                    </div>
                    <div className="text-gray-700 whitespace-pre-wrap p-3 bg-white rounded border-l-4 border-blue-500">
                        {data.message}
                    </div>
                </>
            );
        } else {
            content = <pre className="text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>;
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
                {content}
            </motion.div>
        );
    }
}