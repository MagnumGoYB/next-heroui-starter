import pkg from '~/package.json'

export type SiteConfig = typeof siteConfig

const name = 'Next Hero UI Starter'
const title = `${name} - The Ultimate Next.js Starter Kit`
const slogan = 'Build modern web apps with Next.js and Hero UI'
const description =
  'Build modern web apps with Next.js and Hero UI. A comprehensive starter kit featuring authentication, theming, and more.'
const keywords = [
  'Next.js',
  'Hero UI',
  'Starter Kit',
  'Tailwind CSS',
  'React',
  'TypeScript',
  'Web Development',
]
const url = 'https://github.com/MagnumGoYB/next-heroui-starter'
const contactMail = 'sosbs@outlook.com'

export const siteConfig = {
  defaultTheme: 'system',
  name,
  title,
  slogan,
  keywords,
  description,
  url,
  contactMail,
  version: pkg.version,
  og: {},
  staticPaths: [],
}
