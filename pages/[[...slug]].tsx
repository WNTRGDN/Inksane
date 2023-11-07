import { useContext } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { IWebsite, IPage } from 'WNTR/interfaces'
import { Header, Main, Footer } from 'WNTR/structures'
import { Loading } from 'WNTR/components'
import { GetServerSideProps } from 'next'
import Context from '../utils/context'

export default function Index({ website, page }: { website: IWebsite, page: IPage }) {

  const context = useContext(Context)

  return (
    <>
      <Head>
        <title>{(page.metaData.title ?? page.name) + ' | ' + website.name}</title>
        <meta name="description" content={page.metaData.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={(page.metaData.title ?? page.name) + ' | ' + website.name} />
        <meta property="og:description" content={page.metaData.description} />
        <meta property="og:url" content={page.url} />
        <meta property="og:image" content={page.metaData.image} />
        <meta name="site_name" property="og:site_name" content={website.name} />
        <meta name="fb:admins" property="fb:admins" content="100000426992446" />
        <meta name="twitter:site" content="Inksane" />
        <meta name="twitter:site:id" content="Inksane" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={page.metaData.title ?? page.name + ' | ' + website.name} />
        <meta name="twitter:description" content={page.metaData.description} />
        <meta name="twitter:image" content={page.metaData.image} />
        <meta name="environment" content={process.env.NEXT_PUBLIC_VERCEL_ENV} />
        {process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' ? <meta name="robots" content="noindex,follow" /> : null }
        <link rel="canonical" href={page.url}></link>
      </Head>
      { context.loading ? <Loading /> : null }
      <Header {...website} />
      <Main {...page} />
      <Footer {...website} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {

  
  let path = "/";
  [params?.slug].map((slug) => path += slug?.toString().replace(",","/") + "/");

  axios.defaults.headers.method = 'get';
  axios.defaults.baseURL = process.env.API_HOST;
  axios.defaults.headers.common['ApiKey'] = process.env.API_KEY;
  axios.defaults.headers.common['Cart'] = req.cookies['inksane'];

  const website = await axios({ url: '/api/website' });
  const page = await axios({
    url: `/api/page/${params?.slug && website.data.routes[path] !== undefined ? website.data.routes[path] : website.data.id}`
  });

  return { props: { website: website.data, page: page.data } }
}