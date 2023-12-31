import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cdn(path: string) {
  return path;
  // if (process.env.NODE_ENV === 'development') {
  //   return path;
  // }
  // return `${process.env.NEXT_PUBLIC_CDN_URL}${path}`
}
