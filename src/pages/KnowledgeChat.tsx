import React, { useState, useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, SendHorizontal, RotateCcw, Info, Database, ArrowRightLeft, FileCog, Settings, FileText, Loader2 } from "lucide-react";
import { knowledgeBases, sampleChatMessages } from "@/utils/sampleData";

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sourceDocuments?: Array<{
    id: string;
    title: string;
    relevance: number;
  }>;
}

interface SourceDocument {
  id: string;
  title: string;
  relevance: number;
}

const KnowledgeChat = () => {
  const { kbId } = useParams<{ kbId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSourceDocuments, setShowSourceDocuments] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Find the selected knowledge base
  const selectedKB = knowledgeBases.find(kb => kb.id === kbId);
  
  // Load chat history
  useEffect(() => {
    // Normally you'd fetch this from a server based on the KB ID
    // For this demo, we'll just use sample data
    setMessages(sampleChatMessages);
  }, [kbId]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);
    
    // Focus back on textarea
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
    
    // Simulate AI response (would be an API call in a real app)
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: `This is a simulated response to: "${currentMessage}"\n\nBased on the ${selectedKB?.name}, I've analyzed your query and found relevant information. The analysis shows several key insights related to your question.\n\nDoes this help answer your question?`,
        timestamp: new Date().toISOString(),
        sourceDocuments: [
          { id: `doc-${Math.floor(Math.random() * 1000)}`, title: "Related Technical Documentation", relevance: 0.92 },
          { id: `doc-${Math.floor(Math.random() * 1000)}`, title: "Recent Support Tickets", relevance: 0.85 },
          { id: `doc-${Math.floor(Math.random() * 1000)}`, title: "Training Materials", relevance: 0.78 }
        ]
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const handleClearChat = () => {
    setMessages([]);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted/50">
      <main className="flex-1 container px-4 py-6">
        <div className="flex flex-col h-[calc(100vh-6rem)] max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1.5"
              onClick={() => navigate('/knowledge-bases')}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Knowledge Bases</span>
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5"
                onClick={handleClearChat}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Clear Chat</span>
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1.5"
                  >
                    <Info className="h-4 w-4" />
                    <span className="hidden sm:inline">KB Info</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Knowledge Base Information</h4>
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-2 mb-2">
                        <Database className="h-4 w-4" />
                        <span className="font-medium">{selectedKB?.name}</span>
                      </div>
                      <p className="ml-6 mb-2">{selectedKB?.description}</p>
                      <div className="ml-6 grid grid-cols-2 gap-1 text-xs">
                        <span>Source:</span>
                        <span>{selectedKB?.sourceDataset}</span>
                        <span>Documents:</span>
                        <span>{selectedKB?.documentCount.toLocaleString()}</span>
                        <span>Created:</span>
                        <span>{new Date(selectedKB?.createdAt || '').toLocaleDateString()}</span>
                        <span>Status:</span>
                        <span className="capitalize">{selectedKB?.status}</span>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1.5"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
          
          <Card className="flex flex-col flex-1 bg-card/80 backdrop-blur-sm">
            <CardHeader className="px-4 py-3 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary/10 text-primary">KB</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{selectedKB?.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {selectedKB?.documentCount.toLocaleString()} documents • {selectedKB?.status}
                    </CardDescription>
                  </div>
                </div>
                
                <Tabs defaultValue="chat">
                  <TabsList className="h-8">
                    <TabsTrigger value="chat" className="text-xs px-2">
                      <ArrowRightLeft className="h-3.5 w-3.5 mr-1.5" />
                      Chat
                    </TabsTrigger>
                    <TabsTrigger value="config" className="text-xs px-2">
                      <FileCog className="h-3.5 w-3.5 mr-1.5" />
                      Config
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 h-full overflow-hidden">
              <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                <TabsContent value="chat" className="flex-1 flex flex-col m-0 data-[state=active]:flex-1">
                  <ScrollArea className="flex-1 p-4">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <ArrowRightLeft className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">Start a Conversation</h3>
                        <p className="text-sm text-muted-foreground max-w-md">
                          Ask questions to explore the knowledge base and receive AI-powered responses
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6 pb-4">
                        {messages.map((message) => (
                          <div 
                            key={message.id} 
                            className={cn(
                              "flex flex-col",
                              message.role === "user" ? "items-end" : "items-start"
                            )}
                          >
                            <div className="flex items-start gap-3 max-w-3xl">
                              {message.role === "assistant" && (
                                <Avatar className="mt-0.5 h-8 w-8 border-2 border-background">
                                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">AI</AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div 
                                className={cn(
                                  "rounded-lg px-4 py-2.5 text-sm shadow-sm",
                                  message.role === "user" 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-muted"
                                )}
                              >
                                <div className="whitespace-pre-wrap">{message.content}</div>
                                
                                {message.role === "assistant" && message.sourceDocuments && (
                                  <div className="mt-2">
                                    <Button 
                                      variant="link" 
                                      size="sm" 
                                      className="h-auto p-0 text-xs text-muted-foreground"
                                      onClick={() => setShowSourceDocuments(!showSourceDocuments)}
                                    >
                                      {showSourceDocuments ? "Hide" : "Show"} {message.sourceDocuments.length} sources
                                    </Button>
                                    
                                    {showSourceDocuments && (
                                      <div className="mt-2 space-y-1.5">
                                        {message.sourceDocuments.map((doc) => (
                                          <div 
                                            key={doc.id} 
                                            className="flex items-center gap-2 text-xs text-muted-foreground"
                                          >
                                            <FileText className="h-3 w-3" />
                                            <span>{doc.title}</span>
                                            <span className="text-xs opacity-70">({Math.round(doc.relevance * 100)}%)</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              {message.role === "user" && (
                                <Avatar className="mt-0.5 h-8 w-8 border-2 border-background order-1">
                                  <AvatarFallback className="bg-zinc-800 text-zinc-200 text-sm">U</AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                            
                            <span className="text-xs text-muted-foreground mt-1 px-12">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                        ))}
                        
                        {isTyping && (
                          <div className="flex items-start gap-3 max-w-3xl">
                            <Avatar className="mt-0.5 h-8 w-8 border-2 border-background">
                              <AvatarFallback className="bg-primary text-primary-foreground text-sm">AI</AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg px-4 py-2.5 text-sm shadow-sm bg-muted min-w-24">
                              <div className="flex items-center gap-1.5">
                                <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                                <span className="text-muted-foreground">Thinking</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <div className="relative">
                      <Textarea 
                        ref={textareaRef}
                        placeholder="Ask a question about this knowledge base..."
                        className="min-h-24 resize-none pr-16 py-3"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isTyping}
                      />
                      <Button 
                        size="icon" 
                        className="absolute right-2 bottom-2"
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isTyping}
                      >
                        <SendHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Responses are generated based on the content in this knowledge base.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="config" className="flex-1 p-4">
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <FileCog className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">Chat Configuration</h3>
                    <p className="text-sm text-muted-foreground max-w-md mb-6">
                      Customize the chat behavior and response parameters
                    </p>
                    <Button variant="outline">Configure Chat</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default KnowledgeChat;