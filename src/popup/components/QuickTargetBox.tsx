// src/components/QuickTargetBox.tsx

import { useState } from "react";
import { makeStyles, Field, Input, Button } from "@fluentui/react-components";
import { saveCurrentUrl } from "../../utils/storage";
import { isValidUrl } from "../../utils/validation";

const useStyles = makeStyles({
  box: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  textGap: {
    gap: "6px",
  },
});

export const QuickTargetBox = () => {
  const styles = useStyles();
  const [url, setUrl]       = useState("");
  const [saved, setSaved]   = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const handleSave = async () => {
    // reset messages
    setError(null);
    setSaved(false);

    if (!url) {
      setError("Please enter a URL.");
      return;
    }
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (including https://).");
      return;
    }

    await saveCurrentUrl(url);
    setSaved(true);
    setUrl("");
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={styles.box}>
      <Field
        label="URL"
        validationState={error ? "error" : saved ? "success" : undefined}
        validationMessage={
          error
            ? error
            : saved
            ? "Quick-target saved!"
            : undefined
        }
        className={styles.textGap}
      >
        <Input
          value={url}
          onChange={(e) => {
            setUrl(e.currentTarget.value);
            setError(null);
          }}
          placeholder="https://example.com/"
        />
      </Field>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};
