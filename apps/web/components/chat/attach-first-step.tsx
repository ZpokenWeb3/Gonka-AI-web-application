import { Button } from "../ui/button";
import { DragEvent, ChangeEvent } from "react";

export const AttachFirstStep = ({files, setFiles}: {files: File[]; setFiles: React.Dispatch<React.SetStateAction<File[]>>}) => {

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
            <h3 className="text-[20px] text-white font-semibold">Attach file</h3>

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
                <p className="text-xs text-gray-300 text-start">Supported: .txt, .md, .py, .js, .ts, .json, .csv, .pdf <br/> Max size: 10MB per file</p>
            </div>


            <div className="flex flex-col w-full gap-2 self-start">
                <span className="text-[16px] text-white">OR PASTE A URL: </span>
                <input
                    placeholder="https://"
                    className="w-full text-sm text-white outline-none bg-transparent border border-[#21232C] focus-within:border-[#6B26D9] py-2 px-3 rounded-sm"
                />
            </div>

            <Button className="w-[100px] self-start" variant="secondary">
                Cancel
            </Button>
        </>
    )
}