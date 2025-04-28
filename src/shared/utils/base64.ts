export function encodeBase64(value: string): string {
  try {
    return btoa(unescape(encodeURIComponent(value)));
  } catch (error) {
    console.error(error);
    return value;
  }
}

export function decodeBase64(encoded: string): string {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch (error) {
    console.error(error);
    return encoded;
  }
}


export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  })
}