import { ArrowUpRight, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";

const faqs = [
  {
    id: "01",
    question: "What services do you offer?",
    answer: "We offer a comprehensive range of services including UI/UX design, web development, branding, content strategy, and product design.",
  },
  {
    id: "02",
    question: "How can I get a quote or proposal?",
    answer: "Just reach out via our contact page or email. After a short discovery call, we'll send a tailored proposal outlining project scope, timeline, and cost.",
  },
  {
    id: "03",
    question: "What industries do you work with?",
    answer: "We work across various industries including tech startups, e-commerce, healthcare, finance, and creative agencies.",
  },
  {
    id: "04",
    question: "Will I be involved in the design process?",
    answer: "Absolutely! We believe in collaborative design and will keep you involved throughout the entire process with regular check-ins and feedback sessions.",
  },
  {
    id: "05",
    question: "Do you offer development or just design?",
    answer: "We offer both! Our team includes talented designers and developers who work together to bring your project to life from concept to launch.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">FAQ</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h2>

            <Button variant="neon" size="lg" className="rounded-full">
              <span>CONTACT US</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>

          <div>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border border-border rounded-lg px-6 data-[state=open]:border-accent transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{faq.id}</span>
                      <span className="text-lg">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
