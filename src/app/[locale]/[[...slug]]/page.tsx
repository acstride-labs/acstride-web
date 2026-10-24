import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Home,
  DownloadPage,
  DocsPage,
  ChangelogPage,
  PrivacyPage,
} from "@/components/pages";
import { getMessages } from "@/lib/messages";
import { isLocale, locales, pages, siteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return pages.map((page) => ({ slug: page ? [page] : [] }));
}
type Props = { params: Promise<{ locale: string; slug?: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  const path = slug.join("/");
  if (!(pages as readonly string[]).includes(path)) notFound();
  const m = getMessages(locale);
  const title = path
    ? m[path as "download" | "docs" | "changelog" | "privacy"].title.replace(
        /\n/g,
        " ",
      )
    : m.meta.title;
  return {
    title: path ? title : { absolute: title },
    alternates: {
      canonical: `${siteUrl}/${locale}${path ? `/${path}` : ""}`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${siteUrl}/${l}${path ? `/${path}` : ""}`]),
        ["x-default", `${siteUrl}/en${path ? `/${path}` : ""}`],
      ]),
    },
  };
}
export default async function Page({ params }: Props) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  switch (slug.join("/")) {
    case "":
      return <Home locale={locale} />;
    case "download":
      return <DownloadPage locale={locale} />;
    case "docs":
      return <DocsPage locale={locale} />;
    case "changelog":
      return <ChangelogPage locale={locale} />;
    case "privacy":
      return <PrivacyPage locale={locale} />;
    default:
      notFound();
  }
}
