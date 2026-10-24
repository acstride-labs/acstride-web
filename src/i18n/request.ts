import { getRequestConfig } from "next-intl/server";
import { isLocale } from "@/lib/site";
import { getMessages } from "@/lib/messages";
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && isLocale(requested) ? requested : "en";
  return { locale, messages: getMessages(locale), timeZone: "UTC" };
});
