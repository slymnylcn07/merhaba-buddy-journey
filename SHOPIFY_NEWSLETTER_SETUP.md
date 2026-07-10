# FlexiKnee Newsletter API — Shopify Setup

The site now saves newsletter and quiz email requests to **Shopify Customers**, records the non-diagnostic quiz category, and adds a trigger tag so Shopify Flow can send the matching seven-day routine.

## 1. Give the app customer permissions

Open **FlexiKnee Newsletter API** and enable these Admin API scopes:

- `read_customers`
- `write_customers`

Install or update the app after changing scopes.

## 2. Choose the correct Vercel credential method

### Option A — the existing app was created inside Shopify Admin

Use the Admin API access token generated when the app was installed:

```text
SHOPIFY_STORE_DOMAIN=your-permanent-store.myshopify.com
SHOPIFY_ADMIN_TOKEN=your-admin-api-access-token
SHOPIFY_ADMIN_API_VERSION=2026-07
```

This is the most likely setup for an older app named **FlexiKnee Newsletter API**.

### Option B — the app was created in Shopify Dev Dashboard for a store you own

Use client credentials instead:

```text
SHOPIFY_STORE_DOMAIN=your-permanent-store.myshopify.com
SHOPIFY_CLIENT_ID=your-app-client-id
SHOPIFY_CLIENT_SECRET=your-app-client-secret
SHOPIFY_ADMIN_API_VERSION=2026-07
```

The server exchanges these credentials for a short-lived access token and refreshes it automatically. Never put the Admin token or client secret in a `VITE_` variable or frontend file.

## 3. Customer data written by the site

A normal homepage signup receives tags such as:

```text
newsletter
website-signup
flexiknee
flexiknee-newsletter-api
signup-source-homepage-newsletter
```

A quiz request also receives dynamic tags such as:

```text
signup-source-article-quiz
knee-quiz
quiz-result-active-foot-to-knee-support
quiz-product-insoles
quiz-plan-requested
```

The exact `quiz-result-*` and `quiz-product-*` tags change with the result. A small JSON metafield is stored at:

```text
namespace: flexiknee
key: knee_quiz_profile
```

It contains only the recommendation category, product category, source article, source form, and completion date. It does **not** store the user's symptom answers.

## 4. Shopify Flow workflow for the seven-day email

Create a workflow in Shopify Flow:

1. **Trigger:** `Customer tags added`
2. **Condition:** the tags added contain `quiz-plan-requested`
3. Add branches based on the customer's current tags:
   - `quiz-product-insoles`
   - `quiz-product-compression-sleeve`
   - `quiz-product-calf-massager`
   - `quiz-product-heated-wrap`
   - `quiz-product-smart-knee-massager`
   - fallback / education-first result
4. In each branch, start the matching Shopify Messaging / Shopify Email marketing automation.
5. Keep the email educational, include an unsubscribe link, and use the matched product as a secondary recommendation.

The API removes and re-adds `quiz-plan-requested` on a new submission so a customer can intentionally request an updated plan later. Do not add that same tag again inside the Flow workflow, because that would retrigger the workflow.

## 5. Suggested result-to-email mapping

| Quiz product tag | Email routine focus |
|---|---|
| `quiz-product-insoles` | Footwear check, gradual insole adaptation, walking-load diary |
| `quiz-product-compression-sleeve` | Daily movement, fit checks, short mobility breaks |
| `quiz-product-calf-massager` | Lower-leg recovery, calf mobility, travel/standing routine |
| `quiz-product-heated-wrap` | Gentle warmth, safe timing, non-swollen stiffness routine |
| `quiz-product-smart-knee-massager` | Evening recovery, heat/red-light/vibration controls |
| No product match | Education-first plan and relevant FlexiKnee guides |

## 6. Test checklist

1. Submit the homepage newsletter form with a new email.
2. Confirm the customer appears in Shopify Customers as subscribed to email marketing.
3. Complete the quiz and request the plan with a second test email.
4. Confirm `quiz-plan-requested`, one `quiz-result-*`, and one `quiz-product-*` tag are present.
5. Confirm the Flow run appears in Shopify Flow activity.
6. Confirm the matching email arrives and the unsubscribe link works.
7. Repeat with the same email and a different quiz result; verify the old dynamic quiz tags are replaced.
