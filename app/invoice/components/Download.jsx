"use client";

import { ImDownload3 } from "react-icons/im";

import useDownloadFile from "../../../lib/useDownloadFile";

export default function Download({ prefix, record }) {
  return (
    <button
      onClick={() => (record.path ? useDownloadFile(prefix + record.path, record.title + ".pdf") : null)}
      className={`text-gray-700 hover:text-gray-900 ${record.path ? "" : "cursor-not-allowed"}`}
    >
      <ImDownload3 />
    </button>
  );
}
