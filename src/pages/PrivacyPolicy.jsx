import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function PrivacyPolicy() {
  const { translate } = useLanguage()
  
  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border-4 border-pokemon-blue/10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-pokemon-blue hover:text-pokemon-dark mb-6 font-bold"
        >
          {translate('privacy.goBack')}
        </Link>
        
        <h1 className="text-4xl font-black text-pokemon-dark font-display mb-8">
          {translate('privacy.title')}
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('privacy.section1Title')}</h2>
            <p>{translate('privacy.section1Desc')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{translate('privacy.section1List1')}</li>
              <li>{translate('privacy.section1List2')}</li>
              <li>{translate('privacy.section1List3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('privacy.section2Title')}</h2>
            <p>{translate('privacy.section2Desc')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{translate('privacy.section2Camera').includes(':') 
                ? <><strong>{translate('privacy.section2Camera').split(':')[0]}:</strong> {translate('privacy.section2Camera').split(':')[1]}</>
                : translate('privacy.section2Camera')
              }</li>
              <li>{translate('privacy.section2Storage').includes(':')
                ? <><strong>{translate('privacy.section2Storage').split(':')[0]}:</strong> {translate('privacy.section2Storage').split(':')[1]}</>
                : translate('privacy.section2Storage')
              }</li>
              <li>{translate('privacy.section2ApiKey').includes(':')
                ? <><strong>{translate('privacy.section2ApiKey').split(':')[0]}:</strong> {translate('privacy.section2ApiKey').split(':')[1]}</>
                : translate('privacy.section2ApiKey')
              }</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              {translate('privacy.section2Important')}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('privacy.section3Title')}</h2>
            <p>{translate('privacy.section3Desc')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('privacy.section4Title')}</h2>
            <p>
              {translate('privacy.section4Desc').includes('here') 
                ? <>
                    {translate('privacy.section4Desc').split('here')[0]}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pokemon-blue underline">here</a>
                    {translate('privacy.section4Desc').split('here')[1]}
                  </>
                : translate('privacy.section4Desc').includes('여기')
                ? <>
                    {translate('privacy.section4Desc').split('여기')[0]}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pokemon-blue underline">여기</a>
                    {translate('privacy.section4Desc').split('여기')[1]}
                  </>
                : translate('privacy.section4Desc').includes('hier')
                ? <>
                    {translate('privacy.section4Desc').split('hier')[0]}
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pokemon-blue underline">hier</a>
                    {translate('privacy.section4Desc').split('hier')[1]}
                  </>
                : translate('privacy.section4Desc')
              }
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('privacy.section5Title')}</h2>
            <p>{translate('privacy.section5Desc')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('privacy.section6Title')}</h2>
            <p>{translate('privacy.section6Desc')}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>{translate('privacy.section6List1')}</li>
              <li>{translate('privacy.section6List2')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('privacy.section7Title')}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>{translate('privacy.section7List1')}</li>
              <li>{translate('privacy.section7List2')}</li>
              <li>{translate('privacy.section7List3')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('privacy.section8Title')}</h2>
            <p>{translate('privacy.section8Desc')}</p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">{translate('privacy.contactTitle')}</h2>
            <p>{translate('privacy.contactDesc')}</p>
          </section>
        </div>
      </div>
    </div>
  )
}

