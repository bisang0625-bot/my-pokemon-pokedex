import { Link } from 'react-router-dom'

export default function TermsOfService() {
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
          이용약관
        </h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="font-bold text-yellow-800">
              ⚠️ 저작권 고지: 본 앱은 몬스터 카드 이미지의 분석을 돕는 도구입니다. 
              포켓몬(Pokémon)은 Nintendo, Creatures Inc., Game Freak Inc.의 저작권 및 상표입니다. 
              본 앱은 공식 포켓몬 앱이 아니며, The Pokémon Company와 무관합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">제1조 (목적)</h2>
            <p>
              본 약관은 포켓 카드 헌터: 몬스터 키우기 앱(이하 "본 앱")의 이용조건 및 절차, 이용자와 개발자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">제2조 (정의)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>"앱"이란 포켓 카드 헌터: 몬스터 키우기 서비스를 의미합니다.</li>
              <li>"이용자"란 본 앱에 접속하여 본 약관에 따라 개발자가 제공하는 서비스를 받는 자를 의미합니다.</li>
              <li>"서비스"란 개발자가 제공하는 몬스터 카드 스캔 및 분석 서비스를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">제3조 (약관의 게시와 개정)</h2>
            <p>
              본 약관은 앱 내에서 게시하며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 
              변경사항의 시행 7일 전부터 앱 내 공지사항을 통하여 고지할 것입니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">제4조 (서비스의 제공 및 변경)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>본 앱은 다음과 같은 서비스를 제공합니다:</li>
              <li className="ml-4">- 몬스터 카드 스캔 및 AI 분석 기능</li>
              <li className="ml-4">- 수집한 카드의 도감 관리 기능</li>
              <li className="ml-4">- 카드 가치 추정 기능 (부모 모드)</li>
              <li>개발자는 필요한 경우 서비스의 내용을 변경할 수 있으며, 변경 시 사전에 공지합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">제5조 (서비스의 중단)</h2>
            <p>
              개발자는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우 
              서비스의 제공을 일시적으로 중단할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">제6조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>타인의 정보 도용</li>
              <li>개발자가 게시한 정보의 변경</li>
              <li>본 앱에 게시된 정보의 변경</li>
              <li>범죄와 결부된다고 객관적으로 인정되는 행위</li>
              <li>기타 관련 법령에 위배되는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">제7조 (개인정보 보호)</h2>
            <p>
              개발자는 이용자의 개인정보 보호를 위하여 노력합니다. 
              자세한 사항은 <Link to="/privacy" className="text-pokemon-blue underline">개인정보 처리방침</Link>을 참고하시기 바랍니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">제8조 (면책 조항)</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>개발자는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
              <li>개발자는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</li>
              <li>개발자는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.</li>
              <li>개발자는 이용자 상호간 또는 이용자와 제3자 간에 서비스를 매개로 하여 발생한 분쟁 등에 대하여 책임을 지지 않습니다.</li>
              <li>카드 분석 결과의 정확성을 보장하지 않으며, 제공되는 정보는 참고용입니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">제9조 (준거법 및 관할법원)</h2>
            <p>
              본 약관은 대한민국 법령에 따라 규율되고 해석되며, 개발자와 이용자 간에 발생한 분쟁에 대해서는 
              대한민국 법원을 관할 법원으로 합니다.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-pokemon-dark mb-4">부칙</h2>
            <p>본 약관은 2024년 1월 1일부터 시행됩니다.</p>
          </section>
        </div>
      </div>
    </div>
  )
}

