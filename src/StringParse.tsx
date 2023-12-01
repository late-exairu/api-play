export default function StringParse({
  text,
  className,
}: {
  text: string;
  className?: string | undefined;
}) {
  const replacedString = text.replace(
    /{T}|{W}|{U}|{B}|{R}|{G}|{C}|{S}|{E}|{Q}|{X}|{1\}|{2\}|{3\}|{4\}|{5\}|{6\}|{7\}|{8\}|{9\}|{10\}|\n/g,
    (match): string => {
      const replacements: { [key: string]: string } = {
        "{T}":
          "<abbr class='card-symbol card-symbol-T' title='tap this permanent'>{T}</abbr>",
        "{W}":
          "<abbr class='card-symbol card-symbol-W' title='one white mana'>{W}</abbr>",
        "{U}":
          "<abbr class='card-symbol card-symbol-U' title='one blue mana'>{U}</abbr>",
        "{B}":
          "<abbr class='card-symbol card-symbol-B' title='one black mana'>{B}</abbr>",
        "{R}":
          "<abbr class='card-symbol card-symbol-R' title='one red mana'>{R}</abbr>",
        "{G}":
          "<abbr class='card-symbol card-symbol-G' title='one green mana'>{G}</abbr>",
        "{C}":
          "<abbr class='card-symbol card-symbol-C' title='one colorless mana'>{C}</abbr>",
        "{S}":
          "<abbr class='card-symbol card-symbol-S' title='one snow mana'>{S}</abbr>",
        "{E}":
          "<abbr class='card-symbol card-symbol-E' title='one energy mana'>{E}</abbr>",
        "{Q}":
          "<abbr class='card-symbol card-symbol-Q' title='untap this permanent'>{Q}</abbr>",
        "{X}":
          "<abbr class='card-symbol card-symbol-X' title='X generic mana'>{X}</abbr>",
        "{1}":
          "<abbr class='card-symbol card-symbol-1' title='one generic mana'>{1}</abbr>",
        "{2}":
          "<abbr class='card-symbol card-symbol-2' title='two generic mana'>{2}</abbr>",
        "{3}":
          "<abbr class='card-symbol card-symbol-3' title='three generic mana'>{3}</abbr>",
        "{4}":
          "<abbr class='card-symbol card-symbol-4' title='four generic mana'>{4}</abbr>",
        "{5}":
          "<abbr class='card-symbol card-symbol-5' title='five generic mana'>{5}</abbr>",
        "{6}":
          "<abbr class='card-symbol card-symbol-6' title='six generic mana'>{6}</abbr>",
        "{7}":
          "<abbr class='card-symbol card-symbol-7' title='seven generic mana'>{7}</abbr>",
        "{8}":
          "<abbr class='card-symbol card-symbol-8' title='eight generic mana'>{8}</abbr>",
        "{9}":
          "<abbr class='card-symbol card-symbol-9' title='nine generic mana'>{9}</abbr>",
        "{10}":
          "<abbr class='card-symbol card-symbol-10' title='ten generic mana'>{10}</abbr>",
        "\n": "<br />",
      };

      return replacements[match];
    },
  );

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: replacedString,
      }}
    />
  );
}
