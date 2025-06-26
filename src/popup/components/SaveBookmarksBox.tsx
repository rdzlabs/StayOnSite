import { useState } from "react";
import { makeStyles, Field, Input, Button } from "@fluentui/react-components";
import { saveBookmark } from "../../utils/storage";
import { isValidUrl } from "../../utils/validation";

const useStyles = makeStyles({
    box: {
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    textGap: {
        gap: "6px",
    },
});

export const SaveBookmarksBox = () => {
    const styles = useStyles();
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [saved, setSaved] = useState(false);
    const [nameError, setNameError] = useState<string | null>(null);
    const [urlError, setUrlError] = useState<string | null>(null);

    const handleSave = async () => {
        // clear prior messages
        setNameError(null);
        setUrlError(null);
        setSaved(false);

        // validate name
        if (!name.trim()) {
            setNameError("Please enter a name.");
        }
        // validate url
        if (!url.trim() || !isValidUrl(url)) {
            setUrlError("Please enter a valid URL (including https://).");
        }
        // if any errors, bail
        if (nameError || urlError || !name.trim() || !url.trim() || !isValidUrl(url)) {
            return;
        }

        // all good → save
        await saveBookmark({ name, url });
        setSaved(true);
        setName("");
        setUrl("");
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className={styles.box}>
            <Field
                label="Name"
                validationState={nameError ? "error" : undefined}
                validationMessage={nameError ?? undefined}
            >
                <Input
                    value={name}
                    onChange={e => {
                        setName(e.currentTarget.value);
                        setNameError(null);
                    }}
                    placeholder="MyBookmark"
                />
            </Field>

            <Field
                label="URL"
                validationState={
                    urlError ? "error" : saved ? "success" : undefined
                }
                validationMessage={
                    urlError
                        ? urlError
                        : saved
                            ? "Bookmark saved!"
                            : undefined
                }
                className={styles.textGap}
            >
                <Input
                    value={url}
                    onChange={e => {
                        setUrl(e.currentTarget.value);
                        setUrlError(null);
                    }}
                    placeholder="https://example.com/"
                />
            </Field>

            <Button onClick={handleSave}>Save</Button>
        </div>
    );
};
