/*
이런 함수를 이용하면 switch, if-else 문의 모든 상황을 보장할 수 있다.
이를 기본 케이스(default case)로 이용하면 남아있는 
것은 never 타입이어야 하기 때문에 모든 상황에 대처하는 것을 보장할 수 있다.
*/
const neverChecker = (value: never) => {
  throw new Error(`you don't handle all condition ${value}`);
};

export default neverChecker;
