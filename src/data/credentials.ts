export type Credential = {
  title: string
  subject: string
  code: string
  url: string
  image?: string
}

export const credentialDates = { issued: 'September 11, 2025', expires: 'September 11, 2027' }
export const credentials: Credential[] = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    subject: 'AI Foundations',
    code: '01',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge_m?id=2F6CD022EC194DF2671A79B032DF098BE4C528B12F84C83EA899FD02CCA13EC3',
  },
  {
    title: 'Oracle Data Platform 2025 Certified Foundations Associate',
    subject: 'Data Platform',
    code: '02',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge_m?id=DDD1B0D4FD054D4C8A5BF199AAE869A9878934F648A327ABCDBA14443EF8D428',
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
    subject: 'Cloud Infrastructure',
    code: '03',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge_m?id=02D159506433EF2F9F0E59059E6BC7B11356271D161938B5E86FA79F25D83E97',
  },
]
