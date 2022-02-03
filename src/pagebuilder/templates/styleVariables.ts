interface StyleVariable {
  name: string,
  path: string | string[],
  default: string
}

export const styleVariables: StyleVariable[]  = [
  {
    name: '--yxt-color-brand-primary',
    path: 'brandColor',
    default: '#2563EB'
  },
  {
    name: '--yxt-base-font-size',
    path: 'baseFontSize',
    default: '16px'
  },
  {
    name: '--yxt-cta-border-radius',
    path: ['ctas', 'borderRadius'],
    default: '8px'
  },
  {
    name: '--yxt-cta-color',
    path: ['ctas', 'color'],
    default: '#2563EB'
  }
];
