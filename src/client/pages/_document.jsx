// ./pages/_document.js
import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { gaTrackingId },
} = getConfig();

export default class CustomDocument extends Document {
  setGoogleTags = () => {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaTrackingId}');
      `,
    };
  };

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
          />
          <script
            dangerouslySetInnerHTML={this.setGoogleTags() /* eslint-disable-line react/no-danger */}
          />
        </body>
      </Html>
     );
  }
}
