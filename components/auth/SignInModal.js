'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';
import { getCookie, setCookie } from '@/utils/cookies';
import Modal from '@/components/ui/Modal';

export default function SignInModal({ isOpen, onClose }) {
  const [step, setStep] = useState('email'); // 'email' or 'password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load email from cookie on mount
  useEffect(() => {
    if (isOpen) {
      const savedEmail = getCookie('user_email');
      if (savedEmail) {
        setEmail(savedEmail);
        // Auto-advance to password step if email exists
        setStep('password');
      }
    }
  }, [isOpen]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('email');
      setPassword('');
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleEmailNext = () => {
    // Check if user has accepted cookies before saving email
    const consent = getCookie('cookie_consent');
    if (consent === 'accepted') {
      // Save email to cookie only if consent is given
      setCookie('user_email', email, 30);
    }
    
    // TODO: Check with backend if email is registered with Rangam
    // For now, proceed to password step
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('password');
    }, 800);
  };

  const handlePasswordSubmit = () => {
    setIsLoading(true);
    
    // TODO: Implement actual sign-in logic
    // For now, simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // On success, close modal and redirect
      onClose();
      // TODO: Handle successful sign-in (redirect to dashboard, etc.)
    }, 1000);
  };

  const handleBack = () => {
    setStep('email');
    setPassword('');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      maxWidth="md"
      zIndex={100}
    >
      <div className="p-8 md:p-10">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-linear-to-br from-orange-500 via-rose-500 to-pink-500 rounded-xl flex items-center justify-center"
            style={{
              boxShadow: '0 4px 12px -3px rgba(249, 115, 22, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
            }}
          >
            <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black bg-linear-to-r from-gray-900 via-orange-900 to-gray-900 bg-clip-text text-transparent">
            JobVita
          </span>
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {step === 'email' ? (
            <EmailStep 
              email={email}
              setEmail={setEmail}
              onNext={handleEmailNext}
              isLoading={isLoading}
            />
          ) : (
            <PasswordStep
              email={email}
              password={password}
              setPassword={setPassword}
              onBack={handleBack}
              onSubmit={handlePasswordSubmit}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

