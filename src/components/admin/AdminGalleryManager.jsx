"use client";

import React, { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase"; // ← make sure `storage` is exported from your firebase lib
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  Trash2,
  Edit3,
  Plus,
  X,
  Save,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AdminGalleryManager() {
  const [artworks, setArtworks] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [modalStatus, setModalStatus] = useState({
    open: false,
    type: "success",
  });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Italian");
  const [price, setPrice] = useState("");
  const [bio, setBrief] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [weight, setWeight] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imgProgress, setImgProgress] = useState(0);
  const [vidProgress, setVidProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "artworks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setArtworks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  /**
   * Uploads a file to Firebase Storage and returns the public download URL.
   * Uses uploadBytesResumable so we get real progress ticks.
   */
  const uploadToStorage = (file, path, onProgress) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          onProgress(pct);
        },
        (error) => {
          console.error("Storage upload error:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        },
      );
    });
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setBrief("");
    setDimensions("");
    setWeight("");
    setCategory("Italian");
    setImageFile(null);
    setVideoFile(null);
    setImgProgress(0);
    setVidProgress(0);
    setEditingId(null);
  };

  const handleCatalogSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Resolve image URL — upload new file, or keep existing
      let resolvedImgUrl = editingId
        ? artworks.find((a) => a.id === editingId)?.imageUrl
        : "";

      if (imageFile) {
        resolvedImgUrl = await uploadToStorage(
          imageFile,
          `artworks/${slug}/image_${Date.now()}_${imageFile.name}`,
          setImgProgress,
        );
      }

      // Resolve video URL — upload new file, or keep existing
      let resolvedVidUrl = editingId
        ? artworks.find((a) => a.id === editingId)?.videoUrl
        : "";

      if (videoFile) {
        resolvedVidUrl = await uploadToStorage(
          videoFile,
          `artworks/${slug}/video_${Date.now()}_${videoFile.name}`,
          setVidProgress,
        );
      }

      const payloadData = {
        name: name.trim(),
        slug,
        category,
        price: Number(price),
        bio: bio.trim(),
        dimensions: dimensions.trim(),
        weight: weight.trim(),
        imageUrl: resolvedImgUrl,
        videoUrl: resolvedVidUrl,
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        await updateDoc(doc(db, "artworks", editingId), payloadData);
      } else {
        await addDoc(collection(db, "artworks"), {
          ...payloadData,
          createdAt: new Date().toISOString(),
        });
      }

      setModalStatus({ open: true, type: "success" });
      setIsEditorOpen(false);
      resetForm();
    } catch (err) {
      console.error("Catalog operation failed:", err);
      setModalStatus({ open: true, type: "failure" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCatalogDelete = async (id) => {
    if (!confirm("Delete this artwork permanently from the collection?"))
      return;
    await deleteDoc(doc(db, "artworks", id));
  };

  return (
    <div className="w-full bg-card border border-foreground/10 p-6 md:p-8 space-y-8 relative font-body text-xs text-foreground">
      <div className="absolute inset-0 border border-foreground/5 pointer-events-none m-2"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-foreground/5 pb-4 relative z-10">
        <h2 className="font-heading text-2xl font-light tracking-tight">
          Collection Controls
        </h2>
        <button
          onClick={() => {
            resetForm();
            setIsEditorOpen(true);
          }}
          className="btn-luxury h-10 px-4 flex items-center gap-1.5 font-semibold text-[9px] uppercase tracking-widest"
        >
          <Plus className="w-3.5 h-3.5" /> Add Artwork
        </button>
      </div>

      <div className="space-y-4 relative z-10">
        {artworks.map((art) => {
          const isExpanded = expandedId === art.id;
          return (
            <div
              key={art.id}
              className="border border-foreground/15 bg-background/50 overflow-hidden"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : art.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-foreground/[0.01] select-none"
              >
                <div>
                  <span className="font-medium text-sm text-foreground block">
                    {art.name}
                  </span>
                  <span className="text-[10px] text-muted block">
                    {art.category} School — ${art.price.toLocaleString()}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-muted" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted" />
                )}
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-foreground/5 bg-background/10 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] bg-card p-3 border border-foreground/5">
                    <p>
                      <span className="text-muted block uppercase text-[8px]">
                        Dimensions
                      </span>
                      {art.dimensions || "Variable"}
                    </p>
                    <p>
                      <span className="text-muted block uppercase text-[8px]">
                        Weight
                      </span>
                      {art.weight || "Variable"}
                    </p>
                    <p>
                      <span className="text-muted block uppercase text-[8px]">
                        Image
                      </span>
                      {art.imageUrl ? (
                        <a
                          href={art.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-primary"
                        >
                          View
                        </a>
                      ) : (
                        "None"
                      )}
                    </p>
                    <p>
                      <span className="text-muted block uppercase text-[8px]">
                        Video
                      </span>
                      {art.videoUrl ? (
                        <a
                          href={art.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-primary"
                        >
                          View
                        </a>
                      ) : (
                        "None"
                      )}
                    </p>
                  </div>
                  <p className="p-4 bg-card border border-foreground/5 font-heading italic text-xs leading-relaxed">
                    &ldquo;{art.bio}&rdquo;
                  </p>

                  <div className="flex justify-end gap-3 pt-2 border-t border-foreground/5">
                    <button
                      onClick={() => {
                        setEditingId(art.id);
                        setName(art.name);
                        setCategory(art.category);
                        setPrice(art.price);
                        setBrief(art.bio);
                        setDimensions(art.dimensions || "");
                        setWeight(art.weight || "");
                        setIsEditorOpen(true);
                      }}
                      className="h-9 px-3 border border-foreground/10 bg-card hover:border-foreground/30 text-muted hover:text-foreground transition-colors flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleCatalogDelete(art.id)}
                      className="h-9 px-3 border border-red-500/10 bg-card hover:border-red-500/30 text-red-500 transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex items-center justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-xl bg-card border border-foreground/10 p-8 relative my-auto shadow-2xl space-y-6">
            <button
              onClick={() => setIsEditorOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-heading text-xl font-light">
              {editingId ? "Update Artwork" : "Create Artwork"}
            </h3>

            <form onSubmit={handleCatalogSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase text-muted text-[10px]">
                    Artwork Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 bg-background border border-foreground/20 px-4 text-sm focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="uppercase text-muted text-[10px]">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full h-11 bg-background border border-foreground/20 px-4 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="uppercase text-muted text-[10px]">
                    School Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 bg-background border border-foreground/20 px-4 text-sm cursor-pointer focus:outline-none"
                  >
                    <option value="Italian">Italian</option>
                    <option value="French">French</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="uppercase text-muted text-[10px]">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    placeholder='48" x 60" x 3.5"'
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    className="w-full h-11 bg-background border border-foreground/20 px-4 text-sm focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="uppercase text-muted text-[10px]">
                    Net Weight
                  </label>
                  <input
                    type="text"
                    placeholder="14 kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full h-11 bg-background border border-foreground/20 px-4 text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Real File Upload Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-foreground/5 py-4">
                <div className="space-y-2">
                  <label className="uppercase text-muted text-[10px] flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" /> Image File
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(
                        (e.target.files && e.target.files[0]) || null,
                      )
                    }
                    className="text-[11px] file:mr-4 file:py-2 file:px-4 file:border file:border-foreground/10 file:bg-background file:text-foreground hover:file:bg-foreground/[0.02] cursor-pointer w-full"
                  />
                  {imgProgress > 0 && imgProgress < 100 && (
                    <div className="w-full h-[3px] bg-foreground/10 mt-1">
                      <div
                        className="h-full bg-primary transition-all duration-150"
                        style={{ width: `${imgProgress}%` }}
                      />
                    </div>
                  )}
                  {imgProgress === 100 && (
                    <p className="text-[10px] text-primary">✓ Image uploaded</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="uppercase text-muted text-[10px] flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" /> Video File
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setVideoFile(
                        (e.target.files && e.target.files[0]) || null,
                      )
                    }
                    className="text-[11px] file:mr-4 file:py-2 file:px-4 file:border file:border-foreground/10 file:bg-background file:text-foreground hover:file:bg-foreground/[0.02] cursor-pointer w-full"
                  />
                  {vidProgress > 0 && vidProgress < 100 && (
                    <div className="w-full h-[3px] bg-foreground/10 mt-1">
                      <div
                        className="h-full bg-primary transition-all duration-150"
                        style={{ width: `${vidProgress}%` }}
                      />
                    </div>
                  )}
                  {vidProgress === 100 && (
                    <p className="text-[10px] text-primary">✓ Video uploaded</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase text-muted text-[10px]">
                  Artistic Description Bio
                </label>
                <textarea
                  rows={3}
                  required
                  value={bio}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full bg-background border border-foreground/20 p-4 text-sm resize-none focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury w-full h-12 flex items-center justify-center gap-2 font-semibold tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-3.5 h-3.5" />
                {isSubmitting ? "Uploading..." : "Commit Structural Entry"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {modalStatus.open && (
        <div className="fixed inset-0 z-[120] bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="w-full max-w-sm bg-card border border-foreground/10 p-8 relative shadow-2xl text-center space-y-6">
            <button
              onClick={() => setModalStatus({ open: false, type: "success" })}
              className="absolute top-4 right-4 text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            {modalStatus.type === "success" ? (
              <>
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto stroke-[1.5]" />
                <h3 className="font-heading text-xl font-light">
                  Changes Saved
                </h3>
                <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                  The artwork and all associated files have been securely saved.
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-12 h-12 text-red-500/80 mx-auto stroke-[1.5]" />
                <h3 className="font-heading text-xl font-light">
                  Operation Failed
                </h3>
                <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                  Upload failed. Check your Storage rules and network, then try
                  again.
                </p>
              </>
            )}
            <button
              onClick={() => setModalStatus({ open: false, type: "success" })}
              className="btn-luxury w-full h-11 font-semibold tracking-widest text-[9px] uppercase"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
