function formatPathToUploadsUrl(filePath: string): string {
  // Se Vercel Blob fornecer URLs, utilize-os aqui
  if (filePath.startsWith('https://')) {
    return filePath;
  }

  // Código original para uploads locais
  const baseUrl = "https://aluga-ce-api.vercel.app";
  const parts = filePath.split("/");
  const uploadsIndex = parts.findIndex(part => part === "uploads");

  if (uploadsIndex !== -1) {
    const fileName = parts[parts.length - 1];
    const formattedUrl = `${baseUrl}/uploads/${encodeURIComponent(fileName)}`;
    return formattedUrl;
  }

  return filePath;
}
