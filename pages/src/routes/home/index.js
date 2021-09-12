import { h } from "preact";
import { useState, useCallback } from "preact/hooks";
import classnames from "classnames";
import Result from "../../components/result";
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
  });

  return (
    <div class="container grid-md">
      <div class="mt-5">
        <h1>RSS Time Machine</h1>
        <h5>
          <em>Receive updates from rss history</em>
        </h5>
      </div>
      <form onSubmit={onSubmit}>
        <div class={classnames("input-group mt-10", error && "has-error")}>
          <input
            type="text"
            class="form-input"
            placeholder="feed url"
            value={sourceUrl}
            onInput={onInput}
          />
          <button
            type="submit"
            class={classnames("btn btn-primary input-group-btn", submitting && "loading")}
          >
            Create
          </button>
        </div>
        {error && <p class="form-input-hint">{error}</p>}
      </form>
      {result && <Result {...result} />}
    </div>
  );
};

export default Home;
