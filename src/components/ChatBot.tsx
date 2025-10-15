import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  industry: string;
  message: string;
  consent: boolean;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm here to help you get in touch with NovalSquad Outsourcing. What's your name?",
      timestamp: new Date()
    }
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    industry: '',
    message: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Show notification after 2 seconds (desktop only)
  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const steps = [
    { field: 'name', question: "What's your name?", type: 'text' },
    { field: 'email', question: "What's your email address?", type: 'email' },
    { field: 'phone', question: "What's your phone number?", type: 'text' },
    { field: 'company_name', question: "What's your company name? (Optional - type 'skip' to skip)", type: 'text' },
    { field: 'industry', question: "What industry are you in?", type: 'select' },
    { field: 'message', question: "Tell us about your project or how we can help you.", type: 'textarea' },
    { field: 'consent', question: "Do you agree to our Privacy Policy and Terms & Conditions?", type: 'consent' }
  ];

  const addMessage = (content: string, type: 'bot' | 'user') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleUserInput = async (input: string) => {
    addMessage(input, 'user');
    
    const step = steps[currentStep];
    
    if (step.field === 'company_name' && input.toLowerCase() === 'skip') {
      setFormData(prev => ({ ...prev, [step.field]: '' }));
    } else if (step.field === 'consent') {
      const agrees = input.toLowerCase().includes('yes') || input.toLowerCase().includes('agree');
      setFormData(prev => ({ ...prev, consent: agrees }));
      
      if (!agrees) {
        addMessage("I understand. You can reach out to us directly at contact@novalsquad.com if you prefer.", 'bot');
        return;
      }
    } else {
      setFormData(prev => ({ ...prev, [step.field]: input }));
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimeout(() => {
        addMessage(steps[currentStep + 1].question, 'bot');
      }, 500);
    } else {
      // Submit form
      await submitForm();
    }
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    addMessage("Thank you! Let me submit your information...", 'bot');

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (error) throw error;

      addMessage("Perfect! Your message has been submitted successfully. Our team will get back to you within 24 hours. Thank you for choosing NovalSquad Outsourcing!", 'bot');
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      addMessage("I apologize, there was an issue submitting your information. Please try contacting us directly at contact@novalsquad.com", 'bot');
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const IndustrySelect = () => {
    const industries = [
      'Healthcare', 'Finance', 'Retail', 'Education', 'Automotive',
      'Real Estate', 'Gaming', 'Technology', 'Manufacturing', 'Logistics',
      'Entertainment', 'Other'
    ];

    return (
      <div className="space-y-2">
        {industries.map((industry) => (
          <Button
            key={industry}
            variant="outline"
            size="sm"
            className="mr-2 mb-2"
            onClick={() => handleUserInput(industry)}
          >
            {industry}
          </Button>
        ))}
      </div>
    );
  };

  const ConsentButtons = () => (
    <div className="space-y-2">
      <Button
        variant="outline"
        size="sm"
        className="mr-2"
        onClick={() => handleUserInput("Yes, I agree")}
      >
        Yes, I agree
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleUserInput("No, I don't agree")}
      >
        No, I don't agree
      </Button>
    </div>
  );

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Button
            onClick={() => {
              setIsOpen(true);
              setShowNotification(false);
              setNotificationCount(0);
            }}
            className={`group relative h-16 w-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-br from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white border-2 border-indigo-400/30 overflow-hidden ${
              showNotification ? 'animate-bounce' : ''
            }`}
            size="icon"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-full"></div>
            
            {/* Icon */}
            <MessageCircle className="h-7 w-7 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Notification badge */}
            {showNotification && notificationCount > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse z-20">
                {notificationCount}
              </div>
            )}
            
            {/* Pulsing ring */}
            <div className="absolute inset-0 border-2 border-indigo-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 shadow-2xl z-50 flex flex-col border-2 border-primary/20 animate-in slide-in-from-bottom-4 fade-in duration-300 ${
          isMobile ? 'w-[calc(100vw-3rem)] h-[calc(100vh-8rem)] max-w-sm' : 'w-96 h-[500px]'
        }`}>
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Chat with NovalSquad Outsourcing</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-200 hover:scale-110"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            
            {currentStep < steps.length && !isSubmitting && (
              <div className="space-y-3">
                {steps[currentStep].type === 'select' && <IndustrySelect />}
                {steps[currentStep].type === 'consent' && <ConsentButtons />}
                {!['select', 'consent'].includes(steps[currentStep].type) && (
                  <ChatInput onSend={handleUserInput} disabled={isSubmitting} />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

const ChatInput = ({ onSend, disabled }: { onSend: (input: string) => void; disabled: boolean }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex space-x-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1"
      />
      <Button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChatBot;