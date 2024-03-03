export function formatPathToUploadsUrl(filePath: string): string {
  const baseUrl = "https://aluga-ce-api.vercel.app";
  const parts = filePath.split("\\");
  const uploadsIndex = parts.findIndex(part => part === "uploads");
  
  if (uploadsIndex !== -1) {
    const fileName = parts[parts.length - 1];
    const formattedUrl = `${baseUrl}/uploads/${encodeURIComponent(fileName)}`;
    return formattedUrl;
  }
  
  return filePath;
}

