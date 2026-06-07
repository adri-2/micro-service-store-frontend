export function resolveApiBaseUrl(rawBaseUrl) {
  if (!rawBaseUrl) {
    return "http://localhost";
  }

  return rawBaseUrl.replace("api.localhost", "localhost");
}
