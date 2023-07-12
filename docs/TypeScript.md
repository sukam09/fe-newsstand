## Typescript

Typescript는 Javascript 개발자에게 더 나은 개발 경험을 제공해줌으로써 생산성을 높여주는 언어입니다.

저는 Typescript 사용에 익숙해지기 위해 이번 뉴스스탠드 프로젝트에서 사용해보기로 했습니다.

이 프로젝트는 기본적으로 번들러, 라이브러리 등을 사용하지 않고 Vanilla JS로 진행하는 프로젝트입니다. 따라서 Typescript로 코드를 작성하면 이를 자동으로 컴파일하여, Javascript 코드를 브라우저에서 실행할 수 있도록 환경을 구성하였습니다.

### 📥 Typescript 설치

package manager를 통해 Typescript를 설치합니다.

```bash
$ npm install typescript
$ pnpm install typescript
$ yarn install typescript
```

### ⚙️ Typescript 설정 파일 생성

다음 명령어를 실행하여 Typescript 설정 파일인 `tsconfig.json`를 생성합니다.

```bash
$ npx tsc --init
```

이 때, Typescript 설정은 다음과 같습니다.

- **모듈**

  이 프로젝트의 요구사항 중 하나인 ES Module을 사용하여 모듈화를 만족하기 위해 `module` 옵션을 ES6로 설정하였습니다.

- **`async`/`await`**

  데이터 처리 등에 `async`/`await` 문법을 사용하는데, 이는 ES2018 명세에 정식 문법으로 채택되었습니다. 따라서 `target`을 ES2018 이상으로 설정합니다.

  추가로 Typescript의 Helper function이 생성되는 것을 막기 위해서 `noEmitHelpers` 옵션을 `true`로 설정합니다.

- **Compile**

  컴파일 결과물을 저장할 디렉토리를 `outDir` 옵션을 통해 설정합니다.

  컴파일 해야하는 typescript 파일이 저장되는 경로를 `include`에 설정합니다. 저는 `./typescript` 경로에 모든 ts 파일을 생성하였습니다.

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ES6",
    "outDir": "./src",
    "noEmitHelpers": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true
  },
  "include": ["./typescript/**/*"]
}
```

### 🔒 `.gitignore` 설정

Typescript와 관련된 파일을 gitignore를 통해 commit에 포함되지 않도록 설정합니다.

```txt
node_modules
package.json
pnpm-lock.yaml

tsconfig.json
typescript/
```

### 💻 개발 시작

다음 명령어를 입력하면 Typescript를 작성한 후, 저장하면 자동으로 컴파일이 되어 변경사항이 반영됩니다.

```bash
$ npx tsc -w
```

### ⚠️ 유의사항

- 현재 WebPack, Vite 등의 도구를 사용하지 않기 때문에 `import`시에 경로에 확장자를 제거할 경우, 올바르게 import되지 않습니다. 컴파일 이후에도 올바르게 작동하기 위해 `.js`에서 import하도록 코드를 작성합니다.

  ```ts
  import { * } from "./app"     // ❌
  import { * } from "./app.ts"  // ❌
  import { * } from "./app.js"  // ✅
  ```

- ES Module 사용을 위해 [Live Server Extension](!https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 사용을 권장합니다.
