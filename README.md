# <img src='asset/pengtrue.png' width=40px > 아파트의 진실을 알고 싶다면 [아파트루]

![main](asset/main.PNG)
## Index
#### &emsp; [➤ 프로젝트 소개](##-프로젝트-소개)<br>
#### &emsp; [➤ 개발 환경](##-개발-환경)<br>
#### &emsp; [➤ 기능 소개](##-기능-소개)<br>
#### &emsp; [➤ 산출물](##-산출물)<br>
#### &emsp; [➤ 팀 소개](##-팀-소개)<br>

## 프로젝트 소개
**AI를 활용한 아파트 CCTV 관리 서비스입니다.**
- 시간과 비용은 줄이고 신뢰성은 높인 AI 비식별화
- 위험 부담은 줄이고 위급 상황 대응은 빨라진 화재 감지
- 귀찮음은 줄이고 확인은 편리한 불법 주차 감지

### 프로젝트 기간
**2024.10.14 ~ 2024.11.19 (총 6주)**

## 개발 환경
- BE: SpringBoot 3.3.3, Java 17
- FE: React, SCSS, Three.js, Zustand, TanStack Query
- AI: Python 3.9, Uvicorn 0.30.6, FastAPI 0.114, TensorFlow 2.17
- DB: MySQL 8.0.39, MongoDB 7.0.12
- Infra: Ubuntu 20.04, Docker, Portainer, caddy-docker-proxy

## 기능 소개
### 홈
- **홈 화면**: **디지털 트윈 캐릭터**와 상호작용하며 퀘스트, 캘린더, 이번 주 운동 그래프, 크루 메뉴로 이동할 수 있습니다.
- **캘린더**: 매일 **출석**을 기록할 수 있고, 캘린더를 통해 운동기록을 볼 수 있습니다.
- **퀘스트**: **오늘의 퀘스트**와 **월간 퀘스트**를 통해 동기부여를 일으키며 운동할 수 있습니다.

|홈 화면|캘린더|퀘스트|
|:---:|:---:|:---:|
|![Home](assets/screenshot/home_1.jpg)|![Calendar](assets/screenshot/home_2.jpg)|![Quest](assets/screenshot/home_3.jpg)|

### 크루 화면
- **크루 메인 페이지**: 크루와 관련된 모든 기능을 할 수 있습니다.
- **크루 생성**: 크루장이 되어 크루를 직접 **생성**할 수 있습니다.
- **크루 추천**: **하이브리드 추천 시스템**(CBF+CF)으로 사용자에게 9개의 크루를 추천합니다.

|크루 메인|크루 생성|크루 추천|
|:---:|:---:|:---:|
|![crew_1](assets/screenshot/crew_1.jpg)|![crew_2](assets/screenshot/crew_2.jpg)|![crew_3](assets/screenshot/crew_3.jpg)|

### 크루 배틀

- **크루 배틀**: 같은 운동 종목의 크루에게 배틀을 신청하거나 동의하여 **크루 간 배틀**을 진행할 수 있습니다. 크루 퀘스트 및 크루 활동, 운동 시간을 활용해 **점수**를 부여합니다.
- **크루 랭킹**: **운동 종목**에 따른 **실시간 크루 랭킹**을 확인할 수 있습니다.

|크루 배틀|크루 랭킹|크루 랭킹|
|:---:|:---:|:---:|
|![battle_1](assets/screenshot/battle_1.jpg)|![battle_2](assets/screenshot/battle_2.jpg)|![battle_3](assets/screenshot/battle_3.jpg)|

### 프로필
- 프로필에서 자신이 입력한 체형을 바탕으로 **본인만의 캐릭터**를 볼 수 있습니다.
- 상대방의 프로필에서 상대 방의 **캐릭터**와 **체형 기록 추이**, **운동시간**을 볼 수 있습니다.
- 아이템을 구매하고, 장착하며 캐릭터를 **커스텀**할 수 있습니다.

|마이 프로필|상대 프로필|캐릭터 커스텀|
|:---:|:---:|:---:|
|![profile_1](assets/screenshot/profile_1.jpg)|![profile_2](assets/screenshot/profile_2.jpg)|![profile_3](assets/screenshot/profile_3.jpg)|

### 체형 기록
- **체형 입력**: 2주 단위 체형 입력에 대한 **알림**이 가며 체형 입력을 통해 본인의 체형을 **갱신**할 수 있습니다.
- **체형 기록**: 입력된 체형을 바탕으로 **월별 체형 기록**을 볼 수 있습니다.
- **체형 기록 상세**: 그래프를 클릭하여 **월별 체형 기록 수치**를 **가시적**으로 볼 수 있습니다.

|체형 입력|체형 기록|체형 기록 상세|
|:---:|:---:|:---:|
|![body_1](assets/screenshot/body_1.jpg)|![body_2](assets/screenshot/body_2.jpg)|![body_3](assets/screenshot/body_3.jpg)|

### 체형 예측
- **체형 예측**: 이번 주 운동 기록을 바탕으로 해당 **운동 강도를 유지했을 때** 1, 3개월 후의 체형 예측 값을 볼 수 있습니다.
- **체형 추가 예측**: **특정 운동을 추가로 더 했을 때** 1, 3개월 후의 체형 예측 값을 볼 수 있습니다.

|체형 예측|체형 추가 예측|체형 추가 예측|
|:---:|:---:|:---:|
|![predict_1](assets/screenshot/predict_1.jpg)|![predict_2](assets/screenshot/predict_2.jpg)|![predict_3](assets/screenshot/predict_3.jpg)|

### 운동
- 시작, 종료 버튼을 통해 운동을 **시작**하고 **마칠** 수 있습니다.
- 운동을 선택하여 운동을 한 뒤 해당 운동 기록을 통해 **소모된 칼로리**를 볼 수 있습니다.
- 운동을 시작하면 **캐릭터가 같이 움직이며** 운동하고있는 듯한 **애니메이션**을 볼 수 있습니다.

|운동 기록|운동 선택|운동 중|
|:---:|:---:|:---:|
|![exercise_1](assets/screenshot/exercise_1.jpg)|![exercise_2](assets/screenshot/exercise_2.jpg)|![exercise_3](assets/screenshot/exercise_3.jpg)|

### 기타
- **스냅샷**: 스냅샷을 통해 현재의 캐릭터를 기록할 수 있고, 과거의 스냅샷과 비교하며 캐릭터를 통해 **체형의 변화**를 느낄 수 있습니다.
- **운동 추천**: 사용자가 선호하고, 자주하는 운동을 바탕으로 운동을 **추천**받을 수 있습니다.
- **알림**: 알림을 통해 퀘스트, 배틀, 체형 입력 등의 알림을 받을 수 있습니다.

|스냅샷|운동 추천|알림|
|:---:|:---:|:---:|
|![etc_1](assets/screenshot/etc_1.jpg)|![etc_2](assets/screenshot/etc_2.jpg)|![etc_3](assets/screenshot/etc_3.jpg)|

## 산출물
### **[Notion](https://www.notion.so/C106-df98233bbeb44e91a5bf566d7960783b)**

### ERD
![ERD](assets/erd.png)

### Architecture 구조도
![Architecture](assets/architecture.png)

## 팀 소개
<table>
<thead>
<tr>
<th style="text-align: center;"><strong>박지응</strong></th>
<th style="text-align: center;"><strong>송준혁</strong></th>
<th style="text-align: center;"><strong>박민철</strong></th>
<th style="text-align: center;"><strong>김민영</strong></th>
<th style="text-align: center;"><strong>인호현</strong></th>
<th style="text-align: center;"><strong>김민주</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><a href="https://github.com/JiEung2"><img src="https://avatars.githubusercontent.com/u/127590064?v=4" height="150" width="150" style="max-width: 100%;"> <br> @JiEung2</a></td>
<td align="center"><a href="https://github.com/TheNoFace"><img src="https://avatars.githubusercontent.com/u/3072090?v=4" height="150" width="150" style="max-width: 100%;"> <br> @TheNoFace</a></td>
<td align="center"><a href="https://github.com/daringpark"><img src="https://avatars.githubusercontent.com/u/108521994?v=4" height="150" width="150" style="max-width: 100%;"> <br> @daringpark</a></td>
<td align="center"><a href="https://github.com/minyeong981"><img src="https://avatars.githubusercontent.com/u/156265474?v=4" height="150" width="150" style="max-width: 100%;"> <br> @minyeong981</a></td>
<td align="center"><a href="https://github.com/inhohyun"><img src="https://avatars.githubusercontent.com/u/96523102?v=4" height="150" width="150" style="max-width: 100%;"> <br> @inhohyun</a></td>
<td align="center"><a href="https://github.com/MINJOO-KIM"><img src="https://avatars.githubusercontent.com/u/64532143?v=4" height="150" width="150" style="max-width: 100%;"> <br> @MINJOO-KIM</a></td>
</tr>
<tr>
<td align="center"><b>팀장 | BE</td>
<td align="center"><b>INFRA | BE</td>
<td align="center"><b>DATA | AI</td>
<td align="center"><b>FE | 3D</td>
<td align="center"><b>FE | QA</td>
<td align="center"><b>FE | DESIGN</td>
</tr>
</tbody>
</table>

# 여행과 모임 통장을 한방에! - 모여방


<p align="center">
  <img src="/img/splashPage.PNG" alt="splashPage.png">
</p>

<br>

## 프로젝트 정보


### 모여방 / MOYEOBANG
모여방(MOYEOBANG)은 여행 전부터 후까지 재정 관리를 간편하게 해결해주는 올인원 모임통장 서비스입니다.

<br>

### 개발 기간: 2024년 8월 19일 ~ 2024년 10월 11일

<br>

## 배포 주소


서비스에 접근하려면 [여기](https://j11c102.p.ssafy.io/)를 클릭하세요

<br>
<br>

## 팀 소개


### 백엔드

|                            김두열                             |                             김훈민                             |                              박진우                              |                                                                                                               
|:----------------------------------------------------------:|:-----------------------------------------------------------:|:-------------------------------------------------------------:| 
| <img width="160px" src="https://github.com/enduf7686.png" /> | <img width="160px" src="https://github.com/gnsals0904.png" /> | <img width="160px" src="https://github.com/jjinwo0.png" /> |
|           [@enduf7686](https://github.com/enduf7686)           |          [@gnsals0904](https://github.com/gnsals0904)           |         [@jjinwo0](https://github.com/jjinwo0)          |

### 프론트엔드

|                             강두홍👑                             |                              유지연                               |                              전가현                              |                                                                                                               
|:-------------------------------------------------------------:|:--------------------------------------------------------------:|:-------------------------------------------------------------:| 
| <img width="160px" src="https://github.com/dhkang0912.png" /> | <img width="160px" src="https://github.com/jiyeoniing.png" /> | <img width="160px" src="https://github.com/gahyoenj.png" /> |
|         [@dhkang0912](https://github.com/dhkang0912)          |         [@jiyeoniing](https://github.com/jiyeoniing)         |         [@gahyoenj](https://github.com/gahyoenj)          |

<br>
<br>

## 프로젝트 설명


모여방은 여행 중 재정 관리의 불편함을 해결하기 위해 개발된 서비스입니다. 사용자는 여행 전 비용을 쉽게 예측하고, 여행 중 간편하게 결제 및 정산을 할 수 있습니다. 여행 후에는 결제 내역과 통계를 제공하여, 여행의 모든 재정 관리를 한 곳에서 해결할 수 있습니다.
<br>

## 기능 설명
- 모임 통장과 여행을 한 번에 해결할 수 있도록 사용자가 구글 맵 기반으로 여행 계획을 세울 수 있게 합니다.
- 여행 중 남은 돈은 사용자에게 자동으로 환불되며, 여행 계획 수립 시 예산 예측 기능을 제공합니다.

## 기술 스택


### 프론트 엔드

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"><br/>
<img src="https://img.shields.io/badge/emotion-CC6699?style=for-the-badge&logo=emotion&logoColor=white"><img src="https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white"><img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"><br/>

<br>

### 백엔드

<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"><br/>
<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"><br/>
<img src="https://img.shields.io/badge/Spring Data Jpa-6DB33F?style=for-the-badge&logo=Spring Data Jpa&logoColor=white"><br/>
<img src="https://img.shields.io/badge/Elastic Search-005571?style=for-the-badge&logo=ElasticSearch&logoColor=white"><img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"><br/>


<br>

## 사용 Version
### Backend
- Java : Oracle Open JDK 17
- Spring Boot : 3.3.3
- JPA : Hibernate-core-6.5.2
- DB : MySQL, H2, ElasticSearch

### Frontend
- React : 18.3.1
- TypeScript : 5.5.3
- Axios : 1.7.7
- Emotion : 11.13.3
- Tanstack Router : 1.56.1
- React Query : 5.55.0


### 협업 관리 툴

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"><img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white"><br/>

<br>

### 기타

<img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white"><img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white"><img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"><img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

## 화면 구성


### 로그인 진입

<p align="center">
  <img src="img/login/login.jpg" alt="onBoarding" width="30%">
  <img src="img/login/myProfile.png" alt="myProfile" width="30%">
</p>

<br>

### 여행 생성 페이지

<p align="center">
  <img src="img/travel/makeTravel00.png" alt="makeTravelPage1" width="30%">
  <img src="img/travel/makeTravel01.png" alt="makeTravelPage2" width="30%">
  <img src="img/travel/makeTravel02.png" alt="makeTravelPage3" width="30%">
</p>
<p align="center">
  <img src="img/travel/makeTravel03.png" alt="makeTravelPage4" width="30%">
  <img src="img/travel/makeTravel04.png" alt="makeTravelPage5" width="30%">
  <img src="img/travel/makeTravel05.png" alt="makeTravelPage6" width="30%">
</p>
<p align="center">
  <img src="img/travel/makeTravel06.png" alt="makeTravelPage7" width="30%">
  <img src="img/travel/makeTravel07.png" alt="makeTravelPage8" width="30%">
  <img src="img/travel/makeTravel08.jpg" alt="makeTravelPage9" width="30%">
</p>
<p align="center">
  <img src="img/travel/makeTravel09.png" alt="makeTravelPage7" width="30%">
  <img src="img/travel/makeTravel10.png" alt="makeTravelPage8" width="30%">
</p>

<br/>

### 호텔, 항공, POS 데모

<p align="center">
  <img src="img/posHotelAirportPage/airport.png" alt="airport" width="30%">
  <img src="img/posHotelAirportPage/hotel.png" alt="hotel" width="30%">
</p>
<p align="center">
  <img src="img/posHotelAirportPage/pos.PNG" alt="pos" width="30%">
</p>

<br>

### 여행 계좌

<p align="center">
  <img src="img/travelAccount/TravelAccount01.jpg" alt="travelAccount01" width="30%">
<img src="img/travelAccount/TravelAccount02.png" alt="travelAccount02" width="30%">
<img src="img/travelAccount/TravelAccount03.png" alt="travelAccount03" width="30%">
<img src="img/travelAccount/TravelAccount04.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount05.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount06.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount07.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount08.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount09.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount10.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount11.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount12.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount13.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount14.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount15.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount16.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount17.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount18.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount19.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount20.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount21.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount22.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount23.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount24.png" alt="travelAccount04" width="30%">
<img src="img/travelAccount/TravelAccount25.png" alt="travelAccount04" width="30%">
</p>

<br>

### 여행 보고서
<p align="center">
<img src="img/travelReport/travelReport01.png" alt="travelReport01" width="30%">
<img src="img/travelReport/travelReport02.png" alt="travelReport02" width="30%">
<img src="img/travelReport/travelReport03.png" alt="travelReport03" width="30%">

</p>

<br>

### 여행 기록 페이지
<p align="center">
<img src="img/scheduleHistory/scheduleHistory01.png" alt="scheduleHistory01" width="30%">
<img src="img/scheduleHistory/scheduleHistory02.png" alt="scheduleHistory02" width="30%">
<img src="img/scheduleHistory/scheduleHistory03.png" alt="scheduleHistory03" width="30%">
<img src="img/scheduleHistory/scheduleHistory04.png" alt="scheduleHistory04" width="30%">
<img src="img/scheduleHistory/scheduleHistory05.jpg" alt="scheduleHistory05" width="30%">
<img src="img/scheduleHistory/scheduleHistory06.jpg" alt="scheduleHistory06" width="30%">
<img src="img/scheduleHistory/scheduleHistory07.jpg" alt="scheduleHistory07" width="30%">
<img src="img/scheduleHistory/scheduleHistory08.jpg" alt="scheduleHistory08" width="30%">
<img src="img/scheduleHistory/scheduleHistory09.jpg" alt="scheduleHistory09" width="30%">
</p>

<br>


### 주요 기능 (추가 예정)

---

### 아키텍쳐

<img src="img/architecture.jpeg" alt="image">

<br>
<br>

### ERD

<img src="img/erdDiagram.png" alt="image">






