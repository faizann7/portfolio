declare module 'imagesloaded' {
  type ImagesLoadedCallback = () => void;
  interface ImagesLoadedOptions {
    background?: boolean | string;
  }
  export default function imagesLoaded(
    elem: Element | NodeListOf<Element> | Element[],
    options: ImagesLoadedOptions,
    callback: ImagesLoadedCallback
  ): void;
}


