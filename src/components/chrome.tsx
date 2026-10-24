"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Globe2, Menu, X } from "lucide-react";
import { useState } from "react";
import { locales, localeNames, organization, type Locale } from "@/lib/site";
import { buttonClass } from "./ui/button";

export function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="48 80 424 344" fill="none">
          <path fill="#00C99A" d="M64 399 223 112q9-16 27-16h13q18 0 27 16l108 195h-59l-84-152-83 151 28 23 117-87q9-7 16 2t-2 16L166 400q-10 8-23 8H70q-11 0-6-9Z" />
          <path fill="#2874F0" d="m342 323 47 85h62q13 0 7-12l-40-73Z" />
        </svg>
      </span>
      <span>
        AC-Stride<span className="brand-dot">.</span>
      </span>
    </span>
  );
}
export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const suffix = pathname.split("/").slice(2).join("/");
  return (
    <>
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <header className="header">
        <div className="shell header-inner">
          <Link href={`/${locale}`} aria-label="AC-Stride">
            <Brand />
          </Link>
          <nav
            aria-label="Main"
            className={open ? "navigation is-open" : "navigation"}
          >
            <Link onClick={() => setOpen(false)} href={`/${locale}#features`}>
              {t("features")}
            </Link>
            <Link onClick={() => setOpen(false)} href={`/${locale}#workflow`}>
              {t("workflow")}
            </Link>
            <Link onClick={() => setOpen(false)} href={`/${locale}/docs`}>
              {t("docs")}
            </Link>
            <a href={organization}>
              GitHub <ArrowUpRight size={13} />
            </a>
          </nav>
          <div className="header-actions">
            <label className="language-select">
              <Globe2 size={16} />
              <span className="sr-only">{t("language")}</span>
              <select
                aria-label={t("language")}
                value={locale}
                onChange={(event) => {
                  window.location.assign(
                    `/${event.target.value}${suffix ? `/${suffix}` : ""}${window.location.hash}`,
                  );
                }}
              >
                {locales.map((value) => (
                  <option key={value} value={value}>
                    {localeNames[value]}
                  </option>
                ))}
              </select>
            </label>
            <Link
              className={buttonClass("default", "header-cta")}
              href={`/${locale}/download`}
            >
              {t("download")}
              <ArrowUpRight size={15} />
            </Link>
            <button
              className="menu-button"
              aria-label={t("menu")}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations("footer");
  return (
    <footer className="footer">
      <div className="shell footer-main">
        <div>
          <Link href={`/${locale}`}>
            <Brand />
          </Link>
          <p>{t("tagline")}</p>
        </div>
        <div>
          <h3>{t("product")}</h3>
          <Link href={`/${locale}/download`}>{t("download")}</Link>
          <a href={organization}>
            {t("github")}
            <ArrowUpRight size={13} />
          </a>
        </div>
        <div>
          <h3>{t("resources")}</h3>
          <Link href={`/${locale}/docs`}>{t("docs")}</Link>
          <Link href={`/${locale}/changelog`}>{t("changelog")}</Link>
          <Link href={`/${locale}/privacy`}>{t("privacy")}</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>{t("copyright")}</span>
        <span>{t("note")}</span>
      </div>
    </footer>
  );
}
