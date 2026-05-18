export function buildApiEndpoint(resource) {
  const viteEnv = typeof import.meta !== 'undefined' ? import.meta.env : {};
  const processEnv = typeof process !== 'undefined' ? process.env : {};

  const codespaceName =
    viteEnv.REACT_APP_CODESPACE_NAME ||
    viteEnv.VITE_REACT_APP_CODESPACE_NAME ||
    processEnv.REACT_APP_CODESPACE_NAME ||
    processEnv.VITE_REACT_APP_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/${resource}/`;
  }

  // Fallback for local/dev preview when env var is not set.
  const match = window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/);
  if (match?.[1]) {
    return `https://${match[1]}-8000.app.github.dev/api/${resource}/`;
  }

  return `https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/${resource}/`;
}

export function normalizeApiData(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  return [];
}
