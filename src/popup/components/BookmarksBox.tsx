import { useState, useEffect } from "react";
import {
    makeStyles,
    Subtitle2Stronger,
    Menu,
    MenuTrigger,
    MenuPopover,
    MenuList,
    MenuItem,
    SplitButton,
    MenuButtonProps,
} from "@fluentui/react-components";
import { getBookmark, deleteBookmark, saveCurrentUrl, setActivate, setShowSite } from "../../utils/storage";

const useStyles = makeStyles({
    box: {
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        borderRadius: "8px",
        marginBottom: "16px",
    },
    splitBtn: {
        width: "100%",
    },
});

export const BookmarksBox = () => {
    const styles = useStyles();
    const [bookmarks, setBookmarks] = useState<{ name: string; url: string }[]>([]);

    useEffect(() => {
        // 1) initial load
        getBookmark().then(setBookmarks);

        // 2) auto-refresh on storage changes
        const listener = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
            if (area !== "local" || !changes.stayOnSiteBookmarks) return;
            setBookmarks(changes.stayOnSiteBookmarks.newValue);
        };
        chrome.storage.onChanged.addListener(listener);
        return () => chrome.storage.onChanged.removeListener(listener);
    }, []);

    if (bookmarks.length === 0) {
        return (
            <div className={styles.box}>
                <Subtitle2Stronger>BOOKMARKS</Subtitle2Stronger>
                <em>No bookmarks yet.</em>
            </div>
        );
    }

    return (
        <div className={styles.box}>
            <Subtitle2Stronger>BOOKMARKS</Subtitle2Stronger>

            {bookmarks.map(({ name, url }) => (
                <Menu key={name}>
                    <MenuTrigger disableButtonEnhancement>
                        {(triggerProps: MenuButtonProps) => (
                            <SplitButton
                                menuButton={triggerProps}
                                className={styles.splitBtn}
                                primaryActionButton={{
                                    className: styles.splitBtn,
                                    onClick: async () => {
                                        await saveCurrentUrl(url);
                                        setShowSite(true);
                                        setActivate(true);
                                        chrome.tabs.create({ url });
                                    }
                                }}
                            >
                                {name}
                            </SplitButton>
                        )}
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            <MenuItem className={styles.splitBtn} onClick={() => deleteBookmark(name)}>Delete</MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            ))}
        </div>
    );
};
