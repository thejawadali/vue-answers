export function reloadBrowser(redirectURL?: string) {
  window.location.href = redirectURL || window.location.href
}
