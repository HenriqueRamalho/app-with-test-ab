import react from 'react';
import Head from 'next/head'

/* 
https://support.google.com/optimize/answer/9059383
*/

const EXPERIMENT_ID = process.env.NODE_ENV === 'production' ? 'cP6RXp4FQw-MPFk4uwSK5A' : 'hihZQwxFTXCtANQyhJ79YQ'; 

export default function Home() {
  const [variant, setVariant] = react.useState('não definida');
  const [experimentIsReady, setExperimentIsReady] = react.useState(false);
  const [buttonStyle, setButtonStyle] = react.useState('button--blue');

  
  react.useEffect(() => {

      dataLayer.push({'event': 'optimize.activate.my.first.experiment'});

      function implementExperimentA(value) {
        console.log("Run the implementExperimentA");
        console.log("value", value);
        console.log(value);
        setExperimentIsReady(true);
        setVariant(value);
        
        if (value ==  '0') {
          // original version
          setButtonStyle('button--blue')
        } else if (value == '1') {
          // variant 1 version
          setButtonStyle('button--yellow')
        }
      }  

      window.gtag('event', 'optimize.callback', {
        name: EXPERIMENT_ID,
        callback: implementExperimentA
      });    

  }, [])

  const _handleClick = (e) => {
    e.preventDefault();
    console.log('converter objetivo');
    dataLayer.push({
      'event': 'interaction',
      'event_category': 'appTest',
      'event_action': 'actionTestGOal',
      'event_label': 'labelTestgoal'
    });
  }  

  return (
    <div className="container">

      <Head>
        <title>POC Test A/B - {JSON.stringify(process.env.NODE_ENV)}</title>
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

      <main>
        <h1 className="title">
          POC with  <a href="#">A/B test</a>
        </h1>

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
            <a className={`button ${buttonStyle}`} onClick={_handleClick}>Variante: {variant}</a>
          </div>
          <div className="card">
            <h3>Wait test callback</h3>
            {experimentIsReady && (
              <a className={`button ${buttonStyle}`} onClick={_handleClick}>Variante: {variant}</a>
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
  )
}
