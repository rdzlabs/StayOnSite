import {
    makeStyles,
    Image,
    Switch,
    Text,
} from "@fluentui/react-components";
import { useState, useEffect } from "react";
import {
    setActivate,
    getActivate,
    getCurrentUrl,
    setShowSite,
    getShowSite,
} from "../../utils/storage";

const webStoreUrl = `https://chrome.google.com/webstore/detail/${chrome.runtime.id}`;

const useStyles = makeStyles({
    wrapper: { display: "flex", flexDirection: "column", gap: "12px", padding: "12px" },
    topRow: { display: "flex", alignItems: "center", gap: "30px" },
    noWrap: { whiteSpace: "nowrap", },
});

export const HeaderSection = () => {
    const styles = useStyles();
    const [isActive, setIsActive] = useState<boolean | null>(null);
    const [showSaved, setShowSaved] = useState<boolean | null>(null);
    const [savedUrl, setSavedUrl] = useState<string | null>(null);

    useEffect(() => {
        // 1) load stored values once
        getActivate().then(setIsActive);
        getShowSite().then(flag => {
            setShowSaved(flag);
            if (flag) getCurrentUrl().then(setSavedUrl);
        });

        // 2) subscribe to any storage changes
        const listener = (
            changes: Record<string, chrome.storage.StorageChange>,
            area: string
        ) => {
            if (area !== "local") return;
            if (changes.activate) setIsActive(changes.activate.newValue);
            if (changes.showSite) setShowSaved(changes.showSite.newValue);
            if (changes.currentTargetUrl) setSavedUrl(changes.currentTargetUrl.newValue);
        };

        chrome.storage.onChanged.addListener(listener);
        return () => chrome.storage.onChanged.removeListener(listener);
    }, []);

    const handleActivateChange = (_: unknown, { checked }: { checked: boolean }) => {
        setIsActive(checked);
        setActivate(checked);
    };

    const handleCurrentSiteToggle = async (_: unknown, { checked }: { checked: boolean }) => {
        setShowSaved(checked);
        setShowSite(checked);
        if (checked) {
            const url = await getCurrentUrl();
            setSavedUrl(url);
        } else {
            setSavedUrl(null);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.topRow}>
                <a
                    href={webStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-block", cursor: "pointer" }}
                >
                    <Image
                        alt="StayOnSite Logo"
                        src="/target.png"
                        height={50}
                        width={50}
                    />
                </a>
                {isActive !== null && (
                    <Switch
                        label="Activate"
                        checked={isActive}
                        onChange={handleActivateChange}
                    />
                )}
                {showSaved !== null && (
                    <Switch
                        label="Show Current Site"
                        className={styles.noWrap}
                        checked={showSaved}
                        onChange={handleCurrentSiteToggle}
                    />

                )}
            </div>
            {showSaved && savedUrl && <Text>{savedUrl}</Text>}
        </div>
    );
};
