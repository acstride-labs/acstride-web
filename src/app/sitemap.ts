import type {MetadataRoute} from 'next';
import {locales,pages,siteUrl} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap {return locales.flatMap(locale=>pages.map(page=>({url:`${siteUrl}/${locale}${page?`/${page}`:''}`,changeFrequency:'monthly' as const,priority:page?0.6:1,alternates:{languages:Object.fromEntries(locales.map(l=>[l,`${siteUrl}/${l}${page?`/${page}`:''}`]))}})));}
