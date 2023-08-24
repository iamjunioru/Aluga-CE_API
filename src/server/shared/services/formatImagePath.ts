export function formatPathToUploadsUrl(filePath: string): string {
  const baseUrl = "http://localhost:8000"; // Substitua pela sua URL base
  const parts = filePath.split("\\");
  const uploadsIndex = parts.findIndex(part => part === "uploads");
  
  if (uploadsIndex !== -1) {
    const fileName = parts[parts.length - 1];
    const formattedUrl = `${baseUrl}/uploads/${encodeURIComponent(fileName)}`;
    return formattedUrl;
  }
  
  return filePath;
}

