// @ts-ignore
export function getFragment(start, end) {
  const fragmentStart = start ? `/${start}` : '';
  const fragmentEnd = fragmentStart !== '' && end ? `/${end}` : '';

  return `${fragmentStart}${fragmentEnd}`;
}