import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="spn">
      <Head />
      <title>Interactive Note</title>
      <body className='dark:bg-veryDarkGrey'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
