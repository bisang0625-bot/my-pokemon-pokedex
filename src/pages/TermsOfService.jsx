import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function TermsOfService() {
  const { translate } = useLanguage()
  
  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border-4 border-pokemon-blue/10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-pokemon-blue hover:text-pokemon-dark mb-6 font-bold"
        >
          {translate('terms.goBack')}
        </Link>
        
        <h1 className="text-4xl font-black text-pokemon-dark font-display mb-8">
          {translate('terms.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="font-bold text-yellow-800">
              {translate('terms.copyright')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.article1Title')}</h2>
            <p>{translate('terms.article1Desc')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.article2Title')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{translate('terms.article2App')}</li>
              <li>{translate('terms.article2User')}</li>
              <li>{translate('terms.article2Service')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.article3Title')}</h2>
            <p>{translate('terms.article3Desc')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.article4Title')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{translate('terms.article4ListTitle')}</li>
              <li className="ml-4">- {translate('terms.article4List1')}</li>
              <li className="ml-4">- {translate('terms.article4List2')}</li>
              <li className="ml-4">- {translate('terms.article4List3')}</li>
              <li>{translate('terms.article4Change')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.article5Title')}</h2>
            <p>{translate('terms.article5Desc')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.article6Title')}</h2>
            <p>{translate('terms.article6Desc')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{translate('terms.article6List1')}</li>
              <li>{translate('terms.article6List2')}</li>
              <li>{translate('terms.article6List3')}</li>
              <li>{translate('terms.article6List4')}</li>
              <li>{translate('terms.article6List5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.article7Title')}</h2>
            <p>
              {translate('terms.article7Desc').includes('개인정보 처리방침')
                ? <>
                    {translate('terms.article7Desc').split('개인정보 처리방침')[0]}
                    <Link to="/privacy" className="text-pokemon-blue underline">{translate('nav.privacy')}</Link>
                    {translate('terms.article7Desc').split('개인정보 처리방침')[1]}
                  </>
                : translate('terms.article7Desc').includes('Privacy Policy')
                ? <>
                    {translate('terms.article7Desc').split('Privacy Policy')[0]}
                    <Link to="/privacy" className="text-pokemon-blue underline">{translate('nav.privacy')}</Link>
                    {translate('terms.article7Desc').split('Privacy Policy')[1]}
                  </>
                : translate('terms.article7Desc').includes('Privacybeleid')
                ? <>
                    {translate('terms.article7Desc').split('Privacybeleid')[0]}
                    <Link to="/privacy" className="text-pokemon-blue underline">{translate('nav.privacy')}</Link>
                    {translate('terms.article7Desc').split('Privacybeleid')[1]}
                  </>
                : translate('terms.article7Desc')
              }
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.article8Title')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{translate('terms.article8List1')}</li>
              <li>{translate('terms.article8List2')}</li>
              <li>{translate('terms.article8List3')}</li>
              <li>{translate('terms.article8List4')}</li>
              <li>{translate('terms.article8List5')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.article9Title')}</h2>
            <p>{translate('terms.article9Desc')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('terms.supplementTitle')}</h2>
            <p>{translate('terms.supplementDesc')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

