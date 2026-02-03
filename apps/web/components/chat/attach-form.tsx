import { useState } from "react";
import { AttachFirstStep } from "./attach-first-step";
import { AttachSecondStep } from "./attach-second-step";

export const AttachForm = () => {
    const [files, setFiles] = useState<File[]>([]);


    return (
        <div className="flex flex-col gap-6 items-center w-[500px] bg-[#131316] p-5 rounded-[12px]">
            {files.length > 0 ? (
                <AttachSecondStep files={files} setFiles={setFiles}/>
            ) : (
                <AttachFirstStep files={files} setFiles={setFiles}/>
            )}
        </div>
    );
};
