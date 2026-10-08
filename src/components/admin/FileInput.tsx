'use client';

import React, { useState, useEffect } from 'react';

interface FileInputProps {
  label: string;
  name: string;
  accept: string;
  required?: boolean;
  currentPath?: string | null;
  helpText?: string;
  onRemove?: () => void;
  removeName?: string;
}

export default function FileInput({
  label,
  name,
  accept,
  required = false,
  currentPath,
  helpText,
  removeName = `remove_${name}`
}: FileInputProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setIsRemoved(false);
      if (selectedFile.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selectedFile));
      }
    } else {
      setFile(null);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setIsRemoved(true);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    const input = document.getElementById(name) as HTMLInputElement;
    if (input) input.value = '';
  };

  const showCurrentPreview = currentPath && !file && !isRemoved;
  const isImageAccept = accept.includes('image/');
  const currentFilename = currentPath ? currentPath.split('/').pop() : null;

  return (
    <div className="mb-4">
      <label className="block text-[13px] font-semibold text-[var(--fg-base)] mb-3 tracking-wide">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      {/* Current file panel */}
      {showCurrentPreview && (
        <div className="mb-4 rounded-xl border border-[var(--border-color)] bg-[rgba(255,255,255,0.02)] overflow-hidden">
          {/* Image preview */}
          {currentPath?.match(/\.(jpg|jpeg|png|webp|gif)$/i) && (
            <div className="aspect-[16/9] bg-[var(--bg-base)] border-b border-[var(--border-color)] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentPath} alt="Current" className="w-full h-full object-contain" />
            </div>
          )}
          <div className="px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <svg className="w-4 h-4 text-[var(--fg-muted)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-[13px] text-[var(--fg-muted)] truncate font-mono">{currentFilename}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={currentPath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-medium text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors"
              >
                View
              </a>
              <span className="text-[var(--border-color)]">·</span>
              <button
                type="button"
                onClick={handleRemove}
                className="text-[12px] font-medium text-[var(--fg-muted)] hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {currentPath && <input type="hidden" name={removeName} value={isRemoved ? "true" : "false"} />}

      {/* Upload zone */}
      <div
        className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
          isDragging
            ? 'border-[var(--accent)] bg-[var(--accent)]/5'
            : 'border-[var(--border-color)] hover:border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.03)]'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const droppedFile = e.dataTransfer.files?.[0];
          if (droppedFile) {
            const input = document.getElementById(name) as HTMLInputElement;
            if (input) {
              const dt = new DataTransfer();
              dt.items.add(droppedFile);
              input.files = dt.files;
              const event = new Event('change', { bubbles: true });
              input.dispatchEvent(event);
            }
          }
        }}
      >
        <div className="p-5 text-center">
          <svg className={`w-7 h-7 mx-auto mb-3 transition-colors ${isDragging ? 'text-[var(--accent)]' : 'text-[var(--fg-muted)]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div className="text-sm font-medium text-white mb-1">
            {showCurrentPreview ? 'Replace image' : 'Click to upload'} <span className="font-normal text-[var(--fg-muted)]">or drag & drop</span>
          </div>
          {helpText && <p className="text-[12px] text-[var(--fg-muted)]">{helpText}</p>}
          {file && (
            <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-sm">
              <span className="font-medium text-[var(--accent)] truncate mr-4">{file.name}</span>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleRemove(); }}
                className="text-[var(--fg-muted)] hover:text-red-400 font-medium shrink-0 transition-colors"
              >
                Clear
              </button>
            </div>
          )}
        </div>
        <input
          id={name}
          name={name}
          type="file"
          accept={accept}
          required={required && !currentPath}
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title=""
        />
      </div>

      {/* New file preview */}
      {preview && isImageAccept && (
        <div className="mt-4 rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-base)] shadow-xl">
          <div className="px-3 py-2 bg-[var(--bg-elevated)] border-b border-[var(--border-color)] text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wider">
            New Image Preview
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="w-full h-auto object-contain max-h-48" />
        </div>
      )}
    </div>
  );
}
