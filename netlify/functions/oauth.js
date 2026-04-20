exports.handler = async (event) => {
  const { code } = event.queryStringParameters || {};

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing code parameter" }),
    };
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  console.log('CLIENT_ID set:', !!clientId, '| CLIENT_SECRET set:', !!clientSecret);
  
  if (!clientId || !clientSecret) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "OAuth not configured on server" }),
    };
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: data.error_description || data.error }),
      };
    }

    // Return HTML that posts the token back to the opener window
    const html = `<!DOCTYPE html>
<html>
<head><title>Signing you in…</title></head>
<body>
<script>
  const token = ${JSON.stringify(data.access_token)};
  if (window.opener) {
    window.opener.postMessage({ type: 'oauth_token', token }, window.location.origin);
    window.close();
  } else {
    // Fallback: store in sessionStorage and redirect
    sessionStorage.setItem('gh_oauth_token', token);
    window.location.href = '/';
  }
<\/script>
<p style="font-family:sans-serif;padding:2rem;color:#666">Signing you in, please wait…</p>
</body>
</html>`;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Token exchange failed: " + err.message }),
    };
  }
};
