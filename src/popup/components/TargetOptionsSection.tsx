import { 
    makeStyles, 
    Field, 
    InfoLabel, 
    Accordion, 
    AccordionHeader, 
    AccordionItem, 
    AccordionPanel, 
    Divider 
} from "@fluentui/react-components";
import { QuickTargetBox } from "./QuickTargetBox";
import { SaveBookmarksBox } from "./SaveBookmarksBox";

const useStyles = makeStyles({
    box: {
        backgroundColor: "var(--colorNeutralBackground2)",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    headerContent: {
        display: "flex",
        alignItems: "center",
        gap: "4px",
    },
});

export const TargetOptionsSection = () => {
    const styles = useStyles();


    return (
        <div className={styles.box}>
                <Field hint="Base URL permits every subpage (e.g. https://chatgpt.com/)"/>

            <Accordion collapsible multiple>

                <AccordionItem value="1">
                    <AccordionHeader>
                        <div className={styles.headerContent}>
                            QUICK TARGET
                            <span
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                            >
                                <InfoLabel info="Enter any URL and click Save to set it as the only allowed site when filtering is active." />
                            </span>
                        </div>
                    </AccordionHeader>
                    <AccordionPanel>
                        <QuickTargetBox />
                    </AccordionPanel>
                </AccordionItem>
                <Divider />
                <AccordionItem value="2">
                    <AccordionHeader>
                        <div className={styles.headerContent}>
                            BOOKMARK URL
                            <span
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                            >
                                <InfoLabel info="Give a name and URL, then hit Save to add it. Use the bookmark buttons below to switch targets instantly." />
                            </span>

                        </div>
                    </AccordionHeader>
                    <AccordionPanel>
                        <SaveBookmarksBox />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

        </div>
    );
};
