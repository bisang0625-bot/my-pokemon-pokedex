import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 border-4 border-pokemon-blue/10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-pokemon-blue hover:text-pokemon-dark mb-6 font-bold"
        >
          ← 돌아가기
        </Link>
        
        <h1 className="text-4xl font-black text-pokemon-dark font-display mb-8">
          개인정보 처리방침
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">1. 개인정보의 처리 목적</h2>
            <p>
              포켓 카드 헌터: 몬스터 키우기는 다음과 같은 목적으로 개인정보를 처리합니다:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>카드 스캔 및 분석 기능 제공</li>
              <li>도감 데이터 저장 및 관리</li>
              <li>앱 기능 개선 및 사용자 경험 향상</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">2. 수집하는 개인정보의 항목</h2>
            <p>본 앱은 다음과 같은 정보를 수집합니다:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>카메라 권한:</strong> 포켓몬 카드 스캔을 위해 필요합니다</li>
              <li><strong>저장된 데이터:</strong> 스캔한 카드 이미지 및 분석 결과는 기기 내 로컬 스토리지에만 저장됩니다</li>
              <li><strong>API 키:</strong> 부모 모드에서 설정한 Gemini API 키는 기기 내에만 저장됩니다</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              ⚠️ 중요: 모든 데이터는 사용자의 기기 내부에만 저장되며, 외부 서버로 전송되지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">3. 개인정보의 처리 및 보유기간</h2>
            <p>
              사용자가 직접 삭제할 때까지 모든 데이터는 기기 내 로컬 스토리지에 보관됩니다.
              부모 모드에서 "데이터 초기화" 기능을 통해 언제든지 모든 데이터를 삭제할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">4. 개인정보의 제3자 제공</h2>
            <p>
              본 앱은 사용자의 개인정보를 제3자에게 제공하지 않습니다. 
              다만, 카드 분석 기능을 위해 Google의 Gemini API를 사용하며, 이 과정에서 이미지 데이터가 Google 서버로 전송될 수 있습니다.
              Google의 개인정보 처리방침은 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-pokemon-blue underline">여기</a>에서 확인하실 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">5. 개인정보처리 위탁</h2>
            <p>
              본 앱은 카드 분석 기능 제공을 위해 Google Gemini API 서비스를 위탁 처리하고 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">6. 정보주체의 권리·의무 및 그 행사방법</h2>
            <p>
              사용자는 언제든지 다음의 권리를 행사할 수 있습니다:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>개인정보 열람 요구</li>
              <li>개인정보 삭제 요구 (부모 모드의 "데이터 초기화" 기능 사용)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">7. 개인정보의 안전성 확보 조치</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>모든 데이터는 기기 내부에만 저장됩니다</li>
              <li>외부 서버로의 데이터 전송을 최소화합니다</li>
              <li>카드 이미지 분석 시에만 임시로 Google API로 전송되며, 결과만 저장됩니다</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">8. 개인정보 처리방침 변경</h2>
            <p>
              이 개인정보 처리방침은 2024년 1월 1일부터 시행됩니다.
              법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 
              앱 내 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">문의처</h2>
            <p>
              개인정보 처리방침에 관한 문의사항이 있으시면 앱 리뷰를 통해 문의해 주시기 바랍니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

