import { marketplaceUrl, releaseUrl, releaseDownloads, checksumsUrl } from "@/lib/release";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  CheckCheck,
  Download,
  Languages,Send,Trophy,Database,
  FolderOpen,
  Layers3,
  Monitor,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import { getMessages } from "@/lib/messages";
import { extensionRepo, type Locale } from "@/lib/site";
import { EditorPreview } from "./editor-preview";
import { buttonClass } from "./ui/button";

export function Home({ locale }: { locale: Locale }) {
  const m = getMessages(locale);
  const icons = [FolderOpen, Braces, CheckCheck, Zap,Languages,Send,Trophy,Database];
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="tiny-dot" />
            {m.hero.badge}
          </div>
          <h1>
            {m.hero.line1}
            <br />
            <span>{m.hero.line2}</span>
          </h1>
          <p>{m.hero.description}</p>
          <div className="hero-actions">
            <Link className={buttonClass()} href={`/${locale}/download`}>
              {m.hero.primary}
              <ArrowUpRight size={17} />
            </Link>
            <a className="text-link" href="#workflow">
              {m.hero.secondary}
              <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-note">
            <span className="preview-dot" />
            {m.hero.note}
          </div>
        </div>
        <div className="hero-side-note" aria-hidden="true">
          <span>READ.</span>
          <span>CODE.</span>
          <span>TEST.</span>
          <strong>AC.</strong>
          <div className="orbit-mark">↗</div>
        </div>
        <EditorPreview />
        <div className="hero-scroll">
          <span>{m.hero.scroll}</span>
          <ArrowDown size={14} />
        </div>
      </section>
      <div className="capability-strip">
        <div className="shell">
          <strong>{m.strip.one}</strong>
          <span>
            <Braces size={17} />
            {m.strip.two}
          </span>
          <span>
            <Layers3 size={17} />
            {m.strip.three}
          </span>
          <span>
            <ShieldCheck size={17} />
            {m.strip.four}
          </span>
        </div>
      </div>
      <section className="section shell" id="features">
        <div className="section-heading">
          <div>
            <div className="eyebrow">{m.features.eyebrow}</div>
            <h2>{m.features.title}</h2>
          </div>
          <p>{m.features.description}</p>
        </div>
        <div className="feature-grid">
          {m.features.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <article key={item.title}>
                <span className="feature-number">0{i + 1}</span>
                <Icon className="feature-icon" size={28} strokeWidth={1.5} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="workflow-section" id="workflow">
        <div className="shell workflow-grid">
          <div className="workflow-intro">
            <div className="eyebrow">{m.workflow.eyebrow}</div>
            <h2>{m.workflow.title}</h2>
            <Link className="text-link" href={`/${locale}/docs`}>
              {m.workflow.cta}
              <ArrowUpRight size={16} />
            </Link>
            <div className="workflow-art" aria-hidden="true">
              <span>01</span>
              <div />
              <span>02</span>
              <div />
              <span className="green-circle">
                <Check size={20} />
              </span>
            </div>
          </div>
          <div className="steps">
            {m.workflow.steps.map((step, i) => (
              <article key={step.title}>
                <span className="step-index">0{i + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
            <p className="workflow-notice">
              <ShieldCheck size={17} />
              {m.workflow.notice}
            </p>
          </div>
        </div>
      </section>
      <section className="section shell principles">
        <div className="principles-main">
          <div className="eyebrow">{m.principles.eyebrow}</div>
          <h2>{m.principles.title}</h2>
          <p>{m.principles.description}</p>
          <div className="editor-tags">
            <span>VS Code</span>
            <span>{m.principles.languageSupport}</span>
            <span>Codeforces</span>
          </div>
        </div>
        <div className="principles-details">
          <article>
            <ShieldCheck size={24} />
            <h3>{m.principles.local}</h3>
            <p>{m.principles.localBody}</p>
          </article>
          <article>
            <Terminal size={24} />
            <h3>{m.principles.honest}</h3>
            <p>{m.principles.honestBody}</p>
          </article>
        </div>
      </section>
      <section className="section shell faq">
        <h2>{m.faq.title}</h2>
        <div>
          {m.faq.items.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="shell">
        <div className="final-cta">
          <div className="eyebrow">{m.cta.eyebrow}</div>
          <h2>{m.cta.title}</h2>
          <p>{m.cta.body}</p>
          <Link className={buttonClass("light")} href={`/${locale}/download`}>
            {m.cta.button}
            <ArrowUpRight size={17} />
          </Link>
          <div className="cta-glyph" aria-hidden="true">
            ↗
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="page-hero">
      <div className="eyebrow">
        <span className="tiny-dot" />
        {eyebrow}
      </div>
      <h1>{title}</h1>
      <p>{intro}</p>
    </div>
  );
}
export function DownloadPage({ locale }: { locale: Locale }) {
  const t = getMessages(locale).download;
  return (
    <div className="shell inner-page">
      <PageHero {...t} />
      <div className="download-layout">
        <section className="install-card">
          <div className="status-badge">{t.status}</div>
          <div className="download-icon">
            <Download size={33} />
          </div>
          <h2>
            Codeforces Workbench <span>for VS Code</span>
          </h2>
          <a className={buttonClass()} href={marketplaceUrl}>
            {t.marketplace}
            <ArrowUpRight size={16} />
          </a>
          <p><a href={releaseUrl}>{t.release}</a> · <a href={checksumsUrl}>{t.checksums}</a> · <a href={extensionRepo}>{t.source}</a></p>
          <p className="fine-print">{t.sourceNote}</p>
          <hr />
          <h3>{t.requirements}</h3>
          <p>{t.requirementsBody}</p>
        </section>
        <section className="installation">
          <h2>{t.install}</h2>
          <ol>
            {t.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Link className="text-link" href={`/${locale}/docs`}>
            {t.guide}
            <ArrowRight size={16} />
          </Link>
          <div className="platforms">
            <h3>{t.platforms}</h3>
            {t.platformNames.map((name, index) => (
              <div key={name}>
                <Monitor size={17} />
                <a href={releaseDownloads[index]}>{name} · VSIX</a>
              </div>
            ))}
            <p className="fine-print">{t.platformNote}</p>
          </div>
        </section>
      </div>
      <aside className="notice">
        <ShieldCheck size={19} />
        {t.warning}
      </aside>
    </div>
  );
}
export function DocsPage({ locale }: { locale: Locale }) {
  const t = getMessages(locale).docs;
  return (
    <div className="shell inner-page">
      <PageHero {...t} />
      <div className="docs-layout">
        <aside className="doc-nav">
          {t.sections.map((s, i) => (
            <a key={s.title} href={`#step-${i}`}>
              {s.title}
            </a>
          ))}
          <a href={`${extensionRepo}#readme`}>
            {t.reference}
            <ArrowUpRight size={13} />
          </a>
        </aside>
        <div className="doc-content">
          {t.sections.map((s, i) => (
            <section id={`step-${i}`} key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <aside className="doc-trouble">
            <h3>{t.trouble}</h3>
            <p>{t.troubleBody}</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
export function ChangelogPage({ locale }: { locale: Locale }) {
  const t = getMessages(locale).changelog;
  return (
    <div className="shell inner-page">
      <PageHero {...t} />
      <article className="release-card">
        <aside>
          <span className="release-version">v{t.version}</span>
          <time dateTime="2026-10-24">{t.date}</time>
        </aside>
        <div>
          <ul>
            {t.items.map((item) => (
              <li key={item}>
                <Check size={17} />
                {item}
              </li>
            ))}
          </ul>
          <a
            className="text-link"
            href={`${extensionRepo}/blob/master/CHANGELOG.md`}
          >
            {t.link}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </article>
    </div>
  );
}
export function PrivacyPage({ locale }: { locale: Locale }) {
  const t = getMessages(locale).privacy;
  return (
    <div className="shell inner-page">
      <PageHero {...t} />
      <div className="legal-content">
        {t.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        <a className="text-link" href={`${extensionRepo}/issues`}>
          {t.contact}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </div>
  );
}
