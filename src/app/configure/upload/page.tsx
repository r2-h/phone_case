"use client"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { Image as ImageIcon, Loader2, LucideMousePointerSquareDashed } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import Dropzone, { FileRejection } from "react-dropzone"

const UploadPage = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const { toast } = useToast()

  const { isUploading, startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`)
      })
    },
    onUploadProgress(newUploadProgress) {
      setUploadProgress(newUploadProgress)
    },
  })

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles
    setIsDragOver(false)
    toast({
      title: `${file.file.type} type is not supported`,
      description: "Please use a PNG, JPG, or JPEG image instead",
      variant: "destructive",
    })
  }

  const onDropAccepted = (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { configId: "DD2" })
    setIsDragOver(false)
  }

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset",
        "ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
        isDragOver && "ring-blue-900/25 bg-blue-900/10"
      )}
    >
      <Dropzone
        onDropAccepted={onDropAccepted}
        onDropRejected={onDropRejected}
        accept={{ "image/png": [".png"], "image/jpeg": [".jpeg"], "image/jpg": [".jpg"] }}
        onDragEnter={() => setIsDragOver(true)}
        onDragLeave={() => setIsDragOver(false)}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="h-full w-full flex flex-col flex-1 items-center justify-center" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragOver ? (
              <LucideMousePointerSquareDashed className="size-6 text-zinc-500 mb-2" />
            ) : isUploading || isPending ? (
              <Loader2 className="animate-spin size-6 text-zinc-600 mb-2" />
            ) : (
              <ImageIcon className="size-6 text-zinc-600 mb-2" />
            )}

            {isUploading ? (
              <div className="flex flex-col items-center">
                <p>Uploading...</p>
                <Progress className="mt-2 w-40 h-2 bg-gray-300" value={uploadProgress} />
              </div>
            ) : isPending ? (
              <p className="flex flex-col items-center">Redirecting, please wait...</p>
            ) : isDragOver ? (
              <p>
                <span className="font-semibold">Drop file</span> to upload
              </p>
            ) : (
              <p>
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
            )}

            {isPending ? null : <p className="text-xs text-zinc-500 mt-2">PNG, JPG, JPEG</p>}
          </div>
        )}
      </Dropzone>
    </div>
  )
}

export default UploadPage
