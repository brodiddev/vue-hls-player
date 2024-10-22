/**
 * .vue 모듈에 대한 타입을 정의하는 파일을 생성해주면 해결
 * src 아래 shims-vue.d.ts 파일명으로 생성한다.
 * shims-vue.d.ts 파일은 Vue.js와 TypeScript를 함께 사용할 때 타입 정의 파일을 선언하기 위한 관례적인 이름이다.
 * shims는 특정한 환경에서 다른 환경과의 호환성을 제공하기 위해 사용되는 코드 조각을 의미한다.
 */
/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
