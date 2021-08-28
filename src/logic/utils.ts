import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(duration)
dayjs.extend(relativeTime)

export function reloadBrowser(redirectURL?: string) {
  window.location.href = redirectURL || window.location.href
}

export function getFirstLetterOfName(name: string) {
  return name.charAt(0).toUpperCase()
}

export function timeDifference(posted: Date) {
  return dayjs.duration(dayjs(posted).diff(dayjs())).humanize(true)
}