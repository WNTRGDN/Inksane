export const GA_TRACKING_ID = 'G-ZHT9M2JNLK'

export const pageview = (url: URL) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url
    })
  }
}

type GTagEvent = {
  action: string,
  category: string,
  label: string,
  value: number
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value
  })
}