import defaultSettings from '@/settings'

const title = defaultSettings.title || '智服喵后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
