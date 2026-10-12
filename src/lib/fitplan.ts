export const coachPlan = { monthlyPrice: 399, clientLimit: Infinity, registrationPrice: 0 };
export function pageHead(title: string, description: string) {
  return { meta: [{ title: `${title}｜FitPlan` }, { name: 'description', content: description }, { property: 'og:title', content: `${title}｜FitPlan` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}
