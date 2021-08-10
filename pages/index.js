import react, { useState } from 'react';
import Head from 'next/head'

/* 
https://support.google.com/optimize/answer/9059383
*/

const EXPERIMENT_ID = process.env.NODE_ENV === 'production' ? '' : '5BAVdldVQ7a9VfRFdZ1s5Q'; 

export default function Home() {
  const [variant, setVariant] = useState('não definida');
  const [experimentIsReady, setExperimentIsReady] = useState(false);
  const [headerColor, setHeaderColor] = useState(0);
  const [imageColor, setImageColor] = useState(0);
  
  react.useEffect(() => {

      function implementExperimentA(combination, experimentId, containerId) {
        const [headerVariantion, sectionImageVariation] = combination.split('-');
        console.log('headerVariantion: ', headerVariantion);
        console.log('sectionImageVariation: ', sectionImageVariation);
        console.log('variant: ', combination);

        console.log("----------- run callback ------------");
        console.log(`http://optimize.google.com/experiences/${experimentId}?` + `containerId=${containerId}&combination=${combination}`);
        
        setVariant(combination);
        setHeaderColor(headerVariantion);
        setImageColor(sectionImageVariation);             
        setExperimentIsReady(true);        
      }  

      window.gtag('event', 'optimize.callback', {
        name: EXPERIMENT_ID,
        callback: implementExperimentA
      });    

  }, [])

  const _handleClickConversion = (e) => {
    e.preventDefault();
    console.log('converter objetivo');
    dataLayer.push({
      'event': 'interaction',
      'event_category': 'convertion:multivariable'
    });
  }  

  return (
<>
    <Head>
    <title>POC Test Multivariable - {JSON.stringify(process.env.NODE_ENV)}</title>
    <link rel="icon" href="/favicon.ico" />

    <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=UA-191147710-1"
  />
  <script src="https://www.googleoptimize.com/optimize.js?id=OPT-MSKC8LF"></script>
  <script
      dangerouslySetInnerHTML={{
        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-191147710-1');
          `,
      }}
    />       
  </Head>

    <div className="container">
    <header className={`header ${headerColor === '1' ? 'header--dark' : ''}`}>
      <h1 className="title">
        Header - POC with <a href="#">A/B test</a>
      </h1>
    </header>
 
      <main>
        <section className="hero">
          <div className="hero_text">
            <h2>It's could be orange or blue</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla viverra ex, ut tincidunt sem faucibus in at ullamcorper mauris.</p>
          </div>          
          <div className={`block-image ${imageColor === '1' ? 'block-image--orange' : ''}`}></div>
        </section>  

        <section className="version-examples">
          <table className="version-examples__table">
            <thead>
              <tr>
                <th>Header</th>
                <th>Imagem</th>
              </tr>
            </thead>
            <tbody>
              <tr className={variant === '0-0' ? 'version-examples__active-row' : '' }>
                <td>background branco (original)</td>
                <td>imagem azul (original)</td>
              </tr> 
              <tr className={variant === '0-1' ? 'version-examples__active-row' : '' }>
                <td>background branco (original)</td>
                <td>imagem laranja (variante 1)</td>
              </tr>  
              <tr className={variant === '1-0' ? 'version-examples__active-row' : '' }>
                <td>background preto (variante 1)</td>
                <td>imagem azul (original)</td>
              </tr>      
              <tr className={variant === '1-1' ? 'version-examples__active-row' : '' }>
                <td>background preto (variante 1)</td>
                <td>imagem laranja (variante 1)</td>
              </tr>                                                   
            </tbody>
          </table>
        </section>      

        <p className="description">
          Journey<code>team</code>
        </p>

        <div className="grid">
          <a href="#" className="card">
            <h3>Environment &rarr;</h3>
            <p>{JSON.stringify(process.env.NODE_ENV)}</p>
          </a>

          <a href="#" className="card">
            <h3>Variant</h3>
            <p>{variant}</p>
          </a>

          <div className="card">
            <h3>Without wait</h3>
            <a className='button' onClick={_handleClickConversion}>Variante: {variant}</a>
          </div>
          <div className="card">
            <h3>Wait test callback</h3>
            {experimentIsReady && (
              <a className='button' onClick={_handleClickConversion}>Variante: {variant}</a>
            )}
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .version-examples {
          padding: 64px 0;
        }
        .version-examples__table {
          width: 600px;
        }
        .version-examples__active-row {
          background: #4794EC !important;
          color: white;
        }
        .header {
          display: block;
          width: 100%;
          padding: 64px 32px;
        }
        .header--dark {
          color: white;
          background: black;
        }
        .hero {
          display: flex;
          max-width: 1150px;
          padding-bottom: 32px;
        }
        .hero_text {
          padding: 16px;
        }
        .block-image {
          width: 600px;
          height: 250px;
          background: #0070f3;
        }      
        .block-image--orange {
          background: #F0610C;
        }  
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        .button {
          background-color: #C6C6C6;
          padding: 10px 15px;
          border-radius: 4px;          
        }

        .button--blue {
          background-color: #0300F5;  
          color: #fff;       
        }

        .button--yellow {
          background-color: #EBC617;
          color: #000000;
        }

        table {
          border-collapse: collapse;
          width: 100%;
        }

        th, td {
          text-align: left;
          padding: 16px;
          text-align: center;
        }

        tr:nth-child(even){background-color: #f2f2f2}

        th {
          background-color: #B5B5B5;
          color: black;
          text-align: center;
        }        

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </>
  )
}
