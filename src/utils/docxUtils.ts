import { patchDocument, PatchType, TextRun } from "docx";
import { saveAs } from "file-saver";

/**
 * Helper: convert a plain multi-line string to an array of TextRuns,
 * inserting { break: 1 } between lines to preserve line breaks in Word.
 */
function multilineToRuns(text: string): TextRun[] {
    const lines = text.split("\n");
    const runs: TextRun[] = [];
    lines.forEach((line, idx) => {
        runs.push(new TextRun({ text: line }));
        if (idx < lines.length - 1) {
            runs.push(new TextRun({ break: 1 }));
        }
    });
    return runs;
}

/**
 * Helper: process 家事報告内容.
 * For each paragraph (non-empty line), bold the text up to and including
 * the FIRST punctuation mark on that line where the preceding text contains
 * at least 2 Chinese characters. Subsequent lines of the same block
 * are treated as continuation and are NOT bolded.
 *
 * Empty lines become break separators.
 */
const PUNCT_REGEX_G = /[，。：,.:]/g;
const CHINESE_CHAR = /[\u4e00-\u9fff]/g;

function familyReportToRuns(text: string): TextRun[] {
    const lines = text.split("\n");
    const runs: TextRun[] = [];

    lines.forEach((line, idx) => {
        if (line.trim() === "") {
            // Empty line acts as paragraph break
            if (idx < lines.length - 1) {
                runs.push(new TextRun({ break: 1 }));
            }
            return;
        }

        // Find the first punctuation where the text before it has >= 2 Chinese characters
        PUNCT_REGEX_G.lastIndex = 0;
        let boldApplied = false;
        let match: RegExpExecArray | null;

        while ((match = PUNCT_REGEX_G.exec(line)) !== null) {
            const before = line.substring(0, match.index);
            const chineseCount = (before.match(CHINESE_CHAR) ?? []).length;
            if (chineseCount >= 2) {
                const splitAt = match.index + match[0].length;
                runs.push(new TextRun({ text: line.substring(0, splitAt), bold: true }));
                if (splitAt < line.length) {
                    runs.push(new TextRun({ text: line.substring(splitAt) }));
                }
                boldApplied = true;
                break;
            }
        }

        if (!boldApplied) {
            runs.push(new TextRun({ text: line }));
        }

        if (idx < lines.length - 1) {
            runs.push(new TextRun({ break: 1 }));
        }
    });

    return runs;
}

/**
 * Generates a new DOCX file from a template buffer and data object.
 */
export const generateDocx = async (
    templateBuffer: ArrayBuffer,
    data: Record<string, any>,
    outputFilename: string = "bulletin_generated.docx"
): Promise<Blob> => {
    try {
        const patches: Record<string, any> = {};

        Object.keys(data).forEach(key => {
            const value = data[key] ?? "";
            const strValue = String(value);

            if (key === "家事報告内容") {
                patches[key] = {
                    type: PatchType.PARAGRAPH,
                    children: familyReportToRuns(strValue),
                };
            } else {
                // For all other fields, preserve line breaks
                patches[key] = {
                    type: PatchType.PARAGRAPH,
                    children: multilineToRuns(strValue),
                };
            }
        });

        const out = await patchDocument({
            outputType: "blob",
            data: new Uint8Array(templateBuffer),
            patches,
        });

        saveAs(out as Blob, outputFilename);
        return out as Blob;
    } catch (error) {
        console.error("Error generating document:", error);
        throw error;
    }
};
