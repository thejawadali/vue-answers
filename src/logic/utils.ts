export function reloadBrowser(redirectURL?: string) {
  window.location.href = redirectURL || window.location.href
}

export function getFirstLetterOfName(name: string){
  return name.charAt(0).toUpperCase()
}