import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import classnames from "classnames";
import Result from "../../components/result";
import Examples from "../../components/examples";
import * as api from "../../api";

const Home = () => {
  const [sourceUrl, setSourceUrl] = useState("");
  const [submitting, setSubmiting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!sourceUrl) {
        return;
      }
      setSubmiting(true);
      try {
        const resp = await api.createFeed(sourceUrl);
        setResult(resp);
      } catch (e) {
        setError("Please provide valid rss feed url");
      } finally {
        setSubmiting(false);
      }
    },
    [sourceUrl]
  );

  const onInput = useCallback((e) => {
    setError("");
    setResult(null);
    setSourceUrl(e.target.value);
  }, []);

  const onExampleClicked = useCallback((feedUrl) => {
    setSourceUrl(feedUrl);
  }, []);

  return (
    <div class="h-full flex justify-center items-center">
      <div class="container flex flex-col items-center">
        <h1 class="mb-5 text-5xl font-bold">rerss</h1>
        <p class="mb-5 text-lg">
          Receive <del>new</del> old updates from RSS feed
        </p>
        <form onSubmit={onSubmit} class="w-full p-5 max-w-2xl">
          <div class="form-control mt-5">
            <div class="relative">
              <input
                type="text"
                class="input w-full"
                placeholder="feed url"
                value={sourceUrl}
                onInput={onInput}
              />
              <button
                type="submit"
                class={classnames(
                  "absolute top-0 right-0 rounded-l-none btn btn-primary",
                  submitting && "loading"
                )}
              >
                Convert
              </button>
            </div>
          </div>
          {error && (
            <label class="label">
              <span class="label-text-alt text-red-400">{error}</span>
            </label>
          )}
          {result ? <Result {...result} /> : <Examples onClick={onExampleClicked} />}
        </form>
      </div>
    </div>
  );
};

export default Home;
