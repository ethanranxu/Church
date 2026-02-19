"use client";

import { useState, useRef, useCallback } from "react";
import { Plus, Search, Calendar, ChevronLeft, Save, Loader2, ArrowUpRight, Edit3, Trash2 } from "lucide-react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import clsx from "clsx";
import { Devotion, createDevotion, updateDevotion, deleteDevotion } from "@/app/actions/devotions";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useTranslation } from "@/i18n/LanguageContext";

interface DevotionsClientProps {
    initialDevotions: Devotion[];
}

export default function DevotionsClient({ initialDevotions }: DevotionsClientProps) {
    const [view, setView] = useState<"list" | "create" | "edit">("list");
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<("draft" | "published")[]>(["draft", "published"]);
    const [sortConfig, setSortConfig] = useState<{
        key: "publishDate" | "views" | "createdAt" | "title" | "status";
        direction: "asc" | "desc";
    }>({ key: "publishDate", direction: "desc" });
    const router = useRouter();
    const { profile } = useAuth();
    const { t } = useTranslation();

    // Editor State
    const [title, setTitle] = useState("");
    const [publishDate, setPublishDate] = useState("");
    const [status, setStatus] = useState<"draft" | "published">("draft");
    const [editId, setEditId] = useState<string | null>(null);

    // Use ref for content to prevent re-renders on every keystroke
    const contentRef = useRef("");
    // Initial content for the editor (only updates when switching items)
    const [editorInitialContent, setEditorInitialContent] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;



    const filteredDevotions = initialDevotions.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            selectedStatus.includes(item.status)
    );

    const sortedDevotions = [...filteredDevotions].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === bValue) return 0;

        // Handle null values
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        const direction = sortConfig.direction === "asc" ? 1 : -1;

        if (typeof aValue === "string" && typeof bValue === "string") {
            return aValue.localeCompare(bValue) * direction;
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
            return (aValue - bValue) * direction;
        }

        return 0;
    });

    // Pagination Logic
    const totalPages = Math.ceil(sortedDevotions.length / itemsPerPage);
    const currentDevotions = sortedDevotions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when search changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleCreate = () => {
        setTitle("");
        setPublishDate(new Date().toISOString().split('T')[0]);
        setStatus("draft");
        setEditId(null);

        contentRef.current = "";
        setEditorInitialContent("");

        setView("create");
    };

    const setSort = (key: typeof sortConfig.key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
        }));
        setCurrentPage(1);
    };

    const SortIcon = ({ columnKey }: { columnKey: typeof sortConfig.key }) => {
        const active = sortConfig.key === columnKey;
        if (!active) return <ArrowUpRight className="h-4 w-4 opacity-0 group-hover/th:opacity-30 transition-opacity ml-1" />;
        return sortConfig.direction === "asc" ?
            <ArrowUpRight className="h-4 w-4 ml-1 rotate-0 transition-transform" /> :
            <ArrowUpRight className="h-4 w-4 ml-1 rotate-180 transition-transform" />;
    };

    const handleEdit = (item: Devotion) => {
        setTitle(item.title);
        setPublishDate(item.publishDate);
        setStatus(item.status);
        setEditId(item.id || null);

        contentRef.current = item.content;
        setEditorInitialContent(item.content);

        setView("edit");
    };

    const handleContentChange = useCallback((content: string) => {
        contentRef.current = content;
    }, []);

    const handleSave = async (saveStatus: 'draft' | 'published' = 'published') => {
        if (!title) {
            alert(t.admin.devotions.inputTitle);
            return;
        }

        setIsLoading(true);
        try {
            const dataToSave = {
                title: title,
                content: contentRef.current || "",
                publishDate: publishDate || "",
                status: saveStatus
            };

            const operator = profile ? { name: profile.name, email: profile.email } : undefined;

            if (view === "edit" && editId) {
                await updateDevotion(editId, dataToSave, operator);
            } else {
                await createDevotion(dataToSave, operator);
            }
            router.refresh();
            setView("list");
        } catch (error) {
            alert(t.admin.devotions.saveFailed);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, devTitle: string) => {
        if (confirm(t.admin.devotions.confirmDelete.replace("{title}", devTitle))) {
            try {
                const operator = profile ? { name: profile.name, email: profile.email } : undefined;
                await deleteDevotion(id, operator);
                router.refresh();
            } catch (error) {
                alert(t.admin.devotions.deleteFailed);
            }
        }
    };

    if (view === "create" || view === "edit") {
        return (
            <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setView("list")}
                            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {view === "create" ? t.admin.devotions.createTitle : t.admin.devotions.editTitle}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setView("list")}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                            {t.admin.devotions.cancel}
                        </button>
                        <button
                            onClick={() => handleSave('draft')}
                            disabled={isLoading}
                            className="hidden sm:flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 disabled:opacity-70"
                        >
                            {t.admin.devotions.saveDraft}
                        </button>
                        <button
                            onClick={() => handleSave('published')}
                            disabled={isLoading}
                            className="flex items-center rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            {isLoading ? t.admin.devotions.saving : t.admin.devotions.savePublish}
                        </button>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="space-y-2 w-full md:w-48">
                            <label className="block text-sm font-medium text-gray-700">{t.admin.devotions.publishDate}</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    lang="en-CA"
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2.5 px-3 text-sm h-[42px]"
                                    value={publishDate}
                                    onChange={(e) => setPublishDate(e.target.value)}
                                />
                                <Calendar className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2 flex-1">
                            <label className="block text-sm font-medium text-gray-700">{t.admin.devotions.titleLabel}</label>
                            <input
                                type="text"
                                placeholder={t.admin.devotions.titlePlaceholder}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2.5 px-3 text-sm h-[42px]"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <RichTextEditor
                        label={t.admin.devotions.content}
                        placeholder={t.admin.devotions.contentPlaceholder}
                        value={editorInitialContent}
                        onChange={handleContentChange}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{t.admin.devotions.title}</h1>
                    <p className="text-sm text-gray-500"></p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {t.admin.devotions.createNew}
                </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-100 p-4 flex flex-col sm:flex-row sm:items-center">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t.admin.devotions.searchPlaceholder}
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full rounded-lg border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-4">
                        <button
                            onClick={() => {
                                setSelectedStatus(prev =>
                                    prev.includes("published")
                                        ? prev.filter(s => s !== "published")
                                        : [...prev, "published"]
                                )
                            }}
                            className={clsx(
                                "px-3 py-1.5 text-sm font-medium rounded-full transition-colors border",
                                selectedStatus.includes("published")
                                    ? "bg-green-100 text-green-700 border-green-200"
                                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                            )}
                        >
                            {t.admin.devotions.published}
                        </button>
                        <button
                            onClick={() => {
                                setSelectedStatus(prev =>
                                    prev.includes("draft")
                                        ? prev.filter(s => s !== "draft")
                                        : [...prev, "draft"]
                                )
                            }}
                            className={clsx(
                                "px-3 py-1.5 text-sm font-medium rounded-full transition-colors border",
                                selectedStatus.includes("draft")
                                    ? "bg-gray-200 text-gray-800 border-gray-300"
                                    : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                            )}
                        >
                            {t.admin.devotions.draft}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 text-gray-500">
                            <tr>
                                <th
                                    className="px-6 py-4 font-medium w-40 cursor-pointer hover:bg-gray-100/50 transition-colors group/th"
                                    onClick={() => setSort("publishDate")}
                                >
                                    <div className="flex items-center">
                                        {t.admin.devotions.publishTime}
                                        <SortIcon columnKey="publishDate" />
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 font-medium cursor-pointer hover:bg-gray-100/50 transition-colors group/th"
                                    onClick={() => setSort("title")}
                                >
                                    <div className="flex items-center">
                                        {t.admin.devotions.title2}
                                        <SortIcon columnKey="title" />
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 font-medium w-32 text-center cursor-pointer hover:bg-gray-100/50 transition-colors group/th"
                                    onClick={() => setSort("views")}
                                >
                                    <div className="flex items-center justify-center">
                                        {t.admin.devotions.reads}
                                        <SortIcon columnKey="views" />
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 font-medium w-40 cursor-pointer hover:bg-gray-100/50 transition-colors group/th"
                                    onClick={() => setSort("createdAt")}
                                >
                                    <div className="flex items-center">
                                        {t.admin.devotions.createdAt}
                                        <SortIcon columnKey="createdAt" />
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 font-medium cursor-pointer hover:bg-gray-100/50 transition-colors group/th"
                                    onClick={() => setSort("status")}
                                >
                                    <div className="flex items-center">
                                        {t.admin.devotions.status}
                                        <SortIcon columnKey="status" />
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-medium text-right">{t.admin.devotions.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {currentDevotions.map((item) => (
                                <tr key={item.id} className="group transition-colors hover:bg-gray-50/50">
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {item.publishDate || t.admin.devotions.undetermined}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            onClick={() => handleEdit(item)}
                                            className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors cursor-pointer flex items-center gap-2"
                                            title={item.content?.replace(/<[^>]+>/g, '') || item.title}
                                        >
                                            {item.title.length > 30 ? item.title.substring(0, 30) + "..." : item.title}
                                            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-50" />
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-600">
                                        {item.views || 0}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap hidden md:table-cell">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={clsx(
                                                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                                item.status === "published"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-700"
                                            )}
                                        >
                                            {item.status === "published" ? t.admin.devotions.published : t.admin.devotions.draft}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => item.id && handleDelete(item.id, item.title)}
                                                className="rounded p-1.5 text-red-500 hover:bg-red-50 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredDevotions.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-gray-500">
                                        {t.admin.devotions.noDevotions}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
                        <div className="text-sm text-gray-500">
                            {t.admin.devotions.showing} {(currentPage - 1) * itemsPerPage + 1} {t.admin.devotions.to} {Math.min(currentPage * itemsPerPage, sortedDevotions.length)} {t.admin.devotions.total} {sortedDevotions.length} {t.admin.devotions.entries}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t.admin.devotions.prevPage}
                            </button>
                            <span className="text-sm font-medium text-gray-900">
                                {t.admin.devotions.page} {currentPage} / {totalPages} {t.admin.devotions.ofPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t.admin.devotions.nextPage}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
