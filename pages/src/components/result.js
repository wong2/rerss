import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { SERVER_URL } from "../consts";

function Result({ id, upcomming }) {
  const [copied, setCopied] = useState(false);
  const url = useMemo(() => `${SERVER_URL}/f/${id}`, [id]);

  useEffect(() => setCopied(false), [id]);

  const onCopy = useCallback(() => {
    setCopied(true);
  }, []);

  return (
    <div class="mt-6">
      <h5>Subscribe to the following feed</h5>
      <samp>
        <a href={url} target="_blank" class="break-words">
          {url}
        </a>
      </samp>
      <CopyToClipboard text={url} onCopy={onCopy}>
        <button class="btn btn-sm ml-3">{copied ? "Copied" : "Copy"}</button>
      </CopyToClipboard>
      <h5 class="mt-3">Upcomming updates preview</h5>
      <div>
        {upcomming.map((item) => (
          <div class="mt-2">
            <span class="label label-rounded">{item.date}</span>
            <span class="ml-2">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;
