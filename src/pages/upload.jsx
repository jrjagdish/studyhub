import React, { useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    semester: "1",
    unit: "1",
    subject: "DBMS",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setStatus("loading");

    const data = new FormData();
    data.append("file", file);
    data.append("title", formData.title);
    data.append("semester", formData.semester);
    data.append("unit", formData.unit);
    data.append("subject", formData.subject);

    try {
      const response = await fetch("http://127.0.0.1:8000/add_notes", {
        method: "POST",
        body: data,
      });

      const result = await response.json();


      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        console.error("Server error:", result);
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 bg-white dark:bg-[#0F0F0F] text-slate-900 dark:text-white">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-10">
        <button className="flex items-center gap-2 text-slate-500 hover:text-blue-500 transition-colors mb-6 font-bold uppercase text-[10px] tracking-widest">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
          Upload Resources
        </h1>
        <p className="text-slate-500 dark:text-[#C2C6D6]">
          Add new PDFs to the BCA Portal. We'll compress them and generate
          summaries.
        </p>
      </div>

      {/* Main Card Form */}
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1C1B1B] border border-slate-200 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Side: Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Document Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Normalization Guide"
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-[#2A2A2A] border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Semester
                  </label>
                  <select
                    name="semester"
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-[#2A2A2A] border-none rounded-2xl p-4 outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        Sem {num}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Unit
                  </label>
                  <select
                    name="unit"
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 dark:bg-[#2A2A2A] border-none rounded-2xl p-4 outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        Unit {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Subject
                </label>
                <select
                  name="subject"
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 dark:bg-[#2A2A2A] border-none rounded-2xl p-4 outline-none"
                >
                  <option value="DBMS">DBMS</option>
                  <option value="C++">C++</option>
                  <option value="OS">Operating Systems</option>
                  <option value="Math">Math</option>
                </select>
              </div>
            </div>

            {/* Right Side: File Upload Dropzone */}
            <div className="flex flex-col">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                PDF File
              </label>
              <label className="flex-grow border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[2rem] flex flex-col items-center justify-center p-6 hover:bg-slate-50 dark:hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {file ? (
                  <div className="text-center">
                    <FileText
                      size={48}
                      className="mx-auto text-blue-500 mb-4"
                    />
                    <p className="font-bold text-sm truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="text-center group-hover:scale-110 transition-transform">
                    <Upload
                      size={48}
                      className="mx-auto text-slate-300 dark:text-slate-700 mb-4"
                    />
                    <p className="font-bold text-sm text-slate-400">
                      Click to upload PDF
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button Section */}
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {status === "loading" && (
                <>
                  <Loader2 className="animate-spin text-blue-500" />{" "}
                  <span className="text-sm font-medium">Uploading...</span>
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle2 className="text-green-500" />{" "}
                  <span className="text-sm font-medium text-green-500">
                    Upload Complete!
                  </span>
                </>
              )}
              {status === "error" && (
                <>
                  <XCircle className="text-red-500" />{" "}
                  <span className="text-sm font-medium text-red-500">
                    Upload Failed.
                  </span>
                </>
              )}
            </div>

            <button
              disabled={status === "loading"}
              className="bg-slate-900 dark:bg-blue-500 text-white py-4 px-12 rounded-2xl font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 shadow-xl shadow-blue-500/20"
            >
              Confirm Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPage;
