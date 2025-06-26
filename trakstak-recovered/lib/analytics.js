export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props: properties });
  }
};

export const trackPageView = (page) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview', { u: page });
  }
};
