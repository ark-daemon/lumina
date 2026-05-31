declare module 'colorthief' {
  export function getColor(sourceImage: HTMLImageElement, quality?: number): Promise<[number, number, number]>;
  export function getPalette(sourceImage: HTMLImageElement, colorCount?: number, quality?: number): Promise<[number, number, number][]>;
}
