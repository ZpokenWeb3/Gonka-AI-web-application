import { File, Lightbulb, X } from "lucide-react"
import { DragEvent, ChangeEvent } from "react";

export const AttachSecondStep = ({files, setFiles}: {files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>>}) => {
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer?.files) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (selectedFiles: FileList) => {
        const allowedTypes = [
            "text/plain",
            "application/json",
            "text/csv",
            "application/pdf",
            "application/javascript",
            "text/markdown",
            "text/x-python",
            "text/typescript",
        ];
        const maxSize = 10 * 1024 * 1024;

        const filteredFiles = Array.from(selectedFiles).filter((file) => {
            if (
                !allowedTypes.includes(file.type) &&
                !file.name.match(/\.(txt|md|py|js|ts|json|csv|pdf)$/)
            ) {
                alert(`Файл ${file.name} не поддерживается`);
                return false;
            }
            if (file.size > maxSize) {
                alert(`Файл ${file.name} слишком большой`);
                return false;
            }
            return true;
        });

        setFiles((prev) => [...prev, ...filteredFiles]);
    };

    return (
        <>
            <h3 className="text-[20px] text-white font-semibold">Attach</h3>

            <div className="w-full text-white text-sm mt-2">
                {files.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-[#232328] rounded-sm p-3">
                        <div className="flex items-center gap-2">
                            <File width={15} height={15}/>
                            {file.name}
                        </div>
                        <div className="flex items-center gap-2">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            <X className="cursor-pointer" width={14} height={14} color="#ff0000"/>
                        </div>
                    </div>
                ))}
            </div>

            <div
                className="flex flex-col gap-5 w-full h-fit border-2 border-dashed border-gray-600 rounded-md p-6 text-center cursor-pointer hover:border-purple-600 transition-colors duration-200"
                onDrop={handleDrop}
                onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
                onClick={() => {
                    const fileInput = document.getElementById("fileInput");
                    if (fileInput) {
                        fileInput.click();
                    }
                }}
            >
                <span className="text-sm text-white">📁 Drop files here or click to browse</span>
                <input
                    id="fileInput"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleChange}
                />
            </div>

            <div className="flex items-center gap-1.5">
                <Lightbulb width={14} height={14} color="#ffffff"/>
                <p className="text-xs text-white">The file content will be included with your message (adds ~4,500 tokens)</p>
            </div>
        </>
    )
}