import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { browserLocale } from "@/i18n/browser-locale.mjs";
export default async function RootPage() {
  const requestHeaders = await headers();
  redirect(`/${browserLocale(requestHeaders.get("accept-language"))}`);
}
