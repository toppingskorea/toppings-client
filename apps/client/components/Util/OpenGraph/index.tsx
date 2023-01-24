import Head from "next/head";

interface Props {
  title: string;
  description?: string;
  imageUrl?: string;
}

/**
 * @name OpenGraph
 * @description
 * 현재 페이지에 [OpenGraph](https://nowonbun.tistory.com/517) (공유 시 타이틀, 설명, 이미지) 를 적용할 수 있도록 하는 컴포넌트입니다.
 * @example
 * <OpenGraph
 *    title="toppings"
 *    description="make your own toppings"
 *    imageUrl="https://your_image_url.png"
 * />
 */
const OpenGraph = ({
  title,
  description = "Make your own topping",
  imageUrl
}: Props) => {
  const computedTitle = `TOPPINGS | ${title}`;

  return (
    <Head>
      <title>{computedTitle}</title>
      <meta property="og:title" content={computedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={computedTitle} />

      {imageUrl !== undefined && (
        <meta property="og:image" content={imageUrl} />
      )}

      {/* 트위터 공유 */}
      {imageUrl && (
        <>
          <meta name="twitter:image" content={imageUrl} />
          <meta name="twitter:card" content="summary_large_image" />
        </>
      )}
    </Head>
  );
};

export default OpenGraph;
