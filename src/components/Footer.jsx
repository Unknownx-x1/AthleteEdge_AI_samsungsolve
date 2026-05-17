import React from 'react';

const Footer = ({ language }) => {
  const isEn = language === 'en';
  return (
    <footer className="mt-20 py-8 border-t border-border text-center pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2">
        <p className="text-sm text-muted">
          {isEn 
            ? "AthleteEdge AI is not a replacement for professional medical care." 
            : "एथलीटएज एआई पेशेवर चिकित्सा देखभाल का विकल्प नहीं है।"
          }
        </p>
        <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
          <span>{isEn ? 'Free Forever' : 'हमेशा के लिए मुफ़्त'}</span>
          <span>·</span>
          <span>{isEn ? 'No Ads' : 'कोई विज्ञापन नहीं'}</span>
          <span>·</span>
          <span>{isEn ? 'No Login Required' : 'लॉगिन आवश्यक नहीं'}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
