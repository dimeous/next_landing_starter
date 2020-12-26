import React from 'react';
import App from 'next/app';
import Head from 'next/head';

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>A brand new next.js landing website</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <link rel="shortcut icon" href="static/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" />
          <title>My new cool app</title>
        </Head>
        <Component {...pageProps /* eslint-disable-line react/jsx-props-no-spreading */} />
      </>
    );
  }
}

export default MyApp;
