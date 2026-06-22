/** Klaviyo Client Subscribe API revision — see developers.klaviyo.com Create Client Subscription */
const KLAVIYO_CLIENT_REVISION = "2026-04-15";

export type JoinListResult =
  | { ok: true }
  | { ok: false; message: string };

export async function joinList(
  email: string,
  customSource = "AVA website",
): Promise<JoinListResult> {
  const LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID;
  const PUBLIC_KEY = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY;

  if (!LIST_ID || !PUBLIC_KEY) {
    console.error("[klaviyo] missing VITE_KLAVIYO_LIST_ID or VITE_KLAVIYO_PUBLIC_KEY");
    return { ok: false, message: "Signup is not configured yet. Try again soon." };
  }

  try {
    const response = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${encodeURIComponent(PUBLIC_KEY)}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          revision: KLAVIYO_CLIENT_REVISION,
        },
        body: JSON.stringify({
          data: {
            type: "subscription",
            attributes: {
              custom_source: customSource,
              profile: {
                data: {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: "SUBSCRIBED",
                        },
                      },
                    },
                  },
                },
              },
            },
            relationships: {
              list: {
                data: { type: "list", id: LIST_ID },
              },
            },
          },
        }),
      },
    );

    // Klaviyo returns 202 Accepted on success
    if (!response.ok && response.status !== 202) {
      const text = await response.text().catch(() => "");
      console.error("[klaviyo] subscribe failed:", response.status, text);
      return { ok: false, message: "Something went wrong. Please try again." };
    }

    console.log("[analytics] klaviyo_waitlist_signup", {
      source: customSource,
      listId: LIST_ID,
    });

    return { ok: true };
  } catch (error) {
    console.error("[klaviyo] joinList failed:", error);
    return { ok: false, message: "Network error. Please try again." };
  }
}
