# kwang-bungae-FE 컨벤션규칙

* Fix - 버그 수정
* Feature - 새로운 기능 추가
* Update - 일반적인 업데이트
* 버전 업데이트
* Chore - 다른 유형에 속하지 않는 것.
* 최종 파일에 해당 변경 사항을 포함하지 않고 싶을 때 선택
* Refactor- 코드/구조 리팩토링. 파일 이름 변경
* Docs - 문서 업데이트

*항상 영어 소문자만을 사용. 카멜 케이스 등은 사용하지 않는다.

*일반적으로 한 요소는 하이픈으로 연결. ex) (input-text, button-submit, modal-alert.. )

*네이밍의 조합은 형태-의미-순서-상태 순으로 사용. ex) (button-submit-03-disable)

*언더스코어는 파일, 폴더, 이미지 등에만 사용. ex) (image_elysia_asset_01.png)

*숫자를 사용할 때는 확장성을 고려해 1, 2 이런 식으로 표현하지 않고 01, 02, 03… 혹은 001, 002, 003처럼 사용. 

# 2주차 구조 설계

1. 최신뉴스 롤링 생성
Recentnews{
		//newsList를 불러온다
		//최신 뉴스 영역에 5초마다 롤링하는 함수를 구현하고 그 내부에 1초 간격을 두고 오른쪽에서 롤링하는 함수를 호출
	}
	
	Rolling{
		//롤링하는 알고리즘 구현
	}
	
2. list_article.json 데이터 생성
	list_article.json={
        
    }

3. 리스트 그리드 생성
	Listpage{
		//category 배경에 프로그래스 바 설정
		//메인화면에 카테고리와 페이지 번호에 맞는 기사를 띄움
		//왼쪽 화살표 버튼 기능 함수 호출
		//오른쪽 화살표 버튼 기능 함수 호출
		//20초마다 화면이 변하는 animation 함수 호출
	}

	makeCategory{
		//Element 생성
		//mainGrid Children으로 삽입
		//category 데이터를 불러와서 반복문으로 할당
	}

	click_leftArrow{
		//click시 page 번호 1 감소
		//카테고리의 첫번째 페이지면 카테고리 변화 후 이전 카테고리의 마지막 페이지로 이동
		//시간 초기화
	}
	
	click_rightArrow{
		//click시 page 번호 1 증가
		//카테고리의 마지막 페이지면 카테고리 변화 후 이전 카테고리의 첫번째 페이지로 이동
		//시간 초기화
	}
	
	auto_rolling{
		//20초마다 page 번호 1 증가
		//20초 간격으로 프로그래스 증가
		//마지막 페이지면 다음 카테고리의 첫번째 페이지로 이동
	}

# 3주차 구조설계

1. 컴포넌트 생성
	Newsstand
	SetDate
	RecentNews
	Mainheader
	ArrowButton
	MainCenter
	및 JSON 데이터를 불러와 NewsStore에 동기화

2. 데이터 관리
	NewsStore.js에서 뉴스 정보 관리
	SubscribeStore.js에서 구독한 뉴스 정보 관리

3. 전역 변수 관리
	StateStore.js에서 그리드, 리스트 보기 상태 및 전체 보기, 구독 보기 상태 관리

4. Api 관리
	api 파일에서 json 파일 호출
	App.js 파일에서 동기화 실행 -> 병렬로 동시에 호출할 방법 고민!!

