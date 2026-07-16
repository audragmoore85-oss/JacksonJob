"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Mail, AlertCircle, CheckCircle, RotateCw } from "lucide-react";
import confetti from "canvas-confetti";
import { DifficultyConfig, EmailConversation } from "@/lib/gameData";
import { playCorrect, playWrong, playClick } from "@/lib/sounds";

interface Props {
  config: DifficultyConfig;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

interface Message {
  from: "user" | "coworker";
  text: string;
  correct?: boolean;
}

type Phase = "compose" | "sending" | "reply" | "compose2" | "sending2" | "done";

export default function TypingTask({ config, onComplete, onBack }: Props) {
  const [convIdx, setConvIdx] = useState(() =>
    Math.floor(Math.random() * config.emailConversations.length)
  );
  const conversation: EmailConversation = config.emailConversations[convIdx];
  const coworker = conversation.coworker;

  const [phase, setPhase] = useState<Phase>("compose");
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [phase]);

  const targetWords = (phase === "compose" || phase === "sending")
    ? conversation.userTemplate.split(/\s+/)
    : conversation.userReplyTemplate.split(/\s+/);

  const currentInput = phase === "compose" || phase === "sending" ? input : input2;
  const currentTemplate = phase === "compose" || phase === "sending"
    ? conversation.userTemplate
    : conversation.userReplyTemplate;

  const getWordComparison = (typed: string, template: string) => {
    const inputWords = typed.trim().split(/\s+/).filter((w: string) => w.length > 0);
    const templateWords = template.split(/\s+/);
    return templateWords.map((target: string, i: number) => {
      const typedWord = inputWords[i];
      const correct = typedWord !== undefined && typedWord.toLowerCase() === target.toLowerCase();
      return { word: target, correct };
    });
  };

  const countErrors = (typed: string, template: string) => {
    const comparison = getWordComparison(typed, template);
    const errors = comparison.filter((w: { correct: boolean }) => !w.correct).length;
    const inputWordCount = typed.trim().split(/\s+/).filter((w: string) => w.length > 0).length;
    const missingWords = template.split(/\s+/).length - inputWordCount;
    return errors + (missingWords > 0 ? missingWords : 0);
  };

  const handleSend = () => {
    const isSecondEmail = phase === "compose2";
    const typed = isSecondEmail ? input2 : input;
    const template = isSecondEmail ? conversation.userReplyTemplate : conversation.userTemplate;
    const errors = countErrors(typed, template);

    setAttempts((prev: number) => prev + 1);
    setTotalAttempts((prev: number) => prev + 1);
    setShowErrors(true);
    setErrorCount(errors);

    if (errors === 0) {
      playCorrect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FFD93D", "#6BCB77", "#4A90D9", "#FF6B9D"],
      });

      setMessages((prev: Message[]) => [...prev, { from: "user", text: typed, correct: true }]);

      if (!isSecondEmail) {
        setPhase("reply");
        setTimeout(() => {
          setMessages((prev: Message[]) => [
            ...prev,
            { from: "coworker", text: conversation.coworkerReply },
          ]);
          setPhase("compose2");
          setAttempts(0);
          setShowErrors(false);
        }, 2000);
      } else {
        setPhase("done");
        setTimeout(() => {
          setMessages((prev: Message[]) => [
            ...prev,
            { from: "coworker", text: conversation.coworkerFinalReply },
          ]);
          const stars = totalAttempts <= 1 ? 3 : totalAttempts <= 3 ? 2 : 1;
          setTimeout(() => onComplete(stars), 2500);
        }, 1000);
      }
    } else {
      playWrong();
    }
  };

  const handleNewConversation = () => {
    playClick();
    const nextIdx = (convIdx + 1) % config.emailConversations.length;
    setConvIdx(nextIdx);
    setInput("");
    setInput2("");
    setMessages([]);
    setShowErrors(false);
    setErrorCount(0);
    setAttempts(0);
    setTotalAttempts(0);
    setPhase("compose");
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const comparison = showErrors ? getWordComparison(currentInput, currentTemplate) : null;
  const inputWords = currentInput.trim().split(/\s+/).filter((w: string) => w.length > 0);
  const templateWordCount = currentTemplate.split(/\s+/).length;
  const typedCorrect = inputWords.filter(
    (w: string, i: number) => {
      const tw = currentTemplate.split(/\s+/)[i];
      return tw && w.toLowerCase() === tw.toLowerCase();
    }
  ).length;

  const isSecondPhase = phase === "compose2" || phase === "sending2";
  const isTypingPhase = phase === "compose" || phase === "compose2";
  const showTypingArea = phase === "compose" || phase === "compose2";

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen p-4 md:p-8 flex flex-col items-center"
    >
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Desk
        </button>
        <div className="flex items-center gap-2 bg-kid-blue/10 px-3 py-1 rounded-full">
          <Mail className="w-4 h-4 text-kid-blue" />
          <span className="text-sm font-bold text-kid-blue">Email Conversation</span>
        </div>
      </div>

      <motion.div
        animate={showErrors && errorCount > 0 && isTypingPhase ? { x: [-10, 10, -10, 10, 0] } : {}}
        className="kid-card border-kid-blue w-full max-w-2xl"
      >
        {/* Coworker Profile */}
        <div className="flex items-center gap-3 bg-kid-blue/5 rounded-xl p-3 mb-4 border-2 border-kid-blue/20">
          <div className="text-4xl">{coworker.avatar}</div>
          <div>
            <p className="font-bold text-gray-800">{coworker.name}</p>
            <p className="text-xs text-gray-500">{coworker.role}</p>
          </div>
          <div className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-lg">
            RE: {conversation.subject}
          </div>
        </div>

        {/* Email Thread / Messages */}
        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {messages.map((msg: Message, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.from === "user"
                    ? "bg-kid-blue text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold opacity-70">
                    {msg.from === "user" ? "You" : coworker.avatar}
                  </span>
                  {msg.from === "user" && msg.correct && (
                    <CheckCircle className="w-3 h-3 text-green-300" />
                  )}
                </div>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {(phase === "reply" || phase === "done") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i: number) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Target Email Template */}
        {showTypingArea && (
          <>
            <div className="bg-kid-cream rounded-2xl p-4 mb-4 border-2 border-kid-yellow/40">
              <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
                {isSecondPhase ? "📋 Reply to their message:" : "📋 Type this email:"}
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {isSecondPhase ? conversation.userReplyTemplate : conversation.userTemplate}
              </p>
            </div>

            {/* Typing Area */}
            <div className="mb-4">
              <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">
                ✍️ Your email:
              </p>
              <textarea
                ref={textareaRef}
                value={isSecondPhase ? input2 : input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  if (isSecondPhase) setInput2(e.target.value);
                  else setInput(e.target.value);
                  if (showErrors) setShowErrors(false);
                }}
                placeholder="Start typing your email here..."
                className={`w-full px-4 py-3 rounded-xl border-4 text-base md:text-lg leading-relaxed transition-all focus:outline-none resize-none ${
                  showErrors && errorCount > 0
                    ? "border-red-400 bg-red-50"
                    : "border-kid-blue bg-white text-gray-800"
                }`}
                rows={5}
              />
            </div>

            {/* Error Highlighting */}
            <AnimatePresence>
              {showErrors && errorCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4"
                >
                  <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <p className="text-sm font-bold text-red-600">
                        {coworker.name} could not read your email! {errorCount} word{errorCount !== 1 ? "s" : ""} need{errorCount === 1 ? "s" : ""} fixing.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 leading-loose mb-3">
                      {comparison!.map((ws: { word: string; correct: boolean }, i: number) => (
                        <span
                          key={i}
                          className={`px-1.5 py-0.5 rounded font-bold text-sm ${
                            ws.correct
                              ? "bg-green-100 text-green-700"
                              : "bg-red-200 text-red-700 underline decoration-wavy"
                          }`}
                        >
                          {ws.word}
                        </span>
                      ))}
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                      <p className="text-sm text-gray-600 italic">
                        <span className="font-bold">{coworker.avatar} {coworker.name} says:</span> {coworker.badReply}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Fix the red words above and send again!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Send Button */}
            <div className="flex gap-3 justify-center mb-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={currentInput.trim().length === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all ${
                  currentInput.trim().length === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-kid-blue hover:bg-blue-600"
                }`}
              >
                <Send className="w-5 h-5" />
                Send Email
              </motion.button>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-500">
                  Words: {inputWords.length} / {templateWordCount}
                </span>
                {inputWords.length > 0 && (
                  <span className="font-bold text-kid-green">
                    {Math.round((typedCorrect / templateWordCount) * 100)}% correct
                  </span>
                )}
              </div>
              {attempts > 0 && (
                <span className="font-bold text-gray-400">Attempt #{attempts + 1}</span>
              )}
            </div>
          </>
        )}

        {/* Completion Screen */}
        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="bg-green-50 rounded-xl p-4 border-2 border-kid-green mb-4">
              <CheckCircle className="w-10 h-10 text-kid-green mx-auto mb-2" />
              <p className="text-lg font-bold text-kid-green">Conversation Complete! 🎉</p>
              <p className="text-sm text-gray-600 mt-1">
                {totalAttempts === 2
                  ? "Perfect emails on the first try! Amazing proofreading!"
                  : `You completed the conversation in ${totalAttempts} attempts. Great work!`}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewConversation}
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm bg-kid-yellow text-gray-700 hover:bg-yellow-400 mx-auto"
            >
              <RotateCw className="w-4 h-4" />
              Email Someone New
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
