# ELXOR email templates

`elxor-newsletter.html` is the luxury brand email (black + gold hero, cream cards, Cinzel / Inter / Pinyon Script like the site). `elxor-newsletter.txt` is its plain-text twin; send both as a multipart message so spam filters and text-only clients are happy.

## Files

| File | Purpose |
| --- | --- |
| `elxor-newsletter.html` | 600px table layout, inline CSS, dark-mode and Outlook fallbacks, ~30 KB (Gmail clips at 102 KB) |
| `elxor-newsletter.txt` | Plain-text version |
| `elxor-form-reply.html` | Auto-reply sent to the customer after they submit the contact form (preview at `/reply`) |
| `elxor-form-notification.html` | Internal notification sent to `info@elxorperfumes.com` with the enquiry details (preview at `/notification`) |
| `build-assets.cjs` | Regenerates the email images in `public/email/` from the site artwork (`node emails/build-assets.cjs`) |
| `preview.cjs` | Local preview with sample merge values (`node emails/preview.cjs`, then open http://localhost:4455) |

Images are served from `https://www.elxorperfumes.com/email/...`, so **deploy `public/email/` before sending**. Email clients cannot load local files.

## Merge tags

| Tag | Replace with |
| --- | --- |
| `{{first_name}}` | Recipient's first name (use a fallback such as "there" when missing) |
| `{{unsubscribe_url}}` | Your unsubscribe link (required for marketing mail) |
| `{{view_in_browser_url}}` | Hosted copy of the email |

The two form templates use `{{name}}`, `{{email}}`, `{{phone}}`, `{{phone_digits}}` (digits only, for the WhatsApp link), `{{message}}`, `{{message_preview}}` (first ~90 characters) and `{{submitted_at}}`. **HTML-escape every submitted value before inserting it** (`<`, `>`, `&`, quotes), otherwise a visitor can inject markup into your inbox.

If your sender uses another syntax (`*|FNAME|*`, `%%first_name%%`, `{$name}`), find and replace these three tags.

## Sending

- **Newsletters / campaigns:** import the HTML into Brevo, Mailchimp, MailerLite, Klaviyo, etc. Google SMTP is not suited to bulk mail (see below).
- **Transactional / contact auto-reply:** render the HTML in code, replace the tags, and send it through Nodemailer with Google SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`, `MAIL_TO`).

## Google SMTP limits

- Personal Gmail: about 500 recipients per day; Google Workspace: about 2,000 per day.
- Use a Google **App Password** (needs 2-Step Verification), never the account password.
- The From address must be the authenticated account or a verified "Send mail as" alias (`info@elxorperfumes.com`).
- Add SPF, DKIM and DMARC for `elxorperfumes.com` to stay out of spam.

## Testing checklist

Send test copies to Gmail (web + app), Apple Mail / iPhone, Outlook (desktop and web) and check dark mode. Litmus or Email on Acid cover the rest.
