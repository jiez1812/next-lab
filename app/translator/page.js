'use client';

import React, { useState, useRef, useLayoutEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState("en");
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const languageOptions = [
    { label: "English - en", value: "en" },
    { label: "Spanish - es", value: "es" },
    { label: "French - fr", value: "fr" },
    { label: "Chinese (Simplified) - 中文", value: "zh-CN" },
    { label: "Japanese - 日本語", value: "ja" },
    { label: "German - Deutsch", value: "de" },
    { label: "Italian - Italiano", value: "it" },
    { label: "Portuguese - Português", value: "pt" },
    { label: "Russian - Русский", value: "ru" },
    { label: "Korean - 한국어", value: "ko" },
    { label: "Arabic - العربية", value: "ar" },
    { label: "Hindi - हिंदी", value: "hi" },
    { label: "Turkish - Türkçe", value: "tr" },
  ];

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Please translate the following text into ${targetLanguage}, ensuring accuracy and explaining any technical terms: ${inputText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setTranslatedText(text);
    } catch (error) {
      console.error("Error during translation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    const resizeInput = () => {
      if (inputRef.current) {
        const isMobile = window.innerWidth <= 768;
        
        // Force reflow
        inputRef.current.style.height = 'auto';
        
        const scrollHeight = inputRef.current.scrollHeight;
        
        const maxHeight = isMobile ? '100vh' : '50vh';
        inputRef.current.style.height = `min(${scrollHeight}px, ${maxHeight})`;
      }
    };

    resizeInput();

    const inputResizeObserver = new ResizeObserver(resizeInput);
    if (inputRef.current) {
      inputResizeObserver.observe(inputRef.current);
    }

    window.addEventListener('resize', resizeInput);

    return () => {
      if (inputRef.current) {
        inputResizeObserver.unobserve(inputRef.current);
      }
      inputResizeObserver.disconnect();
      window.removeEventListener('resize', resizeInput);
    };
  }, [inputText]); // Added inputText as a dependency to trigger resize on content change

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        LLM (Large Language Model) Translator
      </h1>

      <div className="flex flex-col gap-4">
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text to translate..."
          className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ resize: 'none', maxHeight: '100vh' }}
        />

        <div className="flex flex-wrap gap-2">
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <button
              onClick={handleTranslate}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!inputText.trim()}
            >
              Translate
            </button>
          )}

          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="select select-bordered flex-grow"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {translatedText && (
          <div className="mt-4 rounded-md border border-gray-300 p-4">
            <ReactMarkdown className="w-full prose-lg prose-slate">
              {translatedText}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}