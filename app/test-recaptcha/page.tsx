"use client"

export default function TestRecaptchaPage() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="space-y-6 bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">reCAPTCHA v3 Configuration Test</h1>
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            Updated to v3
          </span>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50">
            <h2 className="font-semibold text-lg mb-2">✅ Version Updated</h2>
            <p className="text-sm text-gray-700">
              Your site now uses <strong>reCAPTCHA v3</strong> (invisible, score-based verification).
              No checkbox will be shown to users - verification happens automatically in the background.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h2 className="font-semibold text-lg mb-2">Environment Variables Status</h2>

            <div className="space-y-2 text-sm font-mono">
              <div className="flex items-center gap-2">
                <span className={siteKey ? "text-green-600" : "text-red-600"}>
                  {siteKey ? "✓" : "✗"}
                </span>
                <span className="font-semibold">NEXT_PUBLIC_RECAPTCHA_SITE_KEY:</span>
                <span className="text-gray-600">
                  {siteKey ? `${siteKey.substring(0, 20)}...` : "NOT SET"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={webhookUrl ? "text-green-600" : "text-red-600"}>
                  {webhookUrl ? "✓" : "✗"}
                </span>
                <span className="font-semibold">NEXT_PUBLIC_N8N_WEBHOOK_URL:</span>
                <span className="text-gray-600">
                  {webhookUrl ? "SET" : "NOT SET"}
                </span>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h2 className="font-semibold text-lg mb-2">Current Domain</h2>
            <p className="text-sm font-mono text-gray-600">
              {typeof window !== 'undefined' ? window.location.hostname : 'Loading...'}
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h2 className="font-semibold text-lg mb-2">How v3 Works</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Invisible</strong> - No checkbox shown to users</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Automatic</strong> - Verification happens on form submit</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span><strong>Score-based</strong> - Returns score from 0.0 (bot) to 1.0 (human)</span>
              </li>
            </ul>
          </div>

          {siteKey ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Configuration Looks Good!</h3>
              <p className="text-sm text-green-700 mb-3">
                Your reCAPTCHA v3 is properly configured. Test it on the consultation page:
              </p>
              <a
                href="/consulting"
                className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Test Form →
              </a>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">⚠️ Configuration Error</h3>
              <p className="text-sm text-red-700">
                The reCAPTCHA site key is not configured. Add <code className="bg-red-100 px-1 py-0.5 rounded">NEXT_PUBLIC_RECAPTCHA_SITE_KEY</code> to your Vercel environment variables and redeploy.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
