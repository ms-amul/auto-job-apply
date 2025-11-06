'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { getCookie, setCookie } from '@/utils/cookies';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookie_consent');
    if (!consent) {
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookie_consent', 'accepted', 365);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setCookie('cookie_consent', 'declined', 365);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 p-4 animate-modal-slideUp"
      style={{ zIndex: 100 }}
    >
      <div 
        className="max-w-2xl mx-auto bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden"
      >
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500 to-rose-500 flex items-center justify-center shrink-0">
              <Cookie className="w-5 h-5 text-white" strokeWidth={2} />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Cookie Notice
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use cookies (user_email, user_session, app_data) which are required for site functionality, authentication, and storing your preferences.
              </p>
            </div>

            <button
              onClick={handleDecline}
              className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="w-4 h-4 text-gray-600" strokeWidth={2} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDecline}
              className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
            >
              Decline
            </button>

            <button
              onClick={handleAccept}
              className="px-5 py-2.5 rounded-lg font-semibold text-white bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all text-sm"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

