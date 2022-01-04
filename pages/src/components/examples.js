import { useCallback } from "preact/hooks";

const examples = [{ title: "Vitalik Buterin's Blog", url: "https://vitalik.ca/feed.xml" }];

function Examples(props) {
  const onClick = useCallback(() => {
    props.onClick(examples[0].url);
  }, [props]);

  return (
    <div class="self-start px-5 mt-5 text-gray-500 text-sm">
      <span class="">Or try with </span>
      <a class="link" onClick={onClick}>
        {examples[0].title}
      </a>
    </div>
  );
}

export default Examples;
