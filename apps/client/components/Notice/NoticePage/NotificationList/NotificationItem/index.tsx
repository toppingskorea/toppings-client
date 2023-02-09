import { css, useTheme } from "@emotion/react";
import { whiteAvatar } from "@images/common";
import { RejectPalm } from "@svgs/notice";
import { Flex, margin, padding, Spacing } from "@toss/emotion-utils";
import Image from "next/image";
import { CircleCountry } from "~/components/Common";
import { Text } from "~/components/Common/Typo";
import { calculatePassedTime, omit, pick } from "~/utils";

type Props = Notice.DTO;

const NormalItem = ({
  alarmType,
  country,
  restaurantName,
  thumbnail,
  userName,
  profile,
  createDate
}: Omit<Props, "content">) => {
  const { colors, weighs } = useTheme();

  const typeToText = () => {
    switch (alarmType) {
      case "Like":
        return "liked";
      case "Review":
        return "commented";
      case "Scrap":
        return "saved";
      default:
        return "";
    }
  };

  return (
    <Flex justify="space-between" align="center">
      <Image
        src={profile || whiteAvatar}
        alt={`${userName}'s profile image`}
        width={34}
        height={34}
        css={css`
          border-radius: 50%;
        `}
      />
      <Flex
        direction="column"
        css={css`
          padding-left: 11px;
          flex: 1;
        `}
      >
        <Text
          _fontSize={14}
          weight={weighs.semiBold}
          _color={colors.secondary[47]}
        >
          {restaurantName}
        </Text>
        <Spacing size={4} />
        <Flex align="center">
          <CircleCountry
            country={country}
            alt={country}
            size={14}
            padding={4}
          />
          <Spacing direction="horizontal" size={4} />
          <Text
            _fontSize={14}
            weight={weighs.semiBold}
            _color={colors.secondary[47]}
          >
            {userName}
          </Text>
          <Spacing direction="horizontal" size={7} />
          <Text _fontSize={12} _color={colors.secondary[34]}>
            {typeToText()}
          </Text>
          <Spacing direction="horizontal" size={4} />
          <Text _fontSize={12} _color={colors.secondary[34]}>
            your post.
          </Text>
          <Spacing direction="horizontal" size={7} />
          <Text _fontSize={11} _color={colors.secondary[93]}>
            {calculatePassedTime(createDate)}
          </Text>
        </Flex>
      </Flex>
      <Image
        src={thumbnail}
        alt="thumbnail of your restaurant"
        width={44}
        height={44}
        css={css`
          border-radius: 5px;
        `}
      />
    </Flex>
  );
};

const RejectedItem = ({
  content,
  createDate
}: Pick<Props, "content" | "createDate">) => {
  const { colors, weighs } = useTheme();

  return (
    <Flex>
      <RejectPalm />
      <Spacing direction="horizontal" size={11} />
      <Flex direction="column">
        <Text _fontSize={13} _color={colors.secondary[34]}>
          Your post has been{" "}
          <Text _fontSize={13} weight={weighs.bold}>
            rejected.
          </Text>
        </Text>
        <Spacing size={4} />
        <Flex>
          <Text _fontSize={11.5} _color={colors.secondary[34]}>
            Reason: {content}
          </Text>
          <Spacing direction="horizontal" size={14} />
          <Text _fontSize={11} _color={colors.secondary[93]}>
            {calculatePassedTime(createDate)}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

const NotificationItem = (props: Props) => {
  const { colors } = useTheme();

  const isRejectedNotification =
    props.alarmType === "RejectRestaurant" ||
    props.alarmType === "RejectReview";

  return (
    <li
      css={css`
        ${margin({
          x: 16
        })}
        ${padding({
          x: 4,
          bottom: 9
        })}

        border-bottom: 0.7px solid ${colors.secondary.DF};
      `}
    >
      {isRejectedNotification ? (
        <RejectedItem {...pick({ ...props }, ["createDate", "content"])} />
      ) : (
        <NormalItem {...omit({ ...props }, ["content"])} />
      )}
    </li>
  );
};

export default NotificationItem;
