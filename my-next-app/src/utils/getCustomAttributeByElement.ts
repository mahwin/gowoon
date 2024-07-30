export function getCustomAttributeByElement(
  element: HTMLElement,
  attribute: string
): string | undefined {
  return element.dataset[attribute];
}
