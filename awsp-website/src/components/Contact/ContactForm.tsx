'use client';

import { useState } from 'react';

const ENQUIRY_TYPES = [
  { en: 'Donor Enquiry',        ar: 'استفسار جهة مانحة' },
  { en: 'Partner Coordination', ar: 'تنسيق شراكة' },
  { en: 'Data Request',         ar: 'طلب بيانات' },
  { en: 'Media Enquiry',        ar: 'استفسار إعلامي' },
  { en: 'General Enquiry',      ar: 'استفسار عام' },
  { en: 'Other',                ar: 'أخرى' },
];

export default function ContactForm({ locale }: { locale: string }) {
  const isAr = locale === 'ar';
  const ff = isAr ? 'var(--font-arabic)' : 'var(--font-sans)';
  const serif = isAr ? 'var(--font-arabic)' : 'var(--font-serif)';

  const [form, setForm] = useState({ name: '', org: '', role: '', type: '', email: '', message: '', lang: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim())    e.name    = isAr ? 'هذا الحقل مطلوب.' : 'This field is required.';
    if (!form.org.trim())     e.org     = isAr ? 'هذا الحقل مطلوب.' : 'This field is required.';
    if (!form.email.trim())   e.email   = isAr ? 'هذا الحقل مطلوب.' : 'This field is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = isAr ? 'يرجى إدخال بريد إلكتروني صحيح.' : 'Please enter a valid email address.';
    if (!form.type)           e.type    = isAr ? 'هذا الحقل مطلوب.' : 'This field is required.';
    if (!form.message.trim()) e.message = isAr ? 'هذا الحقل مطلوب.' : 'This field is required.';
    return e;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section style={{ background: 'var(--paper)', padding: '96px 0' }}>
        <div className="wrap-narrow" style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(42,138,138,0.12)', color: 'var(--teal-600)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', marginBottom: '24px',
          }}>✓</div>
          <h2 style={{ fontFamily: serif, marginBottom: '16px' }}>
            {isAr ? 'شكراً على رسالتك' : 'Thank you for your message'}
          </h2>
          <p style={{ color: 'var(--gray-700)', fontFamily: ff, maxWidth: '48ch', margin: '0 auto' }}>
            {isAr
              ? 'سيقوم أحد أعضاء فريق عمل AWSP بمراجعة استفسارك والرد في أقرب وقت ممكن، في غضون خمسة أيام عمل.'
              : 'A member of the AWSP Taskforce will review your enquiry and respond within five working days.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: 'var(--paper)', padding: '96px 0' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '64px', alignItems: 'start' }}>

          {/* LEFT — context */}
          <div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              fontSize: '12px', fontWeight: '600', letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--teal-600)', fontFamily: ff,
            }}>
              <span style={{ width: '24px', height: '1.5px', background: 'var(--teal-500)', display: 'inline-block' }} />
              {isAr ? 'نموذج التواصل' : 'Contact Form'}
            </span>
            <h2 style={{ fontFamily: serif, marginTop: '16px', marginBottom: '16px' }}>
              {isAr ? 'أرسل استفساراً' : 'Send an enquiry'}
            </h2>
            <p style={{ color: 'var(--gray-700)', lineHeight: 1.7, fontFamily: ff, marginBottom: '32px' }}>
              {isAr
                ? 'استخدم هذا النموذج للتواصل مع فريق عمل AWSP. يُرجى تضمين أكبر قدر ممكن من التفاصيل حتى نتمكن من الرد بشكل مناسب.'
                : 'Use this form to reach the AWSP Taskforce. Please include as much detail as possible so we can respond appropriately.'}
            </p>

            {/* Response time card */}
            <div style={{
              background: 'var(--bone)', border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)', padding: '20px 24px', marginBottom: '16px',
            }}>
              <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: '8px', fontFamily: ff }}>
                {isAr ? 'وقت الاستجابة' : 'Response time'}
              </div>
              <div style={{ fontFamily: serif, fontSize: '1.1rem', color: 'var(--ink-800)', marginBottom: '4px' }}>
                {isAr ? 'خمسة أيام عمل' : 'Five working days'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--gray-500)', fontFamily: ff }}>
                {isAr
                  ? 'للاستفسارات العاجلة، تواصل مباشرة عبر البريد الإلكتروني.'
                  : 'For urgent matters, contact us directly by email.'}
              </div>
            </div>

            {/* Direct email card */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '16px 20px', background: '#fff',
              border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'rgba(42,138,138,0.1)', color: 'var(--teal-600)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{ width: 20, height: 20 }}>
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--gray-400)', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: ff }}>
                  {isAr ? 'مراسلة مباشرة' : 'Direct email'}
                </div>
                <a href="mailto:taskforce@awsp.gov.ye" style={{ fontSize: '14px', color: 'var(--teal-600)', fontWeight: '600', fontFamily: ff, textDecoration: 'none' }}>
                  taskforce@awsp.gov.ye
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div style={{
            background: '#fff', border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)', padding: '36px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {(['name','org'] as const).map(id => (
                  <div key={id} className="field">
                    <label htmlFor={id} style={{ fontFamily: ff }}>
                      {id === 'name' ? (isAr ? 'الاسم الكامل' : 'Full Name') : (isAr ? 'المنظمة' : 'Organisation')}
                      <span style={{ color: '#C25A4E', marginInlineStart: '3px' }}>*</span>
                    </label>
                    <input id={id} type="text" dir={isAr?'rtl':'ltr'}
                      value={form[id]} onChange={e => setForm(f => ({...f,[id]:e.target.value}))}
                      style={{ fontFamily: ff }}/>
                    {errors[id] && <span style={{ fontSize:'12px',color:'#C25A4E',fontFamily:ff }}>{errors[id]}</span>}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="field">
                  <label htmlFor="role" style={{ fontFamily: ff }}>{isAr ? 'الدور / المنصب' : 'Role / Position'}</label>
                  <input id="role" type="text" dir={isAr?'rtl':'ltr'}
                    value={form.role} onChange={e => setForm(f => ({...f,role:e.target.value}))}
                    style={{ fontFamily: ff }}/>
                </div>
                <div className="field">
                  <label htmlFor="email" style={{ fontFamily: ff }}>
                    {isAr ? 'البريد الإلكتروني' : 'Email Address'}
                    <span style={{ color: '#C25A4E', marginInlineStart: '3px' }}>*</span>
                  </label>
                  <input id="email" type="email" dir="ltr"
                    value={form.email} onChange={e => setForm(f => ({...f,email:e.target.value}))}
                    style={{ fontFamily: ff }}/>
                  {errors.email && <span style={{ fontSize:'12px',color:'#C25A4E',fontFamily:ff }}>{errors.email}</span>}
                </div>
              </div>

              <div className="field">
                <label htmlFor="type" style={{ fontFamily: ff }}>
                  {isAr ? 'نوع الاستفسار' : 'Enquiry Type'}
                  <span style={{ color: '#C25A4E', marginInlineStart: '3px' }}>*</span>
                </label>
                <select id="type" dir={isAr?'rtl':'ltr'}
                  value={form.type} onChange={e => setForm(f => ({...f,type:e.target.value}))}
                  style={{ fontFamily: ff }}>
                  <option value="">{isAr ? 'اختر نوع الاستفسار...' : 'Select enquiry type...'}</option>
                  {ENQUIRY_TYPES.map(t => (
                    <option key={t.en} value={t.en}>{isAr ? t.ar : t.en}</option>
                  ))}
                </select>
                {errors.type && <span style={{ fontSize:'12px',color:'#C25A4E',fontFamily:ff }}>{errors.type}</span>}
              </div>

              <div className="field">
                <label htmlFor="message" style={{ fontFamily: ff }}>
                  {isAr ? 'الرسالة' : 'Message'}
                  <span style={{ color: '#C25A4E', marginInlineStart: '3px' }}>*</span>
                </label>
                <textarea id="message" dir={isAr?'rtl':'ltr'}
                  value={form.message} onChange={e => setForm(f => ({...f,message:e.target.value}))}
                  placeholder={isAr ? 'يرجى وصف استفسارك...' : 'Please describe your enquiry...'}
                  style={{ fontFamily: ff, minHeight: '140px', resize: 'vertical' }}/>
                {errors.message && <span style={{ fontSize:'12px',color:'#C25A4E',fontFamily:ff }}>{errors.message}</span>}
              </div>

              <div className="field">
                <label htmlFor="lang" style={{ fontFamily: ff }}>{isAr ? 'تفضيل لغة الرد' : 'Response Language Preference'}</label>
                <select id="lang" dir={isAr?'rtl':'ltr'}
                  value={form.lang} onChange={e => setForm(f => ({...f,lang:e.target.value}))}
                  style={{ fontFamily: ff }}>
                  <option value="">{isAr ? 'أي لغة مقبولة' : 'Either language is fine'}</option>
                  <option value="ar">{isAr ? 'العربية' : 'Arabic'}</option>
                  <option value="en">{isAr ? 'الإنجليزية' : 'English'}</option>
                </select>
              </div>

              {status === 'error' && (
                <div style={{ padding:'14px 18px', background:'rgba(194,90,78,0.08)', border:'1px solid rgba(194,90,78,0.3)', borderRadius:'var(--radius)', fontSize:'14px', color:'#B23E33', fontFamily:ff }}>
                  {isAr
                    ? 'تعذّر إرسال رسالتك. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.'
                    : 'We were unable to send your message. Please try again or contact us directly.'}
                </div>
              )}

              <button onClick={handleSubmit} disabled={status === 'sending'}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  padding: '14px 32px', fontSize: '15px', fontWeight: '600',
                  background: status === 'sending' ? 'var(--gray-300)' : 'var(--ink-800)',
                  color: '#fff', border: 'none', borderRadius: 'var(--radius)',
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  fontFamily: ff, width: '100%', transition: 'background 180ms ease',
                }}>
                {status === 'sending'
                  ? (isAr ? 'جارٍ الإرسال...' : 'Sending...')
                  : (isAr ? 'إرسال الرسالة' : 'Send Message')}
                {status !== 'sending' && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
