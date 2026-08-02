"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SmartImage from "@/app/components/SmartImage";
import { timeAgo } from "@/sanity/lib/timeAgo";

interface StoryItem {
  title: string;
  slug: string;
  publishedAt: string;
  mainImage?: any;
  _id?: string;
  sourceType: "sanity" | "sheet";
  isFeatured?: boolean;
  isTrending?: boolean;
  isBreaking?: boolean;
  isOpinion?: boolean;
  isInDepth?: boolean;
  isSpecial?: boolean;
}

export default function AdminDashboardClient({ initialStories }: { initialStories: StoryItem[] }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [stories, setStories] = useState<StoryItem[]>(initialStories);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSource, setFilterSource] = useState<"all" | "sanity" | "sheet">("all");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("tgn_admin_passcode");
    if (storedAuth) {
      setPasscode(storedAuth);
      setIsAuthenticated(true);
    }
  }, []);

  // Reset to Page 1 on search or filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterSource]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg("Please enter a passcode.");
      return;
    }
    sessionStorage.setItem("tgn_admin_passcode", passcode.trim());
    setIsAuthenticated(true);
    setErrorMsg("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("tgn_admin_passcode");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const handleSectionChange = async (story: StoryItem, targetSection: string) => {
    if (story.sourceType === "sheet") {
      setToastMsg(`Note: "${story.title}" is from Google Sheets. Section edits only apply to Sanity stories.`);
      setTimeout(() => setToastMsg(null), 4000);
      return;
    }

    const storyId = story._id || story.slug;

    const newFlags = {
      isFeatured: targetSection === "isFeatured",
      isTrending: targetSection === "isTrending",
      isBreaking: targetSection === "isBreaking",
      isOpinion: targetSection === "isOpinion",
      isInDepth: targetSection === "isInDepth",
      isSpecial: targetSection === "isSpecial",
    };

    setSavingId(storyId);

    try {
      const res = await fetch("/api/admin/update-section", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passcode,
          storyId,
          sectionFlags: newFlags,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          sessionStorage.removeItem("tgn_admin_passcode");
          setErrorMsg("Session expired or invalid passcode. Please log in again.");
          return;
        }
        throw new Error(data.error || "Failed to update section");
      }

      setStories((prev) =>
        prev.map((item) =>
          (item._id === storyId || item.slug === story.slug)
            ? { ...item, ...newFlags }
            : item
        )
      );

      setToastMsg(`Successfully updated section for "${story.title}"!`);
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err: any) {
      alert(`Error updating story: ${err.message}`);
    } finally {
      setSavingId(null);
    }
  };

  // Filter stories
  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource =
      filterSource === "all" ? true : story.sourceType === filterSource;
    return matchesSearch && matchesSource;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage) || 1;
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <h1 className="admin-login-title">The Ground Narrative</h1>
          <p className="admin-login-subtitle">Admin Dashboard Authentication</p>
          {errorMsg && <div className="admin-error-box">{errorMsg}</div>}
          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password"
              placeholder="Enter Admin Passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="admin-input"
              autoFocus
            />
            <button type="submit" className="admin-btn-primary">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* HEADER */}
      <header className="admin-header">
        <div className="admin-header-title">
          <h1>TGN Editorial Dashboard</h1>
          <span className="admin-badge">Manage Sections</span>
        </div>
        <button onClick={handleLogout} className="admin-logout-btn">
          Log Out
        </button>
      </header>

      {/* TOAST NOTIFICATION */}
      {toastMsg && <div className="admin-toast">{toastMsg}</div>}

      {/* TOOLBAR */}
      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search stories by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="admin-search-input"
        />

        <div className="admin-filter-tabs">
          <button
            className={`admin-tab ${filterSource === "all" ? "active" : ""}`}
            onClick={() => setFilterSource("all")}
          >
            All ({stories.length})
          </button>
          <button
            className={`admin-tab ${filterSource === "sanity" ? "active" : ""}`}
            onClick={() => setFilterSource("sanity")}
          >
            Sanity ({stories.filter((s) => s.sourceType === "sanity").length})
          </button>
          <button
            className={`admin-tab ${filterSource === "sheet" ? "active" : ""}`}
            onClick={() => setFilterSource("sheet")}
          >
            Google Sheets ({stories.filter((s) => s.sourceType === "sheet").length})
          </button>
        </div>
      </div>

      {/* STORIES LIST TABLE */}
      <div className="admin-stories-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Story Title & Link</th>
              <th>Source</th>
              <th>Current Section</th>
              <th>Change Section</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStories.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "24px" }}>
                  No stories found.
                </td>
              </tr>
            ) : (
              paginatedStories.map((story) => {
                const currentSection = story.isFeatured
                  ? "isFeatured"
                  : story.isTrending
                  ? "isTrending"
                  : story.isBreaking
                  ? "isBreaking"
                  : story.isSpecial
                  ? "isSpecial"
                  : story.isOpinion
                  ? "isOpinion"
                  : "isInDepth";

                const storyKey = story._id || story.slug;

                return (
                  <tr key={storyKey}>
                    {/* THUMBNAIL */}
                    <td className="cell-thumb">
                      {story.mainImage ? (
                        <div className="admin-thumb-wrap">
                          <SmartImage
                            image={story.mainImage}
                            alt={story.title}
                            width={60}
                            height={40}
                          />
                        </div>
                      ) : (
                        <div className="admin-thumb-placeholder">No Img</div>
                      )}
                    </td>

                    {/* TITLE WITH PREVIEW LINK */}
                    <td className="cell-title">
                      <Link
                        href={`/story/${story.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-story-link"
                        title="Click to preview story on website"
                      >
                        {story.title} ↗
                      </Link>
                    </td>

                    {/* SOURCE */}
                    <td className="cell-source">
                      <span className={`source-pill ${story.sourceType}`}>
                        {story.sourceType === "sanity" ? "Sanity" : "GSheets"}
                      </span>
                    </td>

                    {/* CURRENT SECTION BADGE */}
                    <td className="cell-badge">
                      {story.isFeatured && <span className="sec-badge featured">⭐ Featured</span>}
                      {story.isTrending && <span className="sec-badge trending">🔥 Trending</span>}
                      {story.isBreaking && <span className="sec-badge breaking">⚡ Breaking</span>}
                      {story.isSpecial && <span className="sec-badge special">✨ Special</span>}
                      {story.isOpinion && <span className="sec-badge opinion">💡 Opinion</span>}
                      {story.isInDepth && <span className="sec-badge indepth">🔍 In Depth</span>}
                    </td>

                    {/* SECTION DROPDOWN SELECTOR */}
                    <td className="cell-action">
                      <select
                        value={currentSection}
                        onChange={(e) => handleSectionChange(story, e.target.value)}
                        disabled={savingId === storyKey || story.sourceType === "sheet"}
                        className="admin-select"
                      >
                        <option value="isInDepth">🔍 In Depth (Standard)</option>
                        <option value="isFeatured">⭐ Featured (Hero 4x2)</option>
                        <option value="isTrending">🔥 Trending (Sidebar)</option>
                        <option value="isBreaking">⚡ Breaking News Ticker</option>
                        <option value="isSpecial">✨ Special Report</option>
                        <option value="isOpinion">💡 Opinion Piece</option>
                      </select>
                      {savingId === storyKey && <span className="saving-spinner">Saving...</span>}
                    </td>

                    {/* DATE */}
                    <td className="cell-date">{timeAgo(story.publishedAt)}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="admin-pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="admin-page-btn"
          >
            ← Previous
          </button>

          <span className="admin-page-info">
            Page {currentPage} of {totalPages} ({filteredStories.length} total stories)
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="admin-page-btn"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
