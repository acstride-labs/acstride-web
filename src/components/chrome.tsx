'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {ArrowUpRight, Globe2, Menu, X} from 'lucide-react';
import {useState} from 'react';
import {locales, localeNames, organization, type Locale} from '@/lib/site';
import {buttonClass} from './ui/button';

export function Brand() {
  return <span className="brand"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="M5 24 14 7h5l8 17h-6l-5-11-5 11z" fill="currentColor"/><path d="m7 26 17-9" stroke="var(--paper)" strokeWidth="3"/></svg></span><span>ACStride<span className="brand-dot">.</span></span></span>;
}
export function Header({locale}: {locale: Locale}) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const suffix = pathname.split('/').slice(2).join('/');
  return <>
    <a className="skip-link" href="#main">{t('skip')}</a>
    <header className="header"><div className="shell header-inner">
      <Link href={`/${locale}`} aria-label="ACStride"><Brand/></Link>
      <nav aria-label="Main" className={open ? 'navigation is-open' : 'navigation'}>
        <Link onClick={() => setOpen(false)} href={`/${locale}#features`}>{t('features')}</Link>
        <Link onClick={() => setOpen(false)} href={`/${locale}#workflow`}>{t('workflow')}</Link>
        <Link onClick={() => setOpen(false)} href={`/${locale}/docs`}>{t('docs')}</Link>
        <a href={organization}>GitHub <ArrowUpRight size={13}/></a>
      </nav>
      <div className="header-actions"><label className="language-select"><Globe2 size={16}/><span className="sr-only">{t('language')}</span>
        <select aria-label={t('language')} value={locale} onChange={event => {window.location.assign(`/${event.target.value}${suffix ? `/${suffix}` : ''}${window.location.hash}`);}}>
          {locales.map(value => <option key={value} value={value}>{localeNames[value]}</option>)}
        </select></label>
        <Link className={buttonClass('default', 'header-cta')} href={`/${locale}/download`}>{t('download')}<ArrowUpRight size={15}/></Link>
        <button className="menu-button" aria-label={t('menu')} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div></header>
  </>;
}
export function Footer({locale}: {locale: Locale}) {
  const t = useTranslations('footer');
  return <footer className="footer"><div className="shell footer-main">
    <div><Link href={`/${locale}`}><Brand/></Link><p>{t('tagline')}</p></div>
    <div><h3>{t('product')}</h3><Link href={`/${locale}/download`}>{t('download')}</Link><a href={organization}>{t('github')}<ArrowUpRight size={13}/></a></div>
    <div><h3>{t('resources')}</h3><Link href={`/${locale}/docs`}>{t('docs')}</Link><Link href={`/${locale}/changelog`}>{t('changelog')}</Link><Link href={`/${locale}/privacy`}>{t('privacy')}</Link></div>
  </div><div className="shell footer-bottom"><span>{t('copyright')}</span><span>{t('note')}</span></div></footer>;
}
