import React from 'react';
import { Input } from '../components/ui/Input';
import Button from '../components/ui/Button';

const StyleguidePage: React.FC = () => {
  return (
    <div className="container-custom section-py">
      <div className="max-w-2xl mx-auto space-y-12">
        <header className="space-y-4">
          <div className="tag">UI Components</div>
          <h1 className="heading-xl">Inputs & Forms</h1>
          <p className="text-gray-600">
            Premium form fields designed for high-end contact and search overlays.
          </p>
        </header>

        <section className="space-y-8">
          <div className="space-y-6">
            <h3 className="heading-md border-b pb-2">Text Inputs</h3>
            
            <div className="grid gap-6">
              <Input 
                label="Standard Input" 
                placeholder="Enter your name..." 
              />
              
              <Input 
                label="Focused State (forced)" 
                placeholder="Always looks focused" 
                isFocused={true}
              />
              
              <Input 
                label="With Error" 
                placeholder="Check the error below" 
                error="This field is required"
              />
              
              <Input 
                label="Search Style" 
                placeholder="Search projects..." 
                className="rounded-full px-6"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="heading-md border-b pb-2">Form Example</h3>
            <div className="glass-card p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="Jane" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email Address" type="email" placeholder="jane@example.com" />
              <Input label="Subject" placeholder="How can we help?" />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                <textarea 
                  className="text-input min-h-[120px] resize-none" 
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <Button className="w-full justify-center py-4">Send Message</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StyleguidePage;
