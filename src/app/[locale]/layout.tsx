import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {getMessages} from '@/lib/messages';
import {isLocale, locales, siteUrl} from '@/lib/site';
import {Header, Footer} from '@/components/chrome';
import '../globals.css';

export function generateStaticParams() {return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const m=getMessages(locale);
  return {metadataBase:new URL(siteUrl),title:{default:m.meta.title,template:'%s | ACStride'},description:m.meta.description,icons:{icon:'/icon.svg'},openGraph:{title:m.meta.title,description:m.meta.description,type:'website',siteName:'ACStride',images:[{url:'/og.png',width:1200,height:630}]},twitter:{card:'summary_large_image',title:m.meta.title,description:m.meta.description}};
}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return <html lang={locale}><body><NextIntlClientProvider locale={locale} messages={getMessages(locale)} timeZone="UTC"><Header locale={locale}/><main id="main">{children}</main><Footer locale={locale}/></NextIntlClientProvider></body></html>;
}
