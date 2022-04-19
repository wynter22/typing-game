## 목차

1. [요구 사항](#요구-사항)
2. [문제 해결](#문제-해결)
3. [개발 환경](#개발-환경)

## 요구 사항

- 주어진 단어가 표시되면 input에 단어를 정해진 시간 내에 입력하여 점수를 획득하는 어플리케이션 개발한다.

## 문제 해결

### 해결 전략

1. Webpack 설정
   - production build시 public에 파일이 생성될 수 있도록한다.
   - IE11 및 주요 브라우저에서 실행될 수 있도록 한다.
2. 화면
   - index.html body 내부에 게임 및 결과 화면이 삽입될 수 있도록한다.
3. 라우터
   - url이 변경 될때마다 화면을 렌더링할 수 있도록한다.
     - route 정보
       - "/" : 게임 화면
       - "/result" : 게임 결과 화면
   - 정의되지 않은 url로 접근할 때는 게임화면(route="/")으로 이동한다.
   - 다른 url로 이동이 가능하도록 push 함수를 구현한다.
   - 전역에서 라우터 기능을 사용할 수 있도록 window.$router에 설정한다.
4. 게임
   - Game
     - 게임을 시작할 수 있도록 '시작' 버튼에 click 이벤트를 추가한다.
     - 단어 입력이 가능하도록 input에 'keypress'이벤트를 추가한다.
     - 단어 배열을 서버에서 전달 받는다.
     - Manager를 구현하여 게임에 필요한 설정들을 관리한다.
     - Manager를 통해서 단어를 순차적으로 가져온다.
     - 단어마다 타이머를 실행할 수 있도록, setInterval를 활용한 setTimer를 구현한다.
     - 게임 종료 시 window.$router를 통해서 게임 결과 화면로 이동한다.
   - Game Manager
     - 단어 배열, 게임 결과를 관리한다.
     - 단어 배열.values()를 통해서 단어 iterator를 설정한다.
     - 단어 interator.next()를 통해서 단어를 순차적으로 반환한다.
5. 게임 결과
   - Result
     - 게임결과를 window.location.search를 통해 전달 받는다.
       1. score : 게임 점수
       2. time : 평균 답변 시간
     - window.location.search가 존재하지 않거나 정상적이지 않는 경우
       1. window.$router를 게임 화면으로 이동한다.

#### 1) 화면 구현

1. index.html은 다음과 같은 body를 가진다.
   ```html
   <body>
     <main id="app">...</main>
   </body>
   ```
2. 화면 클래스는 아래와 같은 기본 구조로 작성한다.
   ```javascript
   class '화면 이름' {
      render(el){
         // 화면 렌더링
         el.innerHTML = this.template();
         this.setEvent();
      }

      template(){
         // 화면 html 작성
         return `<div> ... </div>`;
      }

      setEvent(){
         // 이벤트 설정
      }
   }
   ```

#### 2) 라우터 구현

1. 라우터는 index.html에서 작성된 #app하위에 화면을 렌더링하도록한다.
2. 라우터는 render와 push 함수를 가진다.
   - render : 브라우저 url변경 시 화면을 렌더링한다.
   - push : 다른 url로 이동하고, 해당 화면을 렌더링한다.
3. window.$router를 등록하여 전역에서 사용할 수 있도록한다.
   ```javascript
   // index.js
   window.$router = new Router(app);
   ```
4. 최초 렌더링을 위해서 render함수를 호출한다.
   ```javascript
   // index.js
   window.$router.render();
   ```

#### 3) 게임 구현

##### # 게임 실행

1. '시작' 버튼을 클릭하면 게임이 시작된다.
2. 게임 시작되면 단어 리스트를 호출한다.
3. 단어 리스트가 존재하면 gameManager를 생성한다.
   ```javascript
   this.gameManager = new GameManager();
   ```
4. 게임에 필요한 필수 값을 설정한다.

   ```javascript
   // 게임 필수 값.
   //   gameWords = ${단어 배열};
   //   wordIterator = gameWords.values();
   //   currentWord = null;
   //   gameResult = [];

   this.gameManager.load(${단어 배열});
   ```

5. runGame을 호출하여 게임을 진행한다.

   ```javascript
   this.runGame();
   ```

   - runGame 함수

   ```javascript
    // gameManager에 셋팅된 단어 배열에서 순차적으로 단어를 가져와 currnetWord에 담는다.
    const currentWord = this.gameManager.nextWord();

    // currnetWord의 조건에 따라 게임을 진행/종료한다.
    if (currentWord.done) {
         // 게임 종료
         ...
         return;
    }
    // 게임 진행

    // 1. 게임 단어 표시
    this.setWordText(currentWord.value.text);

    // 2. 타이머 설정
    this.setTimer(currentWord.value.second);
   ```

##### # 게임 진행

1. 게임 진행 시 currentWord의 단어를 화면에 표시하고, 타이머를 실행시킨다.

   ```javascript
   // 단어 Text를 화면에 표시
   this.setWordText(currentWord.value.text);

   // 타이머 실행
   this.setTimer(currentWord.value.second);
   ```

2. input에 단어를 입력 후 엔터를 치면 화면에 표시된 단어와 맞는지 확인한다.

   - 입력 단어 === 화면 단어
     - 답변 입력 시간을 마킹한다.
     - input value 초기화
     - runGame 함수를 호출하여 다음 단어로 게임을 진행한다.

   ```javascript
   if (inputText.value === wordText.innerText) {
     // 답변 입력 시간을 마킹
     this.gameManager.markAnswerTime(this.gameTime);

     // input value 초기화
     inputText.value = null;

     // 다음 단어로 게임 진행
     this.runGame();
   } else {
     inputText.value = null;
   }
   ```

3. 타이머가 끝난경우에는 점수를 감점시키고 다음 단어로 게임을 진행한다.

   ```javascript
   // 게임 점수 감점
   this.gameScore--;
   this.setScore(this.gameScore);

   // input value 초기화
   this.clearInput();

   //다음 단어로 게임 진행
   this.runGame();
   ```

##### # 게임 종료

1. 게임 종료시 평균 답변 시간과 점수를 담아 결과 화면을 호출한다.
   ```javascript
   const avgAnswerTime = this.gameManager.averageAnswerTime();
   const searchQuery = '?score=' + this.gameScore + '&time=' + avgAnswerTime;
   window.$router.push('/result' + searchQuery);
   ```

## 개발 환경

### Run in Development

```
$ yarn install

$ yarn start
```

### Build Production

```
$ yarn install

$ yarn build
```

### Folder Structure

```sh
typing-game
│
├── src
│   │
│   ├── assets
│   │     └── css
│   │         ├── app
│   │         ├── app.css
│   │         └── style.css
│   ├── js
│   │     └── gameManager.js
│   │
│   ├── page
│   │     ├── game.js
│   │     └── result.js
│   │
│   ├── router
│   │     ├── router.js
│   │     └── routes.js
│   │
│   ├── index.html
│   └── index.js
│
├── ...
├── package.json
├── REDADME.md
└── webpack.config.js
```
