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
    <div class="my-8 px-2">
      <div class="card card-compact sm:card-normal shadow">
        <div class="card-body">
          <h2 class="card-title">Subscribe</h2>
          <div>
            <p>
              <samp>{url}</samp>
              <CopyToClipboard text={url} onCopy={onCopy}>
                <button type="button" class="btn btn-xs ml-2">
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
