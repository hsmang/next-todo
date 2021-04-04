import Document, { Html, Head, Main, NextScript, DocumentContext, } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document{
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => 
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                });

            const initalProps = await Document.getInitialProps(ctx);
            return {
                ...initalProps,
                styles: (
                    <>
                        {initalProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            sheet.seal();
        }
    }

    render(){
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap&subset=korean"
                        rel="stylesheet"
                    />                    
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;