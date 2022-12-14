import type { messageCallbackType, StompHeaders } from "@stomp/stompjs";
import { Stomp } from "@stomp/stompjs";
import { useEffect } from "react";
import SockJS from "sockjs-client";
import { env } from "~/constants";

/*
 props로 subscribe method의 Params 를 갖고 오고 싶지만, class method는 type safety하게 접근불가
 https://stackoverflow.com/questions/70652329/get-return-type-of-class-method-via-method-name-in-typescript
*/

/*
@Example
  useWebSocket({
    destination: "/asd/asd",
    callback: () => console.log("소켓값도착")
  });

  useWebSocket([
    {
      destination: "/asd/asd",
      callback: () => console.log("소켓값도착")
    },
    {
      destination: "/asd/asd2",
      callback: () => console.log("소켓값도착2")
    }
  ]);


*/
const useWebSocket = (
  subscribes: Util.SingleOrArray<{
    destination: string;
    callback: messageCallbackType;
    headers?: StompHeaders;
  }>
) => {
  useEffect(() => {
    const sock = new SockJS(`${env.TOPPINGS_SERVER_URL}/stomp/subscribe`);
    const client = Stomp.over(sock);

    client.debug = () => {
      return null;
    };

    client.connect({}, () => {
      if (Array.isArray(subscribes))
        subscribes.forEach(({ destination, callback, headers }) =>
          client.subscribe(destination, callback, headers)
        );
      else
        client.subscribe(
          subscribes.destination,
          subscribes.callback,
          subscribes.headers
        );
    });

    return () => client.disconnect();
  }, [subscribes]);
};

export default useWebSocket;
