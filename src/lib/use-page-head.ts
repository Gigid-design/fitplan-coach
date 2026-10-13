import { useEffect } from "react";

type MetaEntry = { title?: string; name?: string; property?: string; content?: string };

// Applies a pageHead() result (see lib/fitplan.ts) to the document: sets the
// <title> and upserts each named/property meta tag. Restores the defaults from
// index.html when the page unmounts.
export function usePageHead(head: { meta: MetaEntry[] }) {
  const serialized = JSON.stringify(head);
  useEffect(() => {
    const { meta } = JSON.parse(serialized) as { meta: MetaEntry[] };
    const previousTitle = document.title;
    const restores: Array<() => void> = [];
    for (const entry of meta) {
      if (entry.title !== undefined) {
        document.title = entry.title;
        continue;
      }
      const attr =
        entry.name !== undefined ? "name" : entry.property !== undefined ? "property" : undefined;
      const key = entry.name ?? entry.property;
      if (!attr || !key || entry.content === undefined) continue;
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (tag) {
        const previous = tag.getAttribute("content");
        const existing = tag;
        restores.push(() => {
          if (previous === null) existing.removeAttribute("content");
          else existing.setAttribute("content", previous);
        });
      } else {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
        const created = tag;
        restores.push(() => created.remove());
      }
      tag.setAttribute("content", entry.content);
    }
    return () => {
      document.title = previousTitle;
      for (const restore of restores) restore();
    };
  }, [serialized]);
}
