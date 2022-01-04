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
    <div class="mt-8">
      <div class="card shadow">
        <div class="card-body">
          <h2 class="card-title">Subscribe to the following feed</h2>
          <div>
            <p>
              <samp>
                <a href={url} target="_blank" class="break-words" rel="noreferrer">
                  {url}
                </a>
              </samp>
              <CopyToClipboard text={url} onCopy={onCopy}>
                <button type="button" class="btn btn-xs ml-3">
                  {copied ? "Copied" : "Copy"}
                </button>
              </CopyToClipboard>
            </p>
            <h2 class="card-title mt-5">Upcomming updates preview</h2>
            {upcomming.map((item) => (
              <div key={item.title} class="mt-2">
                <span class="block badge badge-outline mr-2 mb-1 sm:inline">{item.date}</span>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
