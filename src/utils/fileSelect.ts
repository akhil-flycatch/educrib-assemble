const fileSelect = (selectedFiles: FileList | null, maxFileSize: number): { files: File[], error: string,} => {
  const files: File[] = [];
  let error = "";

  if (selectedFiles) {
    const fileList = Array.from(selectedFiles);
    const filteredFiles = fileList.filter((file) => file.size <= maxFileSize);
    const excludedFiles = fileList.filter((file) => file.size > maxFileSize);
    files.push(...filteredFiles);

    if (excludedFiles.length > 0) {
      error = `${excludedFiles.length} file(s) were excluded due to size limit.`;
    }
  }

  return { files, error };
}

export default fileSelect;