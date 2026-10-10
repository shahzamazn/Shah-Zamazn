import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  ExternalLink, 
  Check, 
  Copy, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  ShieldCheck,
  Package
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PlayStorePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'ur';
}

export const PlayStorePublishModal: React.FC<PlayStorePublishModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'directInstall' | 'playStoreSteps'>('directInstall');

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-zyhuixutz4qbvmuyuyd6rt-662195466402.asia-southeast1.run.app';

  const handleCopyUrl = () => {
    navigator.clipboard?.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-950/40">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>{lang === 'ur' ? 'گوگل پلے اسٹور اور موبائل انسٹالیشن' : 'Google Play Store & Mobile Install'}</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ur' ? 'شاہ زمان ایپ کو اپنے موبائل اور پلے اسٹور پر لائیں' : 'Publish or install Shahzaman directly on Android'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 border-b border-slate-800 flex items-center gap-2 bg-slate-950/30">
          <button
            onClick={() => setActiveTab('directInstall')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'directInstall'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'موبائل میں ڈائریکٹ انسٹال کریں' : 'Direct Mobile Install'}</span>
          </button>

          <button
            onClick={() => setActiveTab('playStoreSteps')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
              activeTab === 'playStoreSteps'
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'پلے اسٹور پر اپلوڈ کرنے کا طریقہ (.AAB)' : 'Play Store Release Steps (.AAB)'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {activeTab === 'directInstall' ? (
            <div className="space-y-6">
              
              {/* Direct Install Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'ur' ? 'شاہ زمان آفیشل اینڈرائیڈ ایپ' : 'Official Shahzaman Android App'}</span>
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md">
                    {lang === 'ur'
                      ? 'یہ ایپ PWA ٹیکنالوجی سے لیس ہے، جسے کسی بھی اینڈرائیڈ فون کی ہوم اسکرین پر بغیر پلے اسٹور انتظار کے ابھی ڈاؤنلوڈ کیا جا سکتا ہے۔'
                      : 'Shahzaman is fully PWA-certified and can be installed right now to your Android Home Screen with standalone full-screen player mode.'}
                  </p>
                </div>

                {isInstalled ? (
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === 'ur' ? 'ایپ پہلے سے انسٹال ہے' : 'Already Installed'}</span>
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={install}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-transform active:scale-95 cursor-pointer shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>{lang === 'ur' ? 'ابھی موبائل پر انسٹال کریں' : 'Install App Now'}</span>
                  </button>
                ) : (
                  <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-xs text-center">
                    {isIOS ? (
                      <span>
                        iOS (iPhone): Tap <strong className="text-white">Share</strong> in Safari &amp; choose <strong className="text-white">Add to Home Screen</strong>.
                      </span>
                    ) : (
                      <span>
                        {lang === 'ur' 
                          ? 'کروم براؤزر کے اوپر موجود تین نقطوں (⋮) پر کلک کر کے "Install App" منتخب کریں۔'
                          : 'In Chrome menu (⋮), tap "Install App" or "Add to Home screen".'}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Share URL Box */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    {lang === 'ur' ? 'ایپ کا لائیو یو آر ایل:' : 'Live App URL:'}
                  </span>
                  <p className="text-xs text-slate-300 font-mono truncate max-w-lg">
                    {currentUrl}
                  </p>
                </div>

                <button
                  onClick={handleCopyUrl}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? (lang === 'ur' ? 'کاپی ہو گیا' : 'Copied!') : (lang === 'ur' ? 'لنک کاپی کریں' : 'Copy URL')}</span>
                </button>
              </div>

            </div>
          ) : (
            /* Play Store Publishing Steps */
            <div className="space-y-5">
              
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                <p className="font-bold mb-1">
                  {lang === 'ur' ? 'پلے اسٹور کے لیے ضروری معلومات:' : 'Google Play Console Package Info:'}
                </p>
                <p className="text-slate-300">
                  {lang === 'ur' 
                    ? 'گوگل پلے اسٹور پر ویب ایپس کو TWA (Trusted Web Activity) / PWABuilder کے ذریعے ایک مکمل .aab بنڈل بنا کر اپلوڈ کیا جاتا ہے۔ ہم نے آپ کی ایپ کا مینی فیسٹ، آئیکونز (192px/512px)، اور سروس ورکر مکمل طور پر تیار کر دیا ہے!'
                    : 'Web apps are published to Google Play via Trusted Web Activity (TWA). Your app manifest, service worker, 192x192 & 512x512 icons, and assetlinks.json are all pre-configured and compliant!'}
                </p>
              </div>

              {/* Step by step */}
              <div className="space-y-3">
                
                {/* Step 1 */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">
                        {lang === 'ur' ? 'مفت ٹول PWABuilder کھولیں' : 'Open PWABuilder.com (Official Free Tool)'}
                      </h5>
                      <a
                        href="https://www.pwabuilder.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>PWABuilder</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-slate-400 mt-1">
                      {lang === 'ur'
                        ? 'مائیکروسافٹ اور گوگل کا آفیشل ٹول www.pwabuilder.com کھولیں اور اس میں اپنی ایپ کا یو آر ایل پیسٹ کریں۔'
                        : 'Go to pwabuilder.com and paste your app URL. It will verify that your PWA manifest and service worker pass 100% of Play Store requirements.'}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex-1 text-xs">
                    <h5 className="font-bold text-white text-sm">
                      {lang === 'ur' ? 'اینڈرائیڈ پیکج جنریٹ کریں (.aab فائل)' : 'Click "Package for Android" (.aab File)'}
                    </h5>
                    <p className="text-slate-400 mt-1">
                      Package Name: <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">com.shahzaman.entertainment</code><br />
                      App Name: <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">Shahzaman</code><br />
                      {lang === 'ur'
                        ? '"Generate Package" پر کلک کریں تاکہ وہ آپ کے لیے سائن شدہ اینڈرائیڈ بنڈل ڈاؤنلوڈ کر دے۔'
                        : 'PWABuilder will automatically build a signed Android App Bundle (.aab file) ready for the store.'}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">
                        {lang === 'ur' ? 'گوگل پلے کنسول پر اپلوڈ کریں' : 'Upload to Google Play Console'}
                      </h5>
                      <a
                        href="https://play.google.com/console"
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Play Console</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-slate-400 mt-1">
                      {lang === 'ur'
                        ? 'اپنے Google Play Developer Console اکاؤنٹ میں لاگ ان کریں، "Create App" پر کلک کریں، اور ڈاؤنلوڈ شدہ .aab فائل اپلوڈ کر دیں۔'
                        : 'Log into play.google.com/console, create a new app named "Shahzaman", upload the .aab, and submit for Google review.'}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            {lang === 'ur' ? 'شاہ زمان برانڈڈ پلے اسٹور ریڈی بنڈل' : 'Shahzaman Play Store Compatible Bundle'}
          </p>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {lang === 'ur' ? 'بند کریں' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
