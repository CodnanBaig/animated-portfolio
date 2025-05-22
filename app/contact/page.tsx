import { ContactForm } from '@/components/contact/contact-form';
import { ContactInfo } from '@/components/contact/contact-info';

export const metadata = {
  title: 'Contact | AI-Powered Developer',
  description: 'Get in touch with me for project inquiries or collaboration opportunities',
};

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
          Let&apos;s Connect
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}