export type JoinListResult =
  | { ok: true }
  | { ok: false; message: string };

export async function joinList(email: string): Promise<JoinListResult> {
  const LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID;
  const PUBLIC_KEY = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY;

  if (!LIST_ID || !PUBLIC_KEY) {
    console.error("[klaviyo] missing VITE_KLAVIYO_LIST_ID or VITE_KLAVIYO_PUBLIC_KEY");
    return { ok: false, message: "Signup is not configured yet. Try again soon." };
  }

  try {
    const response = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${PUBLIC_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          revision: "2024-07-15",
        },
        body: JSON.stringify({
          data: {
            type: "subscription",
            attributes: {
              profile: {
                data: {
                  type: "profile",
                  attributes: { email },
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

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("[klaviyo] subscribe failed:", response.status, text);
      return { ok: false, message: "Something went wrong. Please try again." };
    }

    return { ok: true };
  } catch (error) {
    console.error("[klaviyo] joinList failed:", error);
    return { ok: false, message: "Network error. Please try again." };
  }
}
