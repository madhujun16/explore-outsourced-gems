import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions",
  subtitle = "Find answers to common questions about our services",
  className = "" 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-16 md:py-24 ${className}`} itemScope itemType="https://schema.org/FAQPage">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          </div>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary/30 transition-all duration-300"
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question"
            >
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle 
                      className="text-lg md:text-xl font-semibold text-left"
                      itemProp="name"
                    >
                      {faq.question}
                    </CardTitle>
                  </div>
                  <div className="flex-shrink-0 mt-1">
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 text-primary transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 transition-transform duration-300" />
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {openIndex === index && (
                <CardContent 
                  className="pt-0 animate-in slide-in-from-top-2 duration-300"
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                >
                  <div 
                    className="text-gray-600 leading-relaxed border-t pt-4"
                    itemProp="text"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

