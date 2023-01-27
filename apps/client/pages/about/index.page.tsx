import { useTheme } from "@emotion/react";
import { useRouter } from "next/router";
import { Text } from "~/components/Common/Typo";
import { useSetNavigation } from "~/hooks";

const EXTERNAL_LINK_LIST = [
  {
    label: "Privacy Policy",
    href: "https://plip.kr/html/95264de9-5e3f-4f0c-9211-b862b6babac2.html"
  },
  {
    label: "Terms of Use",
    href: "https://abaft-pie-111.notion.site/82a3453aee2d493596b3f7f7f60b16e9"
  }
];

const About = () => {
  const { colors, weighs } = useTheme();

  useSetNavigation({
    top: {
      title: (
        <Text _fontSize={19} _color={colors.secondary[47]} weight={weighs.bold}>
          About
        </Text>
      )
    }
  });

  return (
    <div>
      <ul>
        {EXTERNAL_LINK_LIST.map(item => (
          <li>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;
