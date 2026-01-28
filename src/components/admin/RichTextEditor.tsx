"use client";

import React from "react";
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

const zh_tw = {
    code: 'zh_tw',
    toolbar: {
        default: '預設',
        save: '儲存',
        font: '字型',
        formats: '格式',
        fontSize: '字體大小',
        bold: '粗體',
        underline: '底線',
        italic: '斜體',
        strike: '刪除線',
        subscript: '下標',
        superscript: '上標',
        removeFormat: '清除格式',
        fontColor: '字體顏色',
        hiliteColor: '背景顏色',
        indent: '增加縮排',
        outdent: '減少縮排',
        align: '對齊方式',
        alignLeft: '靠左對齊',
        alignRight: '靠右對齊',
        alignCenter: '置中',
        alignJustify: '左右對齊',
        list: '列表',
        orderList: '有序列表',
        unorderList: '無序列表',
        horizontalRule: '水平線',
        hr_solid: '實線',
        hr_dotted: '點線',
        hr_dashed: '虛線',
        table: '表格',
        link: '超連結',
        math: '數學',
        image: '圖片',
        video: '影片',
        audio: '音訊',
        fullScreen: '全螢幕',
        showBlocks: '顯示區塊',
        codeView: '原始碼',
        undo: '復原',
        redo: '重做',
        preview: '預覽',
        print: '列印',
        tag_p: '段落',
        tag_div: '本文 (DIV)',
        tag_h: '標題',
        tag_blockquote: '引用',
        tag_pre: '程式碼',
        template: '模板',
        lineHeight: '行高',
        paragraphStyle: '段落樣式',
        textStyle: '文字樣式',
        imageGallery: '圖片庫',
        dir_ltr: '由左至右',
        dir_rtl: '由右至左',
        mention: '提及'
    },
    dialogBox: {
        linkBox: {
            title: '插入超連結',
            url: '網址',
            text: '顯示文字',
            newWindowCheck: '在新視窗開啟',
            downloadLinkCheck: '下載連結',
            bookmark: '書籤'
        },
        mathBox: {
            title: '數學',
            inputLabel: '數學符號',
            fontSizeLabel: '字體大小',
            previewLabel: '預覽'
        },
        imageBox: {
            title: '插入圖片',
            file: '上傳圖片',
            url: '圖片網址',
            altText: '替代文字'
        },
        videoBox: {
            title: '插入影片',
            file: '上傳影片',
            url: '嵌入網址, Youtube, Vimeo'
        },
        audioBox: {
            title: '插入音訊',
            file: '上傳音訊',
            url: '音訊網址'
        },
        browser: {
            tags: '標籤',
            search: '搜尋',
        },
        caption: '標題',
        close: '關閉',
        submitButton: '確定',
        revertButton: '還原',
        proportion: '比例',
        basic: '基本',
        left: '左',
        right: '右',
        center: '中',
        width: '寬度',
        height: '高度',
        size: '尺寸',
        ratio: '比率'
    },
    controller: {
        edit: '編輯',
        unlink: '移除連結',
        remove: '刪除',
        insertRowAbove: '在上方插入列',
        insertRowBelow: '在下方插入列',
        deleteRow: '刪除列',
        insertColumnBefore: '在左方插入欄',
        insertColumnAfter: '在右方插入欄',
        deleteColumn: '刪除欄',
        fixedColumnWidth: '固定欄寬',
        resize100: '放大 100%',
        resize75: '放大 75%',
        resize50: '放大 50%',
        resize25: '放大 25%',
        mirrorHorizontal: '水平翻轉',
        mirrorVertical: '垂直翻轉',
        rotateLeft: '向左旋轉',
        rotateRight: '向右旋轉',
        maxSize: '最大尺寸',
        minSize: '最小尺寸',
        tableHeader: '表格標題',
        mergeCells: '合併儲存格',
        splitCells: '分割儲存格',
        HorizontalSplit: '水平分割',
        VerticalSplit: '垂直分割',
        autoSize: '自動尺寸'
    },
    menu: {
        spaced: '間距',
        bordered: '邊線',
        neon: '霓虹',
        translucent: '半透明',
        shadow: '陰影',
        code: '程式碼'
    }
};

interface RichTextEditorProps {
    label: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const RichTextEditor = React.memo(function RichTextEditor({ label, placeholder, value, onChange }: RichTextEditorProps) {
    return (
        <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            <div className="rounded-lg border border-gray-300 shadow-sm overflow-hidden bg-white">
                <SunEditor
                    setContents={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    lang={zh_tw}
                    setOptions={{
                        height: "auto",
                        minHeight: "300px",
                        font: [
                            '微軟正黑體', '新細明體', '標楷體', '宋體', '仿宋', '黑體', '楷體', '微软雅黑',
                            'Arial', 'Comic Sans MS', 'Courier New', 'Impact', 'Georgia', 'Tahoma', 'Trebuchet MS', 'Verdana'
                        ],
                        buttonList: [
                            ['undo', 'redo'],
                            ['font', 'fontSize', 'formatBlock'],
                            ['paragraphStyle', 'blockquote'],
                            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                            ['fontColor', 'hiliteColor', 'textStyle'],
                            ['removeFormat'],
                            '/', // Line break
                            ['outdent', 'indent'],
                            ['align', 'horizontalRule', 'list', 'lineHeight'],
                            ['table', 'link', 'image', 'video', 'audio' /** 'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                            /** ['imageGallery'] */ // You must add the "imageGalleryUrl" option to be able to use the "image gallery" feature.
                            ['fullScreen', 'showBlocks', 'codeView'],
                            ['preview', 'print'],
                            // ['save', 'template'],
                            /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                        ]
                    }}
                />
            </div>
            <p className="text-xs text-gray-500 mt-2">
                支持拖拽上傳圖片/影片。富文本編輯器由 SunEditor 提供。
            </p>
        </div>
    );
});
