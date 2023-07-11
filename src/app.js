import Header from './Header.js';
import RecentNewsRollingView from './RecentNewsRollingView.js';
import NewsPressGridview from './NewsPressGridview.js';

export default function App({ $app }) {
  new Header({ $target: $app });

  new RecentNewsRollingView({
    $target: $app,
    initialState: {
      headlineData: [
        `정부, '처리수' 표현에 "문제없어", '핵폐수'엔 "불안감 내용 부적절"`,
        `IAEA 최종보고서 반발…전국 곳곳서 후쿠시마 오염수 방류 규탄`,
        `일본 원전 오염수 방류도 안했는데…찬바람 부는 횟집·양식어가`,
        `'오염수 저지' 野의원단 방일 출국…"국제공조 통해 방류 저지"`,
        `與 "민주 'IAEA 총장면담·日방문', 부끄럽고 한심…국격 추락"`,
        `尹대통령, 리투아니아로 출국…나토회의서 북핵 공조 모색`,
        `검찰, 국회 2차 압수수색…송영길 보좌진 동선 추적`,
        `검찰, 박영수 측근 불러 보강수사…구속영장 재청구 '무게'`,
        `조국 아들 "연세대 대학원에 석사 학위 반납"`,
        `민주, 양평고속道 의혹에 "게이트·국정농단"…국조·특검도 거론`,
      ],
    },
  });

  new NewsPressGridview({
    $target: $app,
    initialState: {
      page: 1,
      newsPressData: [],
    },
  });
}
