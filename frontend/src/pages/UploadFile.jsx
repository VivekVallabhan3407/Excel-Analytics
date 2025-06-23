import React, { useState } from 'react';
import axios from '../services/axios';
import * as XLSX from 'xlsx';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    previewExcel(selected);
  };

  const previewExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setPreviewData(jsonData.slice(0, 5)); // only first 5 rows
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUploadClick = () => {
    if (!file) return alert("Select a file first.");
    setShowModal(true);
  };

  const confirmUpload = async () => {
     const token = localStorage.getItem('token'); 
      console.log("Token used:", token); 

      if (!file) return alert("Select a file first.");

      const formData = new FormData();
      formData.append('file', file);

    try {
      await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' ,
                  Authorization: `Bearer ${token}`
        },
      });
      alert('Uploaded successfully');
      setFile(null);
      setPreviewData([]);
      setShowModal(false);
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-600">
        Upload Your Files
      </h2>

      {/* File Drop Box */}
      <div
        className="border-2 border-dashed border-gray-400 p-16 h-100 flex flex-col items-center justify-center text-center rounded-lg cursor-pointer hover:bg-gray-50 transition"
        onClick={() => document.getElementById('hiddenFileInput').click()}
      >
        {file ? (
          <p className="text-gray-700 font-medium">{file.name}</p>
        ) : (
          <>
            <CloudArrowUpIcon className="w-12 h-12 text-gray-500 mb-2" />
            <p className="text-gray-500 text-lg">Choose the file to be uploaded</p>
          </>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        id="hiddenFileInput"
        className="hidden"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
      />


      {/* Upload Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleUploadClick}
          className={`px-6 py-2 rounded text-white ${file ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!file}
        >
          Upload
        </button>
      </div>


      {/* File Preview */}
      {previewData.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Preview (First 5 Rows)</h3>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  {Object.keys(previewData[0]).map((key, idx) => (
                    <th key={idx} className="border p-2 text-sm">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i} className="text-sm">
                    {Object.values(row).map((cell, idx) => (
                      <td key={idx} className="border p-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <h4 className="text-lg font-semibold mb-4">Confirm Upload</h4>
            <p className="mb-4">Are you sure you want to upload <strong>{file.name}</strong>?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmUpload}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadFile;
