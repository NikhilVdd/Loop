// The single source of truth for proposed monthly plans and feature availability.
export const pricingConfig = {
  currency: 'USD', cadence: 'monthly', stage: 'Proposed launch pricing', maxSeats: 1000,
  plans: [
    {id:'starter',name:'Starter',price:0,audience:'A little space for your own work.',description:'Get a feel for a calmer, more connected day.',cta:'Explore the demo',icon:'sun',features:['workspace','tasks','docs']},
    {id:'team',name:'Team',price:12,audience:'For teams finding their rhythm.',description:'Bring the conversation, the plan, and the next step together.',cta:'Join the Team waitlist',icon:'chat',recommended:'Recommended for small teams',features:['workspace','tasks','docs','chat','calendar','meetings','ai']},
    {id:'business',name:'Business',price:24,audience:'For growing teams that need clarity.',description:'The connected workspace, with more room for oversight.',cta:'Join the Business waitlist',icon:'projects',features:['workspace','tasks','docs','chat','calendar','meetings','ai','permissions','admin']},
    {id:'enterprise',name:'Enterprise',price:null,audience:'For a company-wide conversation.',description:'A plan shaped around your organization’s needs.',cta:'Register Enterprise interest',icon:'layers',features:['workspace','tasks','docs','chat','calendar','meetings','ai','permissions','admin','governance','support']}
  ],
  features: [
    {id:'workspace',name:'Personal workspace',availability:'demo',detail:'Explore Home with a fictional team and local browser storage.'},
    {id:'tasks',name:'Tasks & project organization',availability:'demo',detail:'Working local boards, lists, owners, and due dates.'},
    {id:'docs',name:'Notes & documents',availability:'demo',detail:'Working local editing, favorites, comments, and search.'},
    {id:'chat',name:'Connected conversations',availability:'demo',detail:'Local messages and threads that can become tasks. No live collaboration.'},
    {id:'calendar',name:'Calendar & scheduling',availability:'demo',detail:'Local events and editable scheduling suggestions. No external calendar connection.'},
    {id:'meetings',name:'Meeting preparation & follow-through',availability:'sample',detail:'Prepared summaries and a simulated meeting room; no live calls.'},
    {id:'ai',name:'Contextual AI coordination',availability:'sample',detail:'Six deterministic sample scenarios; no live model.'},
    {id:'permissions',name:'Advanced permissions',availability:'planned',detail:'Planned production capability. Not implemented in the prototype.'},
    {id:'admin',name:'Organization administration',availability:'planned',detail:'Planned production capability. No administration service is connected.'},
    {id:'governance',name:'Deployment & governance options',availability:'planned',detail:'Planned; requirements and availability would be discussed before launch.'},
    {id:'support',name:'Dedicated support options',availability:'planned',detail:'Planned; no support service or response-time commitment is currently offered.'}
  ],
  availability: {demo:'Working local demo',sample:'Simulated example',planned:'Planned for production'},
  faqs: [
    ['Can I buy a subscription today?','Not yet. These are proposed monthly launch plans. There is no checkout, payment collection, or active subscription service. You can explore the full prototype and register interest.'],
    ['How would monthly billing work?','Team and Business are proposed per-member, per-month plans in USD. The calculator estimates the base monthly price. Taxes, billing terms, and final prices have not been established.'],
    ['Who counts as a member?','The proposed model counts each paid workspace member as a seat. Guest access and seat-adjustment rules will be defined before launch. The calculator is an estimate, not a quote.'],
    ['Can I cancel?','There is no paid subscription to cancel in this prototype. Cancellation terms will be published before paid plans become available. Joining the waitlist does not create a subscription.'],
    ['What can I try in the demo?','All visitors can explore the same interactive prototype. Plan cards describe proposed future packaging; they do not lock demo features. Work is saved only in your browser.'],
    ['Which features are planned?','Administration, advanced permissions, governance, and dedicated support are planned. AI uses prepared scenarios, calls are simulated, and no third-party account is connected. The comparison labels each feature’s current availability.'],
    ['Where do my waitlist details go?','Until a collection endpoint is configured, the form is explicitly a preview and saves entries only in your browser. With a configured endpoint, success appears only after that service accepts the submission.']
  ]
};
export function estimateMonthly(planId, seats) {
  const plan = pricingConfig.plans.find(p => p.id === planId);
  if (!plan || !Number.isInteger(Number(seats)) || Number(seats) < 1 || Number(seats) > pricingConfig.maxSeats) return {error:`Choose between 1 and ${pricingConfig.maxSeats.toLocaleString()} members.`};
  return {plan:plan.id,seats:Number(seats),total:plan.price === null ? null : plan.price * Number(seats)};
}
export const money = value => new Intl.NumberFormat('en-US',{style:'currency',currency:pricingConfig.currency,maximumFractionDigits:0}).format(value);
