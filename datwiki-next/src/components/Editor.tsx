'use client';

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                        ['link', 'image'],
                        ['clean']
                    ],
                },
            });

            quillRef.current.on('text-change', () => {
                if (quillRef.current) {
                    onChange(quillRef.current.root.innerHTML);
                }
            });
        }
    }, []);

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            // Only update if content is different to avoid cursor jumping
            // This is a simple check, for production might need more robust diffing
            // or just set it if it's empty (initial load)
            if (value === '' && quillRef.current.root.innerHTML === '<p><br></p>') {
                return;
            }
            // For simplicity in this fix, we only set if it's drastically different or initial
            // A better approach for controlled component is complex with Quill.
            // We will assume this is mostly for initial load or external resets.
            if (!quillRef.current.hasFocus()) {
                quillRef.current.root.innerHTML = value;
            }
        }
    }, [value]);

    return <div ref={editorRef} style={{ height: '300px' }} />;
}
